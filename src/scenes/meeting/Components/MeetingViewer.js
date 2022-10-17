import React, { useEffect } from "react";
import {
  View,
  Text,
  Clipboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import {
  CallEnd,
  CameraSwitch,
  Chat,
  Copy,
  MicOff,
  MicOn,
  More,
  VideoOff,
  VideoOn,
} from "../../../assets/icons";
import IconContainer from "../../../components/IconContainer";
import colors from "../../../styles/colors";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import LocalViewContainer from "./LocalViewContainer";
import LargeView from "./LargeView";
import MiniView from "./MiniView";
import LocalPresenter from "./LocalPresenter";

export default function MeetingViewer() {
  const {
    join,
    participants,
    localWebcamOn,
    localMicOn,
    leave,
    changeWebcam,
    toggleWebcam,
    toggleMic,
    enableScreenShare,
    presenterId,
    localScreenShareOn,
    toggleScreenShare,
    meetingId,
    localParticipant,
  } = useMeeting({});

  useEffect(() => {
    setTimeout(() => {
      join();
      changeWebcam();
    }, 1000);

    return () => {
      leave();
    };
  }, []);

  const participantIds = [...participants.keys()];

  const participantCount = participantIds ? participantIds.length : null;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: ROBOTO_FONTS.RobotoBlack,
                color: colors.primary[100],
              }}
            >
              {meetingId ? meetingId : "xxx - xxx - xxx"}
            </Text>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                marginLeft: 10,
                marginTop: 4,
              }}
              onPress={() => {
                Clipboard.setString("meetingId");
              }}
            >
              <Copy fill={colors.primary[100]} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: "#9A9FA5",
              fontSize: 16,
              fontFamily: ROBOTO_FONTS.Roboto,
            }}
          >
            00:40
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => {}}>
            <CameraSwitch height={26} width={26} fill={colors.primary[100]} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Center */}
      <View style={{ flex: 1, marginVertical: 16 }}>
        {participantCount > 1 ? (
          <>
            {!localScreenShareOn ? (
              <LocalPresenter />
            ) : (
              <LargeView participantId={participantIds[1]} />
            )}
            <MiniView
              participantId={
                participantIds[localScreenShareOn || presenterId ? 1 : 0]
              }
            />
          </>
        ) : participantCount === 1 ? (
          <LocalViewContainer participantId={participantIds[0]} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </View>
      {/* Bottom */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <IconContainer
          backgroundColor={"red"}
          Icon={() => {
            return <CallEnd height={30} width={30} fill="#FFF" />;
          }}
        />
        <IconContainer
          isDropDown={true}
          onDropDownPress={() => {
            console.log("hello");
          }}
          backgroundColor={!localMicOn ? colors.primary[100] : "transparent"}
          onPress={() => {
            toggleMic();
          }}
          Icon={() => {
            return localMicOn ? (
              <MicOn height={26} width={26} fill="#FFF" />
            ) : (
              <MicOff height={26} width={26} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          isDropDown={true}
          backgroundColor={!localWebcamOn ? colors.primary[100] : "transparent"}
          onPress={() => {
            toggleWebcam();
          }}
          Icon={() => {
            return localWebcamOn ? (
              <VideoOn height={26} width={26} fill="#FFF" />
            ) : (
              <VideoOff height={36} width={36} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          onPress={() => {
            toggleScreenShare();
          }}
          style={{
            borderWidth: 1.5,
            borderColor: "#2B3034",
          }}
          Icon={() => {
            return <Chat height={22} width={22} fill="#FFF" />;
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: "#2B3034",
            transform: [{ rotate: "90deg" }],
          }}
          Icon={() => {
            return <More height={20} width={20} fill="#FFF" />;
          }}
        />
      </View>
    </>
  );
}
