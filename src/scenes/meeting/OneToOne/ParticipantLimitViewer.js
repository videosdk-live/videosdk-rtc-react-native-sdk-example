import { ROBOTO_FONTS } from "../../../styles/fonts";
import React from "react";
import { convertRFValue } from "../../../styles/spacing";
import { Text, View } from "react-native";
import colors from "../../../styles/colors";
import Button from "../../../components/Button";
import { useMeeting } from "@videosdk.live/react-native-sdk";

export default function ParticipantLimitViewer() {
  const { leave } = useMeeting({});
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Text
        style={{
          fontSize: convertRFValue(24),
          color: colors.primary[100],
          fontFamily: ROBOTO_FONTS.RobotoBold,
        }}
      >
        OOPS !!
      </Text>
      <Text
        style={{
          fontSize: convertRFValue(12),
          color: colors.primary[100],
          fontFamily: ROBOTO_FONTS.RobotoBold,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Maximun 2 participants can join this meeting.
      </Text>
      <Text
        style={{
          fontSize: convertRFValue(12),
          color: colors.primary[400],
          fontFamily: ROBOTO_FONTS.RobotoMedium,
          marginTop: 10,
        }}
      >
        Please try again later
      </Text>

      <Button
        backgroundColor={colors.purple}
        text="Ok"
        onPress={() => {
          leave();
        }}
        style={{
          paddingHorizontal: 30,
          height: 50,
          marginTop: 30,
        }}
        textStyle={{
          fontFamily: ROBOTO_FONTS.RobotoBold,
        }}
      />
    </View>
  );
}
