/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text } from "react-native";
import colors from "../../styles/colors";
import Avatar from "../../components/Avatar";
import { convertRFValue } from "../../styles/spacing";
import {
  MicOff,
  MicOn,
  VideoOff,
  VideoOn,
  RaiseHand,
  Person,
} from "../../assets/icons";
import { ROBOTO_FONTS } from "../../styles/fonts";

// const areEqual = (prevProps, nextProps) => {
//   return (
//     prevProps.participantId === nextProps.participantId &&
//     prevProps.raisedHand === nextProps.raisedHand
//   );
// };
function ParticipantListItem({ participantId, raisedHand }) {
  const displayName = "ahmed";
  const webcamOn = true;
  const micOn = false;
  const isLocal = false;

  const IconContainer = ({ Icon, style }) => {
    return (
      <View
        style={{
          height: 36,
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 8,
          borderColor: "rgba(245,245,245, 0.2)",
          borderRadius: 20,
          ...style,
        }}
      >
        <Icon />
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 14,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: colors.primary[600],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 36,
            aspectRatio: 1,
            borderRadius: 20,
            backgroundColor: colors.primary[500],
          }}
        >
          <Person />
        </View>
        <View
          style={{
            height: 40,
            marginLeft: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: convertRFValue(14),
              color: colors.primary[100],
              fontFamily: ROBOTO_FONTS.RobotoMedium,
            }}
          >
            {isLocal ? "You" : displayName || ""}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <IconContainer
          style={{
            borderWidth: micOn ? 1 : 0,
            backgroundColor: micOn ? "transparent" : "#FF5D5D",
          }}
          Icon={() => {
            return micOn ? (
              <MicOn width={16} height={16} />
            ) : (
              <MicOff width={16} height={16} fill={colors.primary[100]} />
            );
          }}
        />

        <IconContainer
          style={{
            borderWidth: webcamOn ? 1 : 0,
            backgroundColor: webcamOn ? "transparent" : "#FF5D5D",
          }}
          Icon={() => {
            return webcamOn ? (
              <VideoOn height={16} width={16} fill={colors.primary[100]} />
            ) : (
              <VideoOff width={22} height={22} fill={colors.primary[100]} />
            );
          }}
        />
      </View>
    </View>
  );
}
export default React.memo(ParticipantListItem);
