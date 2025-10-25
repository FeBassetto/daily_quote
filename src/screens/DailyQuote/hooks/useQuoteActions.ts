import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@constants/messages";
import type { QuoteCard } from "@models/quote";
import type { SwiperRef } from "@models/swiper";
import Clipboard from "@react-native-clipboard/clipboard";
import { showErrorToast, showSuccessToast } from "@utils/errorHandler";
import { useState } from "react";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Share from "react-native-share";

const ACTION_COOLDOWN = 1000;

interface UseQuoteActionsParams {
  quotes: QuoteCard[];
  currentIndex: number;
  isSwiping: boolean;
  swiperRef: React.RefObject<SwiperRef | null>;
  onSwipingChange: () => void;
}

interface UseQuoteActionsReturn {
  handleCopy: () => Promise<void>;
  handleShare: () => Promise<void>;
  handleRefresh: () => void;
  isActionLoading: {
    copy: boolean;
    share: boolean;
  };
}

export const useQuoteActions = ({
  quotes,
  currentIndex,
  isSwiping,
  swiperRef,
  onSwipingChange,
}: UseQuoteActionsParams): UseQuoteActionsReturn => {
  const [isActionLoading, setIsActionLoading] = useState({
    copy: false,
    share: false,
  });

  const getCurrentQuote = (): QuoteCard | undefined => {
    return quotes[currentIndex];
  };

  const isQuoteReady = (quote: QuoteCard | undefined): boolean => {
    return Boolean(quote && !quote.loading && quote.text && !isSwiping);
  };

  const handleCopy = async () => {
    const currentQuote = getCurrentQuote();
    if (!isQuoteReady(currentQuote) || !currentQuote || isActionLoading.copy) return;

    setIsActionLoading((prev) => ({ ...prev, copy: true }));

    try {
      Clipboard.setString(currentQuote.text);
      showSuccessToast(SUCCESS_MESSAGES.QUOTE_COPIED);
      ReactNativeHapticFeedback.trigger("notificationSuccess");
    } catch {
      showErrorToast(ERROR_MESSAGES.QUOTE_COPY_ERROR);
    } finally {
      setTimeout(() => {
        setIsActionLoading((prev) => ({ ...prev, copy: false }));
      }, ACTION_COOLDOWN);
    }
  };

  const handleShare = async () => {
    const currentQuote = getCurrentQuote();
    if (!isQuoteReady(currentQuote) || !currentQuote || isActionLoading.share) return;

    setIsActionLoading((prev) => ({ ...prev, share: true }));

    try {
      await Share.open({
        message: currentQuote.text,
      });
      ReactNativeHapticFeedback.trigger("notificationSuccess");
    } catch (error) {
      if (error instanceof Error && error.message !== "User did not share") {
        showErrorToast(ERROR_MESSAGES.QUOTE_SHARE_ERROR);
      }
    } finally {
      setTimeout(() => {
        setIsActionLoading((prev) => ({ ...prev, share: false }));
      }, ACTION_COOLDOWN);
    }
  };

  const handleRefresh = () => {
    const currentQuote = getCurrentQuote();
    if (!isQuoteReady(currentQuote)) return;

    if (swiperRef.current) {
      try {
        onSwipingChange();
        if (swiperRef.current.swipeRight) {
          swiperRef.current.swipeRight();
        } else if (swiperRef.current.swipeLeft) {
          swiperRef.current.swipeLeft();
        }
      } catch {
        showErrorToast(ERROR_MESSAGES.QUOTE_REFRESH_ERROR);
      }
    }
  };

  return {
    handleCopy,
    handleShare,
    handleRefresh,
    isActionLoading,
  };
};
