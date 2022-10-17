import { useMeeting } from "@videosdk.live/react-native-sdk";
import { useEffect, useState } from "react";
import MeetingViewer from "./MeetingViewer";
import MoreThan2ParticipantsView from "./MoreThan2ParticipantsView";
import WaitingToJoinView from "./WaitingToJoinView";
import React from "react";

export default function MeetingContainer() {
  const [isJoined, setJoined] = useState(false);
  const [isMoreThan2Participants, setMoreThan2Participant] = useState(false);

  const onMeetingJoined = () => {
    setJoined(true);
    if (meeting.participants.keys().length > 2) {
      console.log("MOre than 2 participants");
      setMoreThan2Participant(true);
    }
  };

  const { join, changeWebcam, participants, leave } = useMeeting({
    onMeetingJoined: () => {
      setTimeout(() => {
        setJoined(true);
      }, 500);
    },
    onParticipantLeft: () => {
      if (participants.size < 2) {
        setMoreThan2Participant(false);
      }
    },
  });

  useEffect(() => {
    if (isJoined) {
      if (participants.size > 2) {
        setMoreThan2Participant(true);
      }
    }
  }, [isJoined]);

  useEffect(() => {
    setTimeout(() => {
      if (!isJoined) {
        join();
        changeWebcam();
      }
    }, 1000);

    return () => {
      leave();
    };
  }, []);

  return isJoined ? (
    isMoreThan2Participants ? (
      <MoreThan2ParticipantsView />
    ) : (
      <MeetingViewer />
    )
  ) : (
    <WaitingToJoinView />
  );
}
