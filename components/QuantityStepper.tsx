import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

interface Props {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
}: Props) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const clamp = (val: number) => {
    if (val < min) return min;
    if (val > max) return max;
    return val;
  };

  const decrease = () => {
    const newVal = clamp(value - 1);
    onChange(newVal);
  };

  const increase = () => {
    const newVal = clamp(value + 1);
    onChange(newVal);
  };

  const handleChange = (text: string) => {
    setInputValue(text);

    const num = Number(text);
    if (!isNaN(num)) {
      onChange(clamp(num));
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={decrease}>
        <Text style={styles.btnText}>-</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleChange}
        keyboardType="number-pad"
      />

      <Pressable style={styles.btn} onPress={increase}>
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  btn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    fontSize: 18,
    fontWeight: "600",
  },

  input: {
    minWidth: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
