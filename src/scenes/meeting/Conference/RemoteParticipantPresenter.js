import React from "react";
import { View, Text } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import colors from "../../../styles/colors";
import { convertRFValue } from "../../../styles/spacing";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import { ScreenShare } from "../../../assets/icons";

export default function RemoteParticipantPresenter({ presenterId }) {
  const { displayName, screenShareStream, screenShareOn } =
    useParticipant(presenterId);

  const presentingText = displayName || "";

  return (
    <View
      style={{
        flex: 3,
        paddingHorizontal: 12,
        borderTopColor: colors.primary[700],
        justifyContent: "space-between",
      }}
    >
      {screenShareOn && screenShareStream ? (
        <RTCView
          streamURL={new MediaStream([screenShareStream.track]).toURL()}
          objectFit={"contain"}
          style={{
            flex: 1,
          }}
        />
      ) : null}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 8,
          justifyContent: "space-between",
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 6,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <ScreenShare width={20} height={20} fill={"#FFF"} />
          <Text
            style={{
              color: "white",
              fontFamily: ROBOTO_FONTS.RobotoRegular,
              fontSize: convertRFValue(12),
              marginLeft: 10,
            }}
          >
            {`${presentingText} is Presenting`}
          </Text>
        </View>
      </View>
    </View>
  );
}
