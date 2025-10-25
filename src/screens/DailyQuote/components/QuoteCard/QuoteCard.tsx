import { colors } from "@constants/theme";
import type { QuoteCard as QuoteCardType } from "@models/quote";
import { Quote } from "lucide-react-native";
import { memo } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { styles } from "./styles.quotecard";

interface QuoteCardProps {
  card: QuoteCardType;
}

const QuoteCardComponent = ({ card }: QuoteCardProps) => {
  if (!card) return null;

  if (card.loading) {
    return (
      <View style={styles.card}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando frase...</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={styles.card}
      collapsable={false}
      removeClippedSubviews={Platform.OS === "android" ? false : undefined}
      renderToHardwareTextureAndroid={Platform.OS === "android"}
      needsOffscreenAlphaCompositing={Platform.OS === "android"}
    >
      <Quote size={32} color={colors.primary} style={styles.quoteIconTop} />
      <Text style={styles.quoteText} maxFontSizeMultiplier={1.2}>
        {card.text}
      </Text>
      <Quote size={32} color={colors.primary} style={styles.quoteIconBottom} />
    </View>
  );
};

export const QuoteCard = memo(
  QuoteCardComponent,
  (prevProps, nextProps) =>
    prevProps.card.id === nextProps.card.id && prevProps.card.loading === nextProps.card.loading,
);
