import React from "react";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import LocalParticipantPresenter from "../Components/LocalParticipantPresenter";
import RemoteParticipantPresenter from "./RemoteParticipantPresenter";

export default function PresenterArea() {
  const { presenterId, localScreenShareOn } = useMeeting({});

  if (presenterId && !localScreenShareOn) {
    return <RemoteParticipantPresenter presenterId={presenterId} />;
  }

  if (presenterId && localScreenShareOn) {
    return <LocalParticipantPresenter />;
  }

  return null;
}
