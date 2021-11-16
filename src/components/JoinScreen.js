import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function JoinScreen({ onPress }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 12,
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255, 0.2)",
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Join Session</Text>
      </TouchableOpacity>
    </View>
  );
}
