import { Menu, X } from "lucide-react-native";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ERROR_MESSAGES } from "../../../../constants/messages";
import { colors } from "../../../../constants/theme";
import { useAuth } from "../../../../hooks/useAuth";
import { showErrorToast } from "../../../../utils/errorHandler";
import { styles } from "./styles.header";

interface HeaderProps {
  username?: string;
}

export const Header = ({ username = "Usuário" }: HeaderProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();

  const handleOpenMenu = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    setMenuVisible(false);
  };

  const handleLogout = async () => {
    try {
      ReactNativeHapticFeedback.trigger("impactMedium");
      setMenuVisible(false);
      await signOut();
    } catch {
      showErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Frase do Dia</Text>
        <TouchableOpacity onPress={handleOpenMenu} style={styles.menuButton} activeOpacity={0.7}>
          <Menu size={28} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseMenu}
      >
        <TouchableWithoutFeedback onPress={handleCloseMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.menuContainer,
                  {
                    paddingTop: insets.top + 16,
                    paddingBottom: insets.bottom + 16,
                  },
                ]}
              >
                <View style={styles.menuHeader}>
                  <Text style={styles.menuTitle}>Menu</Text>
                  <TouchableOpacity
                    onPress={handleCloseMenu}
                    style={styles.closeButton}
                    activeOpacity={0.7}
                  >
                    <X size={24} color={colors.text.primary} />
                  </TouchableOpacity>
                </View>

                <View style={styles.userInfo}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{username.charAt(0).toUpperCase()}</Text>
                  </View>
                  <Text style={styles.username}>{username}</Text>
                </View>

                <View style={styles.menuDivider} />

                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemText}>Sair</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
