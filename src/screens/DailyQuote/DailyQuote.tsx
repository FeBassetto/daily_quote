import { Copy, RefreshCw, Share2 } from "lucide-react-native";
import { useRef } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";
import type { SwiperRef } from "../../types/swiper";
import { formatDate } from "../../utils/quote";
import { ActionButton } from "./components/ActionButton/ActionButton";
import { Header } from "./components/Header/Header";
import { QuoteSwiper } from "./components/QuoteSwiper/QuoteSwiper";
import { useQuoteActions } from "./hooks/useQuoteActions";
import { useQuoteManager } from "./hooks/useQuoteManager";
import { useSwipeManager } from "./hooks/useSwipeManager";
import { styles } from "./styles.dailyquote";

const BUFFER_SIZE = 5;

export const DailyQuoteScreen = () => {
  const { username } = useAuth();
  const swiperRef = useRef<SwiperRef | null>(null);

  const { quotes, currentIndex, initialLoading, setCurrentIndex, addNewQuotes, shouldPreloadMore } =
    useQuoteManager();

  const { isSwiping, handleSwiped, handleSwiping } = useSwipeManager({
    onIndexChange: setCurrentIndex,
    shouldPreload: shouldPreloadMore,
    onPreload: () => addNewQuotes(BUFFER_SIZE),
  });

  const { handleCopy, handleShare, handleRefresh, isActionLoading } = useQuoteActions({
    quotes,
    currentIndex,
    isSwiping,
    swiperRef,
    onSwipingChange: handleSwiping,
  });

  const currentQuote = quotes[currentIndex];
  const isCurrentCardLoading = currentQuote?.loading || !currentQuote?.text;
  const areButtonsDisabled = isCurrentCardLoading || isSwiping;
  const canSwipe = !isCurrentCardLoading;

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <Header username={username || undefined} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando suas frases...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (quotes.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <Header username={username || undefined} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Não foi possível carregar as frases</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => addNewQuotes(BUFFER_SIZE)}
            activeOpacity={0.7}
          >
            <RefreshCw size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.errorRetryText}>Toque para tentar novamente</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header username={username || undefined} />

      <View style={styles.contentContainer}>
        <QuoteSwiper
          swiperRef={swiperRef}
          quotes={quotes}
          onSwiped={handleSwiped}
          onSwiping={handleSwiping}
          canSwipe={canSwipe}
        />

        <View style={styles.bottomSection}>
          <View style={styles.actionsContainer}>
            <ActionButton
              icon={Copy}
              label="Copiar"
              onPress={handleCopy}
              disabled={areButtonsDisabled}
              loading={isActionLoading.copy}
            />
            <ActionButton
              icon={Share2}
              label="Compartilhar"
              onPress={handleShare}
              disabled={areButtonsDisabled}
              loading={isActionLoading.share}
            />
            <ActionButton
              icon={RefreshCw}
              label="Próxima"
              onPress={handleRefresh}
              disabled={areButtonsDisabled}
            />
          </View>

          <Text style={styles.dateText}>{formatDate()}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
