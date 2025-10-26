import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { Logo } from "@components/Logo/Logo";
import {
  AUTH_MESSAGES,
  FORM_PLACEHOLDERS,
  INFO_MESSAGES,
  SUCCESS_MESSAGES,
} from "@constants/messages";
import { colors } from "@constants/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NavigationProp } from "@models/navigation";
import { useNavigation } from "@react-navigation/native";
import { showInfoToast, showSuccessToast } from "@utils/errorHandler";
import { type ForgotPasswordFormData, forgotPasswordSchema } from "@utils/forgotPasswordValidation";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginFooter } from "../Login/components/LoginFooter/LoginFooter";
import { styles } from "./styles.forgotpassword";

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      showSuccessToast(
        SUCCESS_MESSAGES.FORGOT_PASSWORD_SUCCESS,
        SUCCESS_MESSAGES.FORGOT_PASSWORD_TITLE,
      );

      reset();
      navigation.navigate("Login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComingSoon = () => {
    showInfoToast(INFO_MESSAGES.COMING_SOON_MESSAGE, INFO_MESSAGES.COMING_SOON_TITLE);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Logo size="large" style={styles.logo} />
            <Text style={styles.title}>{AUTH_MESSAGES.FORGOT_PASSWORD_TITLE}</Text>
            <Text style={styles.subtitle}>{AUTH_MESSAGES.FORGOT_PASSWORD_SUBTITLE}</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.EMAIL}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  leftIcon={<Mail size={20} color={colors.text.tertiary} />}
                  editable={!isLoading}
                />
              )}
            />

            <Button
              title={AUTH_MESSAGES.SEND_INSTRUCTIONS}
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
              style={styles.sendButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>{AUTH_MESSAGES.REMEMBER_PASSWORD}</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>{AUTH_MESSAGES.BACK_TO_LOGIN}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <LoginFooter onTermsPress={handleComingSoon} onPrivacyPress={handleComingSoon} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
