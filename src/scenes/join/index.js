import {
  RTCView,
  mediaDevices,
  useMediaDevice,
  createCameraVideoTrack,
  switchAudioDevice,
} from "@videosdk.live/react-native-sdk";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MicOff,
  MicOn,
  VideoOff,
  VideoOn,
  CameraSwitch,
  Speaker,
} from "../../assets/icons";
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

import Modal from "react-native-modal";

export default function Join({ navigation }) {
  const [tracks, setTrack] = useState("");
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [isAudioListVisible, setAudioListVisible] = useState(false);
  const [facingMode, setfacingMode] = useState("user");
  const [audioList, setAudioList] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

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

  const { getAudioDeviceList } = useMediaDevice();

  const fetchAudioDevices = async () => {
    const devices = await getAudioDeviceList();
    setAudioList(devices);
  };

  const renderAudioDevice = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.deviceButton,
        item.deviceId === selectedDeviceId && styles.selectedDeviceButton,
      ]}
      onPress={() => handleDevicePress(item)}
    >
      <Text style={styles.deviceText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleDevicePress = async (device) => {
    // Handle the device selection logic here
    const id = device.deviceId;
    await switchAudioDevice(id);
    setSelectedDeviceId(id);

    toggleAudioList();
  };

  const handleAudioButtonPress = async () => {
    await fetchAudioDevices();
    toggleAudioList();
  };

  const toggleAudioList = () => {
    setAudioListVisible(!isAudioListVisible);
  };

  const optionRef = useRef();
  const isMainScreen = () => {
    return !isVisibleJoinMeetingContainer && !isVisibleCreateMeetingContainer;
  };

  useFocusEffect(
    React.useCallback(() => {
      getTrack();
    }, [])
  );

  const getTrack = async () => {
    const track = await createCameraVideoTrack({
      optimizationMode: "motion",
      encoderConfig: "h720p_w960p",
      facingMode: facingMode,
    });
    setTrack(track);
  };

  useEffect(() => {
    getTrack();
  }, [facingMode]);

  const toggleCameraFacing = () => {
    try {
      disposeVideoTrack();
    } finally {
      setfacingMode((prevFacingMode) =>
        prevFacingMode === "environment" ? "user" : "environment"
      );
    }
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
        edges={['top', 'bottom']}
          style={{
            flex: 1,
            backgroundColor: colors.primary["900"],
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleAudioButtonPress();
              }}
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                padding: 10,
                borderRadius: 10,
                padding: 20,
                marginRight: 10,
              }}
            >
              {<Speaker width={25} height={25} fill={colors.primary[100]} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleCameraFacing();
              }}
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                padding: 10,
                borderRadius: 10,
                padding: 20,
                marginRight: 10,
              }}
            >
              {
                <CameraSwitch
                  width={25}
                  height={25}
                  fill={colors.primary[100]}
                />
              }
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={isAudioListVisible}
            onBackdropPress={toggleAudioList}
            style={{ justifyContent: "flex-end", margin: 0 }}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Available Audio Devices</Text>
              <FlatList
                data={audioList}
                renderItem={renderAudioDevice}
                keyExtractor={(item) => item.deviceId}
              />
            </View>
          </Modal>
          <View
            style={{
              paddingTop: "5%",
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
                      defaultCamera: facingMode === "user" ? "front" : "back",
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
                        defaultCamera: facingMode === "user" ? "front" : "back",
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

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    fontSize: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  deviceButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  deviceText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDeviceButton: {
    backgroundColor: "#BBB5B4", // Lighter background color for selected device
  },
});
