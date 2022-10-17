import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScreenShare } from "../../../assets/icons";
import colors from "../../../styles/colors";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import { convertRFValue } from "../../../styles/spacing";

export default LocalPresenter = ({}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary[800],
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ScreenShare width={54} height={54} fill={"#FFF"} />
        <Text
          style={{
            fontFamily: ROBOTO_FONTS.Roboto,
            fontSize: convertRFValue(14),
            color: colors.primary[100],
            marginVertical: 12,
          }}
        >
          You are presenting to everyone
        </Text>
        <TouchableOpacity
          style={{
            padding: 14,
            alignItems: "center",
            backgroundColor: "#5568FE",
            borderRadius: 12,
            marginVertical: 12,
          }}
        >
          <Text
            style={{
              color: colors.primary["100"],
              fontSize: 16,
              fontFamily: ROBOTO_FONTS.RobotoBlack,
            }}
          >
            Stop Presenting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
