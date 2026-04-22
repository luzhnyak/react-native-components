import { TextInput, TextInputProps } from "react-native";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type InputType = "text" | "number" | "password";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<TextInputProps, "value" | "onChangeText"> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  type?: InputType;
}

export function FormInput<T extends FieldValues = FieldValues>({
  field,
  type = "text",
  ...props
}: FormInputProps<T>) {
  // визначаємо keyboardType
  const keyboardType =
    type === "number" ? "numeric" : type === "password" ? "default" : "default";

  const secureTextEntry = type === "password";

  return (
    <TextInput
      {...props}
      value={field.value?.toString()} // для чисел конвертуємо в рядок
      onChangeText={(val) => {
        if (type === "number") {
          const num = Number(val);
          field.onChange(isNaN(num) ? undefined : num);
        } else {
          field.onChange(val);
        }
      }}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
}
