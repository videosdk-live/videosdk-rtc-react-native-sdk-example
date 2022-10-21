import React from "react";
import { View, TextInput } from "react-native";
import colors from "../../styles/colors";
import { ROBOTO_FONTS } from "../../styles/fonts";
const TextInputContainer = ({ placeholder, value, setValue }) => {
  return (
    <View
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#202427",
        borderRadius: 12,
        marginVertical: 12,
      }}
    >
      <TextInput
        style={{
          margin: 8,
          padding: 8,
          width: "90%",
          textAlign: "center",
          fontSize: 16,
          color: colors.primary[100],
          fontFamily: ROBOTO_FONTS.RobotoBold,
        }}
        multiline={true}
        numberOfLines={1}
        cursorColor={"#5568FE"}
        placeholder={placeholder}
        placeholderTextColor={"#9A9FA5"}
        onChangeText={(text) => {
          setValue(text);
        }}
        value={value}
      />
    </View>
  );
};

export default TextInputContainer;
