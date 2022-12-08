import { RTCView, mediaDevices } from "@videosdk.live/react-native-sdk";
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MicOff, MicOn, VideoOff, VideoOn } from "../../assets/icons";
import TextInputContainer from "../../components/TextInputContainer";
import Button from "../../components/Button";
import colors from "../../styles/colors";
import { createMeeting, getToken, validateMeeting } from "../../api/api";
import { SCREEN_NAMES } from "../../navigators/screenNames";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import Menu from "../../components/Menu";
import MenuItem from "../meeting/Components/MenuItem";
import { ROBOTO_FONTS } from "../../styles/fonts";

export default function Join({ navigation }) {
  const [tracks, setTrack] = useState("");
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState("");

  const meetingTypes = [
    { key: "ONE_TO_ONE", value: "One to One Meeting" },
    { key: "GROUP", value: "Group Meeting" },
  ];

  const [meetingType, setMeetingType] = useState(meetingTypes[0]);

  const [isVisibleCreateMeetingContainer, setisVisibleCreateMeetingContainer] =
    useState(false);
  const [isVisibleJoinMeetingContainer, setisVisibleJoinMeetingContainer] =
    useState(false);

  const disposeVideoTrack = () => {
    setTrack((stream) => {
      stream.getTracks().forEach((track) => {
        track.enabled = false;
        return track;
      });
    });
  };

  const optionRef = useRef();
  const isMainScreen = () => {
    return !isVisibleJoinMeetingContainer && !isVisibleCreateMeetingContainer;
  };

  useFocusEffect(
    React.useCallback(() => {
      mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          setTrack(stream);
        })
        .catch((e) => {
          console.log(e);
        });
    }, [])
  );

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: colors.primary["900"],
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.primary["900"],
            justifyContent: "space-between",
          }}
        >
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
                {videoOn && tracks ? (
                  <RTCView
                    streamURL={tracks.toURL()}
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
                      backgroundColor: "#202427",
                    }}
                  >
                    <Text style={{ color: colors.primary[100] }}>
                      Camera Off
                    </Text>
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
                    <MicOff
                      width={25}
                      height={25}
                      fill={colors.primary["100"]}
                    />
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
                    <VideoOff
                      width={35}
                      height={35}
                      fill={colors.primary["100"]}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 32 }}>
            {!isVisibleCreateMeetingContainer &&
              !isVisibleJoinMeetingContainer && (
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
                <TouchableOpacity
                  onPress={async () => {
                    optionRef.current.show();
                  }}
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#202427",
                    borderRadius: 12,
                    marginVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary["100"],
                      fontSize: 16,
                      fontFamily: ROBOTO_FONTS.RobotoBold,
                    }}
                  >
                    {meetingType.value}
                  </Text>
                </TouchableOpacity>
                <Menu
                  ref={optionRef}
                  menuBackgroundColor={colors.primary[700]}
                  fullWidth
                >
                  {meetingTypes.map((meetingType, index) => {
                    return (
                      <>
                        <MenuItem
                          title={meetingType.value}
                          onPress={() => {
                            optionRef.current.close(true);
                            setMeetingType(meetingType);
                          }}
                        />
                        {index != meetingTypes.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              backgroundColor: colors.primary["600"],
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </Menu>
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
                    disposeVideoTrack();
                    navigation.navigate(SCREEN_NAMES.Meeting, {
                      name: name.trim(),
                      token: token,
                      meetingId: meetingId,
                      micEnabled: micOn,
                      webcamEnabled: videoOn,
                      meetingType: meetingType.key,
                    });
                  }}
                />
              </>
            ) : isVisibleJoinMeetingContainer ? (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    optionRef.current.show();
                  }}
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#202427",
                    borderRadius: 12,
                    marginVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary["100"],
                      fontSize: 16,
                      fontFamily: ROBOTO_FONTS.RobotoBold,
                    }}
                  >
                    {meetingType.value}
                  </Text>
                </TouchableOpacity>
                <Menu
                  ref={optionRef}
                  menuBackgroundColor={colors.primary[700]}
                  fullWidth
                  bottom={120}
                >
                  {meetingTypes.map((meetingType, index) => {
                    return (
                      <>
                        <MenuItem
                          title={meetingType.value}
                          onPress={() => {
                            optionRef.current.close(true);
                            setMeetingType(meetingType);
                          }}
                        />
                        {index != meetingTypes.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              backgroundColor: colors.primary["600"],
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </Menu>
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
                      disposeVideoTrack();
                      navigation.navigate(SCREEN_NAMES.Meeting, {
                        name: name.trim(),
                        token: token,
                        meetingId: meetingId.trim(),
                        micEnabled: micOn,
                        webcamEnabled: videoOn,
                        meetingType: meetingType.key,
                      });
                    }
                  }}
                />
              </>
            ) : null}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
