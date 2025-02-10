import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>GoldFishNet</Text>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Ionicons name="log-in" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
