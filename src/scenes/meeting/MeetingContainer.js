import { useMeeting } from "@videosdk.live/react-native-sdk";
import { useEffect, useState } from "react";
import OneToOneMeetingViewer from "./OneToOne";
import ConferenceMeetingViewer from "./Conference/ConferenceMeetingViewer";
import ParticipantLimitViewer from "./OneToOne/ParticipantLimitViewer";
import WaitingToJoinView from "./Components/WaitingToJoinView";

export default function MeetingContainer({ webcamEnabled, meetingType }) {
  const [isJoined, setJoined] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(false);

  const { join, participants, leave } = useMeeting({
    onMeetingJoined: () => {
      setTimeout(() => {
        setJoined(true);
      }, 500);
    },
    onParticipantLeft: () => {
      if (participants.size < 2) {
        setParticipantLimit(false);
      }
    },
  });

  useEffect(() => {
    if (isJoined) {
      if (participants.size > 2) {
        setParticipantLimit(true);
      }
    }
  }, [isJoined]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!isJoined) {
        try {
          await join();
        } catch (err) {
          console.error("Failed to join meeting:", err);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      (async () => {
        try {
          await leave();
        } catch (err) {
          console.error("Failed to leave meeting:", err);
        }
      })();
    };
  }, []);

  return isJoined ? (
    meetingType === "GROUP" ? (
      <ConferenceMeetingViewer />
    ) : participantLimit ? (
      <ParticipantLimitViewer />
    ) : (
      <OneToOneMeetingViewer />
    )
  ) : (
    <WaitingToJoinView />
  );
}
