import React from "react";
import ParticipantListItem from "./ParticipantListItem";
import { FlatList, View, Text } from "react-native";
import colors from "../../../styles/colors";
import { ROBOTO_FONTS } from "../../../styles/fonts";
function ParticipantsViewer({ participantIds }) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "#2B3034",
      }}
    >
      <View
        style={{
          height: 30,
          marginTop: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.primary[100],
            fontFamily: ROBOTO_FONTS.Roboto,
          }}
        >
          Participants (2)
        </Text>
      </View>
      <FlatList
        data={participantIds}
        // keyExtractor={(item) => `${item.participantId}_participant`}
        style={{ marginBottom: 4 }}
        renderItem={({ item }) => {
          return <ParticipantListItem participantId={item} />;
        }}
      />
    </View>
  );
}

export default ParticipantsViewer;
