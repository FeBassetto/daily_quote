import { Quote } from "lucide-react-native";
import { memo } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "../../../../constants/theme";
import type { QuoteCard as QuoteCardType } from "../../../../types/quote";
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
    <View style={styles.card}>
      <Quote size={32} color={colors.primary} style={styles.quoteIconTop} />
      <Text style={styles.quoteText}>{card.text}</Text>
      <Quote size={32} color={colors.primary} style={styles.quoteIconBottom} />
    </View>
  );
};

export const QuoteCard = memo(QuoteCardComponent);
