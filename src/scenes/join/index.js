import { RTCView, mediaDevices } from "@videosdk.live/react-native-sdk";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { MicOff, MicOn, VideoOff, VideoOn } from "../../assets/icons";
import TextInputContainer from "../../components/TextInputContainer";
import Button from "../../components/Button";
import colors from "../../styles/colors";
import { createMeeting, getToken, validateMeeting } from "../../api/api";
import { SCREEN_NAMES } from "../../navigators/screenNames";
import { useFocusEffect } from "@react-navigation/native";

export default function Join({ navigation }) {
  const [tracks, setTrack] = useState("");
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState("");

  const [isVisibleCreateMeetingContainer, setisVisibleCreateMeetingContainer] =
    useState(false);
  const [isVisibleJoinMeetingContainer, setisVisibleJoinMeetingContainer] =
    useState(false);

  useEffect(() => {
    mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        setTrack(stream.toURL());
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const isMainScreen = () => {
    return !isVisibleJoinMeetingContainer && !isVisibleCreateMeetingContainer;
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!isMainScreen()) {
          setisVisibleCreateMeetingContainer(false);
          setisVisibleJoinMeetingContainer(false);
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isVisibleCreateMeetingContainer, isVisibleJoinMeetingContainer])
  );

  const SelfViewContainer = () => {
    return (
      <View
        style={{
          paddingTop: "15%",
          height: "45%",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "50%",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {videoOn ? (
              <RTCView
                streamURL={tracks}
                objectFit={"cover"}
                mirror={true}
                style={{
                  flex: 1,
                  borderRadius: 20,
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: colors.black,
                  backgroundColor: "#202427",
                }}
              >
                <Text style={{ color: colors.primary[100] }}>Camera Off</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "transparent",
              justifyContent: "space-evenly",
              position: "absolute",
              bottom: 10,
              right: 0,
              left: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setMicon(!micOn);
              }}
              style={{
                height: 50,
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 100,
                backgroundColor: micOn ? colors.primary["100"] : "red",
              }}
            >
              {micOn ? (
                <MicOn width={25} height={25} fill={colors.black} />
              ) : (
                <MicOff width={25} height={25} fill={colors.primary["100"]} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVideoOn(!videoOn);
              }}
              style={{
                height: 50,
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 100,
                backgroundColor: videoOn ? colors.primary["100"] : "red",
              }}
            >
              {videoOn ? (
                <VideoOn width={25} height={25} fill={colors.black} />
              ) : (
                <VideoOff width={35} height={35} fill={colors.primary["100"]} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary["900"],
        justifyContent: "space-between",
      }}
    >
      <SelfViewContainer />
      <View style={{ marginHorizontal: 32 }}>
        {!isVisibleCreateMeetingContainer && !isVisibleJoinMeetingContainer && (
          <>
            <Button
              text={"Create a meeting"}
              onPress={() => {
                setisVisibleCreateMeetingContainer(true);
              }}
            />
            <Button
              text={"Join a meeting"}
              backgroundColor={"#202427"}
              onPress={() => {
                setisVisibleJoinMeetingContainer(true);
              }}
            />
          </>
        )}
        {isVisibleCreateMeetingContainer ? (
          <>
            <TextInputContainer
              placeholder={"Enter your name"}
              value={name}
              setValue={setName}
            />
            <Button
              text={"Join a meeting"}
              onPress={async () => {
                if (name.length <= 0) {
                  Toast.show("Please enter your name");
                  return;
                }
                const token = await getToken();
                let meetingId = await createMeeting({ token: token });
                navigation.navigate(SCREEN_NAMES.Meeting, {
                  name: name.trim(),
                  token: token,
                  meetingId: meetingId,
                  micEnabled: micOn,
                  webcamEnabled: videoOn,
                });
              }}
            />
          </>
        ) : isVisibleJoinMeetingContainer ? (
          <>
            <TextInputContainer
              placeholder={"Enter your name"}
              value={name}
              setValue={setName}
            />
            <TextInputContainer
              placeholder={"Enter meeting code"}
              value={meetingId}
              setValue={setMeetingId}
            />
            <Button
              text={"Join a meeting"}
              onPress={async () => {
                if (name.trim().length <= 0) {
                  Toast.show("Please enter your name");
                  return;
                }
                if (meetingId.trim().length <= 0) {
                  Toast.show("Please enter meetingId");

                  return;
                }
                const token = await getToken();
                let valid = await validateMeeting({
                  token: token,
                  meetingId: meetingId.trim(),
                });
                if (valid) {
                  navigation.navigate(SCREEN_NAMES.Meeting, {
                    name: name.trim(),
                    token: token,
                    meetingId: meetingId.trim(),
                    micEnabled: micOn,
                    webcamEnabled: videoOn,
                  });
                }
              }}
            />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
