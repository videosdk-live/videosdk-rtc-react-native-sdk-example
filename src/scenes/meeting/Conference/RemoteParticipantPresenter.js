import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import ParticipantView from "./ParticipantView";
import colors from "../../../styles/colors";
import { convertRFValue } from "../../../styles/spacing";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import { ScreenShare } from "../../../assets/icons";

export default function RemoteParticipantPresenter({
  presenterId,
  participantIdArr,
}) {
  const { displayName, screenShareStream, screenShareOn } =
    useParticipant(presenterId);

  const presentingText = displayName || "";

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        borderTopColor: colors.primary[800],
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          flex: 2,
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
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {participantIdArr.map((participantId) => {
          return (
            <View
              style={{
                flex: 2,
              }}
            >
              <ParticipantView participantId={participantId} />
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
}
