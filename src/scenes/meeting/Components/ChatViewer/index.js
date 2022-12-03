import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import TextInputContainer from "./TextInput";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import Hyperlink from "react-native-hyperlink";
import moment from "moment";
import { usePubSub } from "@videosdk.live/react-native-sdk";
import colors from "../../../../styles/colors";
import { ROBOTO_FONTS } from "../../../../styles/fonts";
import { convertRFValue } from "../../../../styles/spacing";

const ChatViewer = ({}) => {
  const mpubsubRef = useRef();

  const mpubsub = usePubSub("CHAT", {});

  useEffect(() => {
    mpubsubRef.current = mpubsub;
  }, [mpubsub]);

  const mMeeting = useMeeting({});
  const localParticipantId = mMeeting?.localParticipant?.id;

  const [message, setMessage] = useState("");

  const flatListRef = React.useRef();
  const [isSending, setIsSending] = useState(false);

  const sendMessage = () => {
    mpubsub.publish(message, { persist: true });
    setMessage("");
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };
  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginTop: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: colors.primary[100],
            fontFamily: ROBOTO_FONTS.RobotoBold,
          }}
        >
          Chat
        </Text>
      </View>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "android" ? undefined : "position"}
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {mpubsub.messages ? (
          <FlatList
            ref={flatListRef}
            data={mpubsub.messages}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => {
              const { message, senderId, timestamp, senderName } = item;
              const localSender = localParticipantId === senderId;
              const time = moment(timestamp).format("hh:mm a");
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: colors.primary[600],
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    marginVertical: 6,
                    borderRadius: 4,
                    borderRadius: 10,
                    marginHorizontal: 12,
                    alignSelf: localSender ? "flex-end" : "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: convertRFValue(12),
                      fontFamily: ROBOTO_FONTS.Roboto,
                      color: "#9A9FA5",
                      fontWeight: "bold",
                    }}
                  >
                    {localSender ? "You" : senderName}
                  </Text>
                  <Hyperlink
                    linkDefault={true}
                    onPress={(url) => Linking.openURL(url)}
                    linkStyle={{ color: "blue" }}
                  >
                    <Text
                      style={{
                        fontSize: convertRFValue(14),
                        color: "white",
                        fontFamily: ROBOTO_FONTS.RobotoMedium,
                        // marginTop: 8,
                      }}
                    >
                      {message}
                    </Text>
                  </Hyperlink>
                  <Text
                    style={{
                      color: "grey",
                      fontSize: convertRFValue(10),
                      fontFamily: ROBOTO_FONTS.Roboto,
                      alignSelf: "flex-end",
                      marginTop: 4,
                    }}
                  >
                    {time}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => `${index}_message_list`}
            style={{
              marginVertical: 5,
            }}
          />
        ) : null}
        <View
          style={{
            paddingHorizontal: 12,
          }}
        >
          <TextInputContainer
            message={message}
            setMessage={setMessage}
            isSending={isSending}
            sendMessage={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ChatViewer;
