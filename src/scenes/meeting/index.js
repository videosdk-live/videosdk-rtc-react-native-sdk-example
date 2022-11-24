import React from "react";
import { SafeAreaView } from "react-native";
import colors from "../../styles/colors";
import {
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./MeetingContainer";
import { SCREEN_NAMES } from "../../navigators/screenNames";

export default function ({ navigation, route }) {
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled;
  const webcamEnabled = route.params.webcamEnabled;
  const name = route.params.name;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary[900], padding: 12 }}
    >
      <MeetingProvider
        config={{
          meetingId: "l3vu-s2ow-6h9n",
          micEnabled: micEnabled,
          webcamEnabled: webcamEnabled,
          name: name,
          notification: {
            title: "Video SDK Meeting",
            message: "Meeting is running.",
          },
        }}
        token={
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1MzUxM2ZlOC1lNTNlLTQyNzgtYmFiYS1lN2FmOTM0NzcxNmQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIiwiYWxsb3dfbW9kIl0sImlhdCI6MTY1MTA1MTgyNCwiZXhwIjozMTcxOTU0OTQyMjR9.plGF_bBbvA15_2TmpuQ0qxUJ4guyEMNAQ5qmjWlYSDc"
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxYTgyNjA2YS02MjcyLTQzZWItODZiYy0xYjE1OWM1ZDE2MWIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY1MzY1NjQ1NH0.vDHFiVygyf7lz8CuttjjIIeeQLBxtXoQnikHVSg4BQE"
        }
      >
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              navigation.navigate(SCREEN_NAMES.Join);
            },
          }}
        >
          {() => {
            return <MeetingContainer webcamEnabled={webcamEnabled} />;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}
