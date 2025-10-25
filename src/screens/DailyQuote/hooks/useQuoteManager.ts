import { AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { ERROR_MESSAGES } from "../../../constants/messages";
import { useAuth } from "../../../hooks/useAuth";
import { quoteAPI } from "../../../services/quote";
import type { QuoteCard } from "../../../types/quote";
import { showErrorToast } from "../../../utils/errorHandler";
import { generateQuoteId } from "../../../utils/quote";

const MAX_RETRY_ATTEMPTS = 2;
const BUFFER_SIZE = 5;
const PRELOAD_THRESHOLD = 2;

interface UseQuoteManagerReturn {
  quotes: QuoteCard[];
  currentIndex: number;
  initialLoading: boolean;
  isLoadingMore: boolean;
  setCurrentIndex: (index: number) => void;
  addNewQuotes: (count?: number) => void;
  shouldPreloadMore: (index: number) => boolean;
}

const updateQuoteInState = (
  setQuotes: React.Dispatch<React.SetStateAction<QuoteCard[]>>,
  quoteId: string,
  quoteText: string
) => {
  setQuotes((prev) => {
    const exists = prev.some((q) => q.id === quoteId);
    if (!exists) return prev;

    return prev.map((q) =>
      q.id === quoteId ? { ...q, text: quoteText, loading: false } : q
    );
  });
};

const removeQuoteFromState = (
  setQuotes: React.Dispatch<React.SetStateAction<QuoteCard[]>>,
  quoteId: string
) => {
  setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
};

export const useQuoteManager = (): UseQuoteManagerReturn => {
  const [quotes, setQuotes] = useState<QuoteCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoadingMore] = useState(false);
  const { token, signOut } = useAuth();
  const loadingQuotesRef = useRef(new Set<string>());

  const handleAuthError = async () => {
    showErrorToast(ERROR_MESSAGES.QUOTE_AUTH_ERROR);
    setTimeout(async () => {
      await signOut();
    }, 2000);
  };

  const fetchSingleQuote = async (): Promise<string | null> => {
    try {
      const quoteText = await quoteAPI.getDailyQuote(token || "");
      return quoteText;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 403) {
        await handleAuthError();
      }
      showErrorToast(ERROR_MESSAGES.QUOTE_LOAD_ERROR);
      return null;
    }
  };

  const fetchQuoteWithRetry = async (): Promise<string | null> => {
    for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
      const quoteText = await fetchSingleQuote();

      if (quoteText) return quoteText;

      if (attempt < MAX_RETRY_ATTEMPTS) {
        await new Promise<void>((resolve) =>
          setTimeout(resolve, 1000 * attempt)
        );
      }
    }
    return null;
  };

  const loadQuote = async (quoteId: string) => {
    if (loadingQuotesRef.current.has(quoteId)) return;

    loadingQuotesRef.current.add(quoteId);

    const quoteText = await fetchQuoteWithRetry();

    loadingQuotesRef.current.delete(quoteId);

    if (quoteText) {
      updateQuoteInState(setQuotes, quoteId, quoteText);
    } else {
      removeQuoteFromState(setQuotes, quoteId);
      showErrorToast(ERROR_MESSAGES.QUOTE_LOAD_ERROR);
    }
  };

  const addNewQuotes = useCallback(
    (count = BUFFER_SIZE) => {
      const newQuotes: QuoteCard[] = Array.from({ length: count }, () => ({
        id: generateQuoteId(),
        text: "",
        loading: true,
      }));

      setQuotes((prev) => [...prev, ...newQuotes]);

      newQuotes.forEach((quote) => {
        loadQuote(quote.id);
      });
    },
    [token, signOut]
  );

  const shouldPreloadMore = useCallback(
    (index: number): boolean => {
      const remainingCards = quotes.length - (index + 1);
      return remainingCards <= PRELOAD_THRESHOLD && !isLoadingMore;
    },
    [quotes.length, isLoadingMore]
  );

  useEffect(() => {
    if (token) {
      addNewQuotes(BUFFER_SIZE);
      setTimeout(() => setInitialLoading(false), 300);
    } else {
      setInitialLoading(false);
    }
  }, [token, addNewQuotes]);

  return {
    quotes,
    currentIndex,
    initialLoading,
    isLoadingMore,
    setCurrentIndex,
    addNewQuotes,
    shouldPreloadMore,
  };
};
