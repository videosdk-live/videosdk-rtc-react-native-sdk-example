import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  useWindowDimensions,
  Platform,
  Clipboard,
} from "react-native";
import {
  useMeeting,
  ReactNativeForegroundService,
} from "@videosdk.live/react-native-sdk";
import ParticipantView from "./components/ParticipantView";
import ModalViewer from "./components/ModalViewer";
import ExternalVideo from "./components/ExternalVideo";
import VideosdkRPK from "../VideosdkRPK";
import { notifyMessage } from "./utils";
export default function MeetingContainer({ resetMeeting }) {
  function onParticipantJoined(participant) {
    console.log(" onParticipantJoined", participant);
  }
  function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant);
  }
  const onSpeakerChanged = (activeSpeakerId) => {
    console.log(" onSpeakerChanged", activeSpeakerId);
  };
  function onPresenterChanged(presenterId) {
    console.log(" onPresenterChanged", presenterId);
  }
  function onMainParticipantChanged(participant) {
    console.log(" onMainParticipantChanged", participant);
  }
  function onEntryRequested(participantId, name) {
    console.log(" onEntryRequested", participantId, name);
  }
  function onEntryResponded(participantId, name) {
    console.log(" onEntryResponded", participantId, name);
  }
  function onRecordingStarted() {
    console.log(" onRecordingStarted");
  }
  function onRecordingStopped() {
    console.log(" onRecordingStopped");
  }
  function onChatMessage(data) {
    console.log(" onChatMessage", data);
  }
  function onMeetingJoined() {
    console.log("onMeetingJoined");
    setTimeout(() => {
      notifyMessage("Meeting Left", "Demo meeting is limited to 10 minutes");
      leave();
    }, 600000);
  }
  function onMeetingLeft() {
    console.log("onMeetingLeft");
  }
  const onLiveStreamstarted = (data) => {
    console.log("onLiveStreamstarted example", data);
  };
  const onLiveStreamStopped = (data) => {
    console.log("onLiveStreamStopped example", data);
  };
  const onVideoStarted = (data) => {
    console.log("onVideoStarted example", data);
  };
  const onVideoStopped = (data) => {
    console.log("onVideoStopped example", data);
  };

  const {
    participants,
    join,
    leave,
    startRecording,
    stopRecording,
    toggleMic,
    toggleWebcam,
    changeWebcam,
    toggleScreenShare,
    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
    externalVideo,
    enableScreenShare,
    disableScreenShare,
    meetingId,
  } = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMainParticipantChanged,
    onEntryRequested,
    onEntryResponded,
    onRecordingStarted,
    onRecordingStopped,
    onChatMessage,
    onMeetingJoined,
    onMeetingLeft,
    onLiveStreamstarted,
    onLiveStreamStopped,
    onVideoStarted,
    onVideoStopped,
  });

  const [visibleModal, setvisibleModal] = useState(false);
  const [visibleControls, setvisibleControls] = useState(true);

  const [currentWebcamMode, setCurrentWebcamMode] = useState("back");

  const layout = useWindowDimensions();
  const mMeetingRef = useRef();

  const mMeeting = useMeeting({});

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
      Platform.OS === "android" && ReactNativeForegroundService.stop();
      leave();
    };
  }, []);

  useEffect(() => {
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
  }, []);

  const handlestartVideo = () => {
    startVideo({
      link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    });
  };

  const handlestopVideo = () => {
    stopVideo();
  };

  const handleresumeVideo = () => {
    resumeVideo();
  };

  const handlepauseVideo = () => {
    pauseVideo({ currentTime: 5 });
  };
  const handlesseekVideo = () => {
    seekVideo({ currentTime: 10 });
  };

  const handleStartLiveStream = () => {
    startLivestream([
      {
        url: "rtmp://a.rtmp.youtube.com/live2",
        streamKey: "key",
      },
    ]);
  };

  const handleStopLiveStream = () => {
    stopLivestream();
  };
  const handleStartRecording = () => {
    startRecording();
  };
  const handleStopRecording = () => {
    stopRecording();
  };

  const participantsArrId = [...participants.keys()];

  const Button = ({ onPress, buttonText, backgroundColor }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          marginVertical: 4,
          marginHorizontal: 4,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: "white", fontSize: 12 }}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
      {meetingId ? (
        <TouchableOpacity
          style={{ padding: 12 }}
          onPress={() => {
            Clipboard.setString(meetingId);
            notifyMessage("MeetingId Copied Successfully!");
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Meeting Id : {meetingId}
          </Text>
        </TouchableOpacity>
      ) : null}
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <ExternalVideo />

        {participantsArrId.length > 0 ? (
          <FlatList
            data={participantsArrId}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setvisibleControls(!visibleControls);
                  }}
                  style={{
                    height: layout.height / 2,
                    marginVertical: 3,
                  }}
                >
                  <ParticipantView participantId={item} />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: "#F6F6FF",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>
              Press Join button to enter meeting.
            </Text>
          </View>
        )}
      </View>
      {visibleControls ? (
        <View
          style={{
            flexDirection: "row",
            padding: 6,
            flexWrap: "wrap",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            backgroundColor: "rgba(0,0,0, 0.8)",
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Button
            onPress={() => {
              join();
              setTimeout(() => {
                changeWebcam(currentWebcamMode == "front"? "0" : "1");
                setCurrentWebcamMode(currentWebcamMode =="front" ? "back" : "front");
              }, 500);
            }}
            buttonText={"JOIN"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={() => {
              leave();
              resetMeeting();
            }}
            buttonText={"LEAVE"}
            backgroundColor={"red"}
          />
          <Button
            onPress={toggleMic}
            buttonText={"TOGGLE MIC"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={toggleWebcam}
            buttonText={"TOGGLE WEBCAM"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={async () => {
              changeWebcam(currentWebcamMode == "front"? "0" : "1");
              setCurrentWebcamMode(currentWebcamMode =="front" ? "back" : "front");
            }}
            buttonText={"SWITCH CAMERA"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={() => {
              Platform.OS === "android"
                ? toggleScreenShare()
                : VideosdkRPK.startBroadcast();
            }}
            buttonText={"TOGGLE SCREEN SHARE"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handlestartVideo}
            buttonText={"START VIDEO"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handleresumeVideo}
            buttonText={"RESUME VIDEO"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handlepauseVideo}
            buttonText={"PAUSE VIDEO"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handlesseekVideo}
            buttonText={"SEEK VIDEO"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handlestopVideo}
            buttonText={"STOP VIDEO"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handleStartLiveStream}
            buttonText={"START STREAM"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handleStopLiveStream}
            buttonText={"STOP STREAM"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handleStartRecording}
            buttonText={"START RECORDING"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handleStopRecording}
            buttonText={"STOP RECORDING"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={() => {
              setvisibleModal(true);
            }}
            buttonText={"CHAT"}
            backgroundColor={"#1178F8"}
          />
          <ModalViewer
            visibleModal={visibleModal}
            setvisibleModal={setvisibleModal}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
