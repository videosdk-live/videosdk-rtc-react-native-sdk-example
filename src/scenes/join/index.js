import { RTCView, mediaDevices } from "@videosdk.live/react-native-sdk";
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { MicOff, MicOn, VideoOff, VideoOn } from "../../assets/icons";
import TextInputContainer from "../../components/TextInputContainer";
import Button from "../../components/Button";
import colors from "../../styles/colors";

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

  // useEffect(async () => {
  //   mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then((stream) => {
  //       setTrack(stream.toURL());
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

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
              borderRadius: 20,
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
                <Text style={{ color: colors.primary[100] }}>No media</Text>
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
                <MicOn width={20} height={20} fill={colors.black} />
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
                <VideoOn width={20} height={20} fill={colors.black} />
              ) : (
                <VideoOff width={30} height={30} fill={colors.primary["100"]} />
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
              onPress={() => {
                setisVisibleJoinMeetingContainer(true);
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
              onPress={() => {
                setisVisibleJoinMeetingContainer(true);
              }}
            />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
