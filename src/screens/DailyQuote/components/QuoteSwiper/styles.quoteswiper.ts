import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    height: height * 0.52,
    marginBottom: 16,
  },
  innerContainer: {
    flex: 1,
  },
});
