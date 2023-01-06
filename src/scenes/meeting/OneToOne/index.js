import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Clipboard,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
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
} from "../../../assets/icons";
import colors from "../../../styles/colors";
import IconContainer from "../../../components/IconContainer";
import LocalViewContainer from "./LocalViewContainer";
import LargeView from "./LargeView";
import MiniView from "./MiniView";
import LocalParticipantPresenter from "../Components/LocalParticipantPresenter";
import Menu from "../../../components/Menu";
import MenuItem from "../Components/MenuItem";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import Toast from "react-native-simple-toast";
import BottomSheet from "../../../components/BottomSheet";
import ParticipantListViewer from "../Components/ParticipantListViewer";
import ChatViewer from "../Components/ChatViewer";
import Lottie from "lottie-react-native";
import recording_lottie from "../../../assets/animation/recording_lottie.json";
import Blink from "../../../components/Blink";
import VideosdkRPK from "../../../../VideosdkRPK";
import ParticipantStatsViewer from "../Components/ParticipantStatsViewer";

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
    presenterId,
    localScreenShareOn,
    toggleScreenShare,
    meetingId,
    startRecording,
    stopRecording,
    meeting,
    recordingState,
    enableScreenShare,
    disableScreenShare,
  } = useMeeting({
    onError: (data) => {
      const { code, message } = data;
      Toast.show(`Error: ${code}: ${message}`);
    },
  });

  const leaveMenu = useRef();
  const bottomSheetRef = useRef();
  const audioDeviceMenuRef = useRef();
  const moreOptionsMenu = useRef();
  const recordingRef = useRef();

  const participantIds = [...participants.keys()];

  const participantCount = participantIds ? participantIds.length : null;

  const [chatViewer, setchatViewer] = useState(false);
  const [participantListViewer, setparticipantListViewer] = useState(false);
  const [participantStatsViewer, setparticipantStatsViewer] = useState(false);

  const [audioDevice, setAudioDevice] = useState([]);
  const [statParticipantId, setstatParticipantId] = useState("");

  async function updateAudioDeviceList() {
    const devices = await getAudioDeviceList();
    setAudioDevice(devices);
  }

  useEffect(() => {
    if (Platform.OS == "ios") {
      VideosdkRPK.addListener("onScreenShare", (event) => {
        if (event === "START_BROADCAST") {
          enableScreenShare();
        } else if (event === "STOP_BROADCAST") {
          disableScreenShare();
        }
      });

      return () => {
        VideosdkRPK.removeSubscription("onScreenShare");
      };
    }
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

  const openStatsBottomSheet = ({ pId }) => {
    setparticipantStatsViewer(true);
    setstatParticipantId(pId);
    bottomSheetRef.current.show();
  };
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
                ? 8
                : 0,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: ROBOTO_FONTS.RobotoBold,
                color: colors.primary[100],
              }}
            >
              {meetingId ? meetingId : "xxx - xxx - xxx"}
            </Text>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                marginLeft: 10,
                // marginTop: 4,
              }}
              onPress={() => {
                Clipboard.setString(meetingId);
                Toast.show("Meeting Id copied Successfully");
              }}
            >
              <Copy fill={colors.primary[100]} width={18} height={18} />
            </TouchableOpacity>
          </View>
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
      <View style={{ flex: 1, marginTop: 8, marginBottom: 12 }}>
        {participantCount > 1 ? (
          <>
            {localScreenShareOn ? (
              <LocalParticipantPresenter />
            ) : (
              <LargeView
                participantId={participantIds[1]}
                openStatsBottomSheet={openStatsBottomSheet}
              />
            )}
            <MiniView
              openStatsBottomSheet={openStatsBottomSheet}
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
          icon={<Leave width={22} height={22} />}
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
        left={70}
      >
        {audioDevice.map((device, index) => {
          return (
            <>
              <MenuItem
                title={
                  device == "SPEAKER_PHONE"
                    ? "Speaker"
                    : device == "EARPIECE"
                    ? "Earpiece"
                    : device == "BLUETOOTH"
                    ? "Bluetooth"
                    : "Wired Headset"
                }
                onPress={() => {
                  switchAudioDevice(device);
                  audioDeviceMenuRef.current.close();
                }}
              />

              {index != audioDevice.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.primary["600"],
                  }}
                />
              )}
            </>
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
              ? "Start"
              : recordingState === Constants.recordingEvents.RECORDING_STARTING
              ? "Starting"
              : recordingState === Constants.recordingEvents.RECORDING_STOPPING
              ? "Stopping"
              : "Stop"
          } Recording`}
          icon={<Recording width={22} height={22} />}
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
            title={`${localScreenShareOn ? "Stop" : "Start"} Screen Share`}
            icon={<ScreenShare width={22} height={22} />}
            onPress={() => {
              moreOptionsMenu.current.close();
              if (presenterId == null || localScreenShareOn)
                Platform.OS === "android"
                  ? toggleScreenShare()
                  : VideosdkRPK.startBroadcast();
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
          icon={<Participants width={22} height={22} />}
          onPress={() => {
            setparticipantListViewer(true);
            moreOptionsMenu.current.close(false);
            bottomSheetRef.current.show();
          }}
        />
      </Menu>
      {/* Bottom */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <IconContainer
          backgroundColor={"red"}
          Icon={() => {
            return <CallEnd height={26} width={26} fill="#FFF" />;
          }}
          onPress={() => {
            // leave();
            leaveMenu.current.show();
          }}
        />
        <IconContainer
          style={{
            paddingLeft: 0,
            height: 52,
          }}
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
              <MicOn height={24} width={24} fill="#FFF" />
            ) : (
              <MicOff height={28} width={28} fill="#1D2939" />
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
              <VideoOn height={24} width={24} fill="#FFF" />
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
            return <More height={18} width={18} fill="#FFF" />;
          }}
        />
      </View>
      <BottomSheet
        sheetBackgroundColor={"#2B3034"}
        draggable={true}
        radius={12}
        hasDraggableIcon
        closeFunction={() => {
          setparticipantListViewer(false);
          setchatViewer(false);
          setparticipantStatsViewer(false);
          setstatParticipantId("");
        }}
        ref={bottomSheetRef}
        height={Dimensions.get("window").height * 0.5}
      >
        {chatViewer ? (
          <ChatViewer />
        ) : participantListViewer ? (
          <ParticipantListViewer participantIds={participantIds} />
        ) : participantStatsViewer ? (
          <ParticipantStatsViewer participantId={statParticipantId} />
        ) : null}
      </BottomSheet>
    </>
  );
}
