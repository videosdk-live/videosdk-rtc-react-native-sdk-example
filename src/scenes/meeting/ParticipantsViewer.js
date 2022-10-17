import React, { useMemo } from "react";
import ParticipantListItem from "./ParticipantListItem";
import { FlatList, View } from "react-native";
function ParticipantsViewer({}) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "#2B3034",
      }}
    >
      <FlatList
        data={["ahmed", "bhesaniya"]}
        // keyExtractor={(item) => `${item.participantId}_participant`}
        style={{ marginBottom: 4 }}
        renderItem={({ item }) => {
          return <ParticipantListItem />;
        }}
      />
    </View>
  );
}

export default ParticipantsViewer;
