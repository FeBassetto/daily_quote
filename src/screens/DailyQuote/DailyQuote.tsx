import Clipboard from "@react-native-clipboard/clipboard";
import { Copy, Quote, RefreshCw, Share2 } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { SafeAreaView } from "react-native-safe-area-context";
import Share from "react-native-share";
import { Header } from "../../components/Header/Header";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/messages";
import { colors } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";
import { quoteAPI } from "../../services/quote";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandler";
import { styles } from "./styles.dailyquote";

export const DailyQuoteScreen = () => {
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { token, username } = useAuth();

  const fetchQuote = useCallback(async () => {
    if (!token) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setError(false);
      const quoteText = await quoteAPI.getDailyQuote(token);
      setQuote(quoteText);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } catch {
      setError(true);
      showErrorToast(ERROR_MESSAGES.QUOTE_LOAD_ERROR);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, fadeAnim]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fadeAnim.setValue(0);
    fetchQuote();
    ReactNativeHapticFeedback.trigger("impactLight");
  }, [fadeAnim, fetchQuote]);

  const handleCopy = useCallback(async () => {
    if (!quote) return;

    try {
      Clipboard.setString(quote);
      showSuccessToast(SUCCESS_MESSAGES.QUOTE_COPIED);
      ReactNativeHapticFeedback.trigger("notificationSuccess");
    } catch {
      showErrorToast(ERROR_MESSAGES.QUOTE_COPY_ERROR);
    }
  }, [quote]);

  const handleShare = useCallback(async () => {
    if (!quote) return;

    try {
      await Share.open({
        message: quote,
      });
      ReactNativeHapticFeedback.trigger("notificationSuccess");
    } catch (error: any) {
      if (error?.message !== "User did not share") {
        showErrorToast(ERROR_MESSAGES.QUOTE_SHARE_ERROR);
      }
    }
  }, [quote]);

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <Header username={username || undefined} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando sua frase...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !quote) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <Header username={username || undefined} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Não foi possível carregar a frase do dia</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleRefresh} activeOpacity={0.7}>
            <RefreshCw size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header username={username || undefined} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <Animated.View style={[styles.quoteContainer, { opacity: fadeAnim }]}>
          <Quote size={32} color={colors.primary} style={styles.quoteIconTop} />

          <Text style={styles.quoteText}>{quote}</Text>

          <Quote size={32} color={colors.primary} style={styles.quoteIconBottom} />
        </Animated.View>

        <View style={styles.actionsContainer}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCopy} activeOpacity={0.7}>
              <Copy size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.actionButtonLabel}>Copiar</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare} activeOpacity={0.7}>
              <Share2 size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.actionButtonLabel}>Compartilhar</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRefresh}
              activeOpacity={0.7}
            >
              <RefreshCw size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.actionButtonLabel}>Atualizar</Text>
          </View>
        </View>

        <Text style={styles.dateText}>{formatDate()}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
