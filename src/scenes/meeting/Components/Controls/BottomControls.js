import React, { useRef, useState } from "react";
import { View } from "react-native";
import { getAudioDeviceList } from "@videosdk.live/react-native-sdk";
import { CallEnd, Chat, More } from "../../../../assets/icons";
import IconContainer from "../../../../components/IconContainer";
import LeaveMenu from "./LeaveMenu";
import AudioDeviceMenu from "./AudioDeviceMenu";
import MicToggleButton from "./MicToggleButton";
import VideoToggleButton from "./VideoToggleButton";
import MoreOptionsMenu from "./MoreOptionsMenu";
import useRenderCount from "../../../../utils/useRenderCount";

function BottomControls({
  onChatPress,
  showParticipantMenuItem,
  onParticipantPress,
}) {
  useRenderCount("BottomControls");
  const leaveMenuRef = useRef();
  const audioDeviceMenuRef = useRef();
  const moreOptionsMenuRef = useRef();

  const [audioDevice, setAudioDevice] = useState([]);

  async function updateAudioDeviceList() {
    const devices = await getAudioDeviceList();
    setAudioDevice(devices);
  }

  return (
    <>
      <LeaveMenu ref={leaveMenuRef} moreOptionsMenuRef={moreOptionsMenuRef} />
      <AudioDeviceMenu ref={audioDeviceMenuRef} audioDevice={audioDevice} />
      <MoreOptionsMenu
        ref={moreOptionsMenuRef}
        showParticipantMenuItem={showParticipantMenuItem}
        onParticipantPress={onParticipantPress}
      />
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
            leaveMenuRef.current.show();
          }}
        />
        <MicToggleButton
          onDropDownPress={async () => {
            await updateAudioDeviceList();
            audioDeviceMenuRef.current.show();
          }}
        />
        <VideoToggleButton />
        <IconContainer
          onPress={onChatPress}
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
            moreOptionsMenuRef.current.show();
          }}
          Icon={() => {
            return <More height={18} width={18} fill="#FFF" />;
          }}
        />
      </View>
    </>
  );
}

export default React.memo(BottomControls);
