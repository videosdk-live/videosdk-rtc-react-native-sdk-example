import React from "react";
import { TouchableOpacity, Text } from "react-native";
import colors from "../../styles/colors";
import { ROBOTO_FONTS } from "../../styles/fonts";

const Button = ({ text, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor ? backgroundColor : "#5568FE",
        borderRadius: 12,
        marginVertical: 12,
      }}
    >
      <Text
        style={{
          color: colors.primary["100"],
          fontSize: 16,
          fontFamily: ROBOTO_FONTS.RobotoMedium,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
