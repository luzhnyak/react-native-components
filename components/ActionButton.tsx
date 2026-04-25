// components/ActionButton.tsx

import { Pressable, Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  disabled?: boolean;
  rightElement?: ReactNode; // 🔥 якщо захочеш щось справа
  fullWidth?: boolean;
  style?: any;
};

export default function ActionButton({
  title,
  onPress,
  color = "#1565c0",
  icon,
  disabled = false,
  rightElement,
  fullWidth = false,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        style,
        fullWidth && { width: "100%" },
        { backgroundColor: disabled ? "#ccc" : color },
      ]}
    >
      <View style={styles.content}>
        {icon && <MaterialIcons name={icon} size={18} color="#fff" />}

        <Text style={styles.text}>{title}</Text>

        {rightElement}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
