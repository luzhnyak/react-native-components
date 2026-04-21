// components/FAB.tsx
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  style?: any;
}

export default function FAB({ onPress, style }: Props) {
  return (
    <Pressable style={[styles.fab, style]} onPress={onPress}>
      <MaterialCommunityIcons name="plus" size={28} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",

    // shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // elevation (Android)
    elevation: 6,
  },
});
