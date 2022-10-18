import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Clipboard,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  useMeeting,
  getAudioDeviceList,
  switchAudioDevice,
  Constants,
} from "@videosdk.live/react-native-sdk";
import {
  CallEnd,
  CameraSwitch,
  Chat,
  Copy,
  EndForAll,
  Leave,
  MicOff,
  MicOn,
  More,
  Participants,
  Recording,
  ScreenShare,
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
import Lottie from "lottie-react-native";
import recording_lottie from "../../assets/animation/recording_lottie.json";
import { fetchSession, getToken } from "../../api/api";
import Blink from "../../components/Blink";

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
    meeting,
    recordingState,
  } = useMeeting({});

  const leaveMenu = useRef();
  const bottomSheetRef = useRef();
  const audioDeviceMenuRef = useRef();
  const moreOptionsMenu = useRef();
  const recordingRef = useRef();

  const participantIds = [...participants.keys()];

  const participantCount = participantIds ? participantIds.length : null;

  // const [recordingState, setRecordingState] = useState("STOPPED");
  const [chatViewer, setchatViewer] = useState(false);
  const [participantListViewer, setparticipantListViewer] = useState(false);

  const [time, setTime] = useState("00:00");
  const timerIntervalRef = useRef();
  const [audioDevice, setAudioDevice] = useState([]);

  async function startTimer() {
    const token = await getToken();
    const session = await fetchSession({ meetingId: meeting.id, token: token });
    if (!timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    timerIntervalRef.current = setInterval(() => {
      try {
        const date = new Date(session.start);
        const diffTime = Math.abs(new Date() - date);
        const time =
          Math.trunc(Math.trunc(diffTime / 1000) / 60)
            .toString()
            .padStart(2, "0") +
          ":" +
          (Math.ceil(diffTime / 1000) % 60).toString().padStart(2, "0");
        setTime(time);
      } catch (error) {}
    }, 1000);
  }

  async function updateAudioDeviceList() {
    const devices = await getAudioDeviceList();
    setAudioDevice(devices);
  }
  useEffect(() => {
    startTimer();
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (recordingRef.current) {
      if (
        recordingState === Constants.recordingEvents.RECORDING_STARTING ||
        recordingState === Constants.recordingEvents.RECORDING_STOPPING
      ) {
        recordingRef.current.start();
      } else {
        recordingRef.current.stop();
      }
    }
  }, [recordingState]);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        {(recordingState === Constants.recordingEvents.RECORDING_STARTED ||
          recordingState === Constants.recordingEvents.RECORDING_STOPPING ||
          recordingState === Constants.recordingEvents.RECORDING_STARTING) && (
          <View>
            <Blink ref={recordingRef} duration={500}>
              <Lottie
                source={recording_lottie}
                autoPlay
                loop
                style={{
                  height: 30,
                  width: 5,
                }}
              />
            </Blink>
          </View>
        )}
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginLeft:
              recordingState === Constants.recordingEvents.RECORDING_STARTED ||
              recordingState === Constants.recordingEvents.RECORDING_STOPPING ||
              recordingState === Constants.recordingEvents.RECORDING_STARTING
                ? 10
                : 0,
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
            {time}
          </Text>
        </View>
        <View>
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
          icon={<Leave />}
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
          icon={<EndForAll />}
          onPress={() => {
            end();
            moreOptionsMenu.current.close();
          }}
        />
      </Menu>
      <Menu
        ref={audioDeviceMenuRef}
        menuBackgroundColor={colors.primary[700]}
        placement="left"
      >
        {audioDevice.map((device) => {
          return (
            <MenuItem
              title={device}
              onPress={() => {
                switchAudioDevice(device);
                audioDeviceMenuRef.current.close();
              }}
            />
          );
        })}
      </Menu>
      <Menu
        ref={moreOptionsMenu}
        menuBackgroundColor={colors.primary[700]}
        placement="right"
      >
        <MenuItem
          title={`${
            !recordingState ||
            recordingState === Constants.recordingEvents.RECORDING_STOPPED
              ? "Start "
              : recordingState === Constants.recordingEvents.RECORDING_STARTING
              ? "Starting "
              : recordingState === Constants.recordingEvents.RECORDING_STOPPING
              ? "Stopping "
              : "Stop"
          } Recording`}
          icon={<Recording />}
          onPress={() => {
            if (
              !recordingState ||
              recordingState === Constants.recordingEvents.RECORDING_STOPPED
            ) {
              startRecording();
            } else if (
              recordingState === Constants.recordingEvents.RECORDING_STARTED
            ) {
              stopRecording();
            }
            moreOptionsMenu.current.close();
          }}
        />
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary["600"],
          }}
        />
        {(presenterId == null || localScreenShareOn) && (
          <MenuItem
            title={`${localScreenShareOn ? "Stop " : "Start "} Screen Share`}
            icon={<ScreenShare />}
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
          icon={<Participants />}
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
          onDropDownPress={async () => {
            await updateAudioDeviceList();
            audioDeviceMenuRef.current.show();
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
