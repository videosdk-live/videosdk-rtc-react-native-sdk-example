import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Clipboard,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
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
} from "../../assets/icons";
import colors from "../../styles/colors";
import IconContainer from "../../components/IconContainer";
import LocalViewContainer from "./Components/LocalViewContainer";
import LargeView from "./Components/LargeView";
import MiniView from "./Components/MiniView";
import LocalPresenter from "./Components/LocalPresenter";
import Menu from "../../components/Menu";
import MenuItem from "./Components/MenuItem";
import { ROBOTO_FONTS } from "../../styles/fonts";
import Toast from "react-native-simple-toast";
import BottomSheet from "../../components/BottomSheet";
import ParticipantsViewer from "./ParticipantsViewer";
import ChatViewer from "./ChatViewer";

export default function OneToOneMeetingViewer() {
  const {
    join,
    participants,
    localWebcamOn,
    localMicOn,
    leave,
    end,
    changeWebcam,
    toggleWebcam,
    toggleMic,
    enableScreenShare,
    presenterId,
    localScreenShareOn,
    toggleScreenShare,
    meetingId,
    localParticipant,
    startRecording,
    stopRecording,
  } = useMeeting({
    onRecordingStarted: () => {
      setRecordingState("STARTED");
    },

    onRecordingStarted: () => {
      setRecordingState("STOPPED");
    },
  });

  const leaveMenu = useRef();
  const bottomSheetRef = useRef();
  const moreOptionsMenu = useRef();

  const participantIds = [...participants.keys()];

  const participantCount = participantIds ? participantIds.length : null;

  const [recordingState, setRecordingState] = useState("STOPPED");
  const [chatViewer, setchatViewer] = useState(false);
  const [participantListViewer, setparticipantListViewer] = useState(false);

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
                Clipboard.setString(meetingId);
                Toast.show("Meeting Id copied Successfully");
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
          <TouchableOpacity
            onPress={() => {
              changeWebcam();
            }}
          >
            <CameraSwitch height={26} width={26} fill={colors.primary[100]} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Center */}
      <View style={{ flex: 1, marginVertical: 16 }}>
        {participantCount > 1 ? (
          <>
            {localScreenShareOn ? (
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
      <Menu
        ref={leaveMenu}
        menuBackgroundColor={colors.primary[700]}
        placement="left"
      >
        <MenuItem
          title={"Leave"}
          description={"Only you will leave the call"}
          onPress={() => {
            leave();
            moreOptionsMenu.current.close();
          }}
        />
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary["600"],
          }}
        />
        <MenuItem
          title={"End"}
          description={"End call for all participants"}
          onPress={() => {
            end();
            moreOptionsMenu.current.close();
          }}
        />
      </Menu>
      <Menu
        ref={moreOptionsMenu}
        menuBackgroundColor={colors.primary[700]}
        placement="right"
      >
        <MenuItem
          title={`${
            recordingState == "STOPPED"
              ? "Start "
              : recordingState == "STARTING"
              ? "Starting "
              : "Stop"
          } Recording`}
        />
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary["600"],
          }}
          onPress={() => {
            if (recordingState == "STOPPED") {
              startRecording("");
              setRecordingState("STARTING");
            } else if (recordingState == "STARTED") {
              stopRecording();
            }
            moreOptionsMenu.current.close();
          }}
        />
        {(presenterId == null || localScreenShareOn) && (
          <MenuItem
            title={`${localScreenShareOn ? "Stop " : "Start "} Screen Share`}
            onPress={() => {
              moreOptionsMenu.current.close();
              if (presenterId == null || localScreenShareOn)
                toggleScreenShare();
            }}
          />
        )}
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary["600"],
          }}
        />
        <MenuItem
          title={"Participants"}
          onPress={() => {
            setparticipantListViewer(true);
            bottomSheetRef.current.show();
            moreOptionsMenu.current.close();
          }}
        />
      </Menu>
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
          onPress={() => {
            // leave();
            leaveMenu.current.show();
          }}
        />
        <IconContainer
          isDropDown={true}
          onDropDownPress={() => {}}
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
          style={{
            borderWidth: 1.5,
            borderColor: "#2B3034",
          }}
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
            setchatViewer(true);
            bottomSheetRef.current.show();
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
          onPress={() => {
            moreOptionsMenu.current.show();
          }}
          Icon={() => {
            return <More height={20} width={20} fill="#FFF" />;
          }}
        />
      </View>
      <BottomSheet
        sheetBackgroundColor={"#2B3034"}
        draggable={false}
        radius={30}
        hasDraggableIcon
        closeFunction={() => {
          setparticipantListViewer(false);
          setchatViewer(false);
        }}
        ref={bottomSheetRef}
        height={Dimensions.get("window").height / 2}
      >
        {chatViewer ? (
          <ChatViewer />
        ) : participantListViewer ? (
          <ParticipantsViewer participantIds={participantIds} />
        ) : null}
      </BottomSheet>
    </>
  );
}
