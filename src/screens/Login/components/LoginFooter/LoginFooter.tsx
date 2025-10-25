import { AUTH_MESSAGES } from "@constants/messages";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.loginfooter";

interface LoginFooterProps {
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
}

export const LoginFooter = ({
  onTermsPress,
  onPrivacyPress,
}: LoginFooterProps) => {
  const handleTermsPress = () => {
    onTermsPress?.();
  };

  const handlePrivacyPress = () => {
    onPrivacyPress?.();
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>{AUTH_MESSAGES.TERMS_PREFIX} </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleTermsPress}>
          <Text style={styles.footerLink}>{AUTH_MESSAGES.TERMS_LINK}</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}> {AUTH_MESSAGES.TERMS_AND} </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handlePrivacyPress}>
          <Text style={styles.footerLink}>{AUTH_MESSAGES.PRIVACY_LINK}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
