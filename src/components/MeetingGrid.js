import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";
import JoinScreen from "./JoinScreen";

export default function MeetingGrid({}) {
  const [isJoin, setIsJoin] = useState(false);

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

  function onMeetingJoined() {
    console.log("onMeetingJoined");
  }
  function onMeetingLeft() {
    console.log("onMeetingLeft");
  }

  const { participants, join, leave } = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMeetingJoined,
    onMeetingLeft,
  });

  const layout = useWindowDimensions();

  const participantsArrId = [...participants.keys()];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212032" }}>
      {isJoin ? (
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <FlatList
            data={participantsArrId}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  activeOpacity={1}
                  style={{
                    height: layout.height / 2.5,
                    marginVertical: 3,
                  }}
                >
                  <ParticipantView participantId={item} />
                </View>
              );
            }}
          />

          <Controls
            exit={() => {
              setIsJoin(false);
            }}
          />
        </View>
      ) : (
        <JoinScreen
          joinSession={() => {
            join();
            setIsJoin(true);
          }}
        />
      )}
    </SafeAreaView>
  );
}
