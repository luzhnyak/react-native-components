import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  style?: ViewStyle; // додано
}

export default function AppSelect({
  value,
  options,
  placeholder = "Select...",
  onChange,
  style, // отримуємо проп style
}: Props) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Pressable style={[styles.input, style]} onPress={() => setOpen(true)}>
        <Text>{selected?.label || placeholder}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={[styles.modal, { paddingBottom: 12 + insets.bottom }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </Pressable>
              )}
            />

            <Pressable onPress={() => setOpen(false)}>
              <Text style={{ textAlign: "center", padding: 12 }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "60%",
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
