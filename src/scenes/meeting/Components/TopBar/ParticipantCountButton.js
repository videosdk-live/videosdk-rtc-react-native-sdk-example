import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { Participants } from "../../../../assets/icons";
import colors from "../../../../styles/colors";
import { ROBOTO_FONTS } from "../../../../styles/fonts";
import { convertRFValue } from "../../../../styles/spacing";

export default function ParticipantCountButton({ onPress }) {
  const { participants } = useMeeting({});

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 8,
      }}
    >
      <Participants height={24} width={24} fill={colors.primary[100]} />
      <Text
        style={{
          fontSize: convertRFValue(14),
          color: colors.primary[100],
          marginLeft: 4,
          fontFamily: ROBOTO_FONTS.RobotoMedium,
        }}
      >
        {participants ? [...participants.keys()].length : 1}
      </Text>
    </TouchableOpacity>
  );
}
