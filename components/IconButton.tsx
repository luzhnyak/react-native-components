// components/IconButton.tsx

import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function IconButton({
  icon,
  onPress,
  size = 24,
  color = "#007AFF",
  style,
  disabled = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, disabled && { opacity: 0.5 }]}
    >
      <MaterialIcons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8, // 🔥 приємніше для UX (tap area)
    alignItems: "center",
    justifyContent: "center",
  },
});
