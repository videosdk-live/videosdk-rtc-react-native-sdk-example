import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  useWindowDimensions,
} from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";
import JoinScreen from "./JoinScreen";

export default function SessionGrid({}) {
  const [isJoin, setIsJoin] = useState(false);
  const layout = useWindowDimensions();

  // const participantsArrId = [...participants.keys()];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212032" }}>
      {isJoin ? (
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 22, color: "white", alignSelf: "center" }}>
            Empty Screen
          </Text>
        </View>
      ) : (
        <JoinScreen
          onPress={() => {
            setIsJoin(true);
          }}
        />
      )}
    </SafeAreaView>
  );
}
