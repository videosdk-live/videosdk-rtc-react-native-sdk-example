import React from "react";
import { View } from "react-native";
import RecordingIndicator from "./RecordingIndicator";
import MeetingIdDisplay from "./MeetingIdDisplay";
import CameraSwitchButton from "./CameraSwitchButton";
import ParticipantCountButton from "./ParticipantCountButton";

function TopBar({ showParticipantCount, onParticipantCountPress }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
    >
      <RecordingIndicator />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <MeetingIdDisplay />
      </View>
      <View style={{ flexDirection: "row" }}>
        <CameraSwitchButton
          style={showParticipantCount ? { marginRight: 12 } : undefined}
        />
        {showParticipantCount && (
          <ParticipantCountButton onPress={onParticipantCountPress} />
        )}
      </View>
    </View>
  );
}

export default React.memo(TopBar);
