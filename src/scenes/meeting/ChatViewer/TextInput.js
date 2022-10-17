import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Send } from "../../../assets/icons";
import colors from "../../../styles/colors";
import { useStandardHeight } from "../../../styles/spacing";

export default function TextInputContainer({
  sendMessage,
  setMessage,
  message,
}) {
  const vertical_40 = useStandardHeight(40);
  const textInput = () => {
    return (
      <View
        style={{
          height: vertical_40,
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: colors.primary[600],
        }}
      >
        <View style={{ flexDirection: "row", flex: 2 }}>
          <TextInput
            multiline
            value={message}
            placeholder={"Write your Message"}
            style={{ flex: 1, color: "white", marginLeft: 12 }}
            numberOfLines={2}
            onChangeText={setMessage}
            selectionColor={"white"}
            placeholderTextColor={"#9FA0A7"}
          />
        </View>
        {message ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                height: 30,
                aspectRatio: 1,
                marginHorizontal: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Send fill="#FFF" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  return <>{textInput()}</>;
}
