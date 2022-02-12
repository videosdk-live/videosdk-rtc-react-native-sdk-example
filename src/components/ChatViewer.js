import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { useMeeting, usePubSub } from "@videosdk.live/react-native-sdk";
const ChatViewer = ({ setvisibleModal }) => {
  const mpubsubRef = useRef();

  const mpubsub = usePubSub("CHAT");

  useEffect(() => {
    mpubsubRef.current = mpubsub;
  }, [mpubsub]);

  const mMeeting = useMeeting({
    onChatMessage: scrollToBottom,
  });
  const localParticipantId = mMeeting?.localParticipant?.id;

  const [message, setMessage] = useState("");

  const flatListRef = React.useRef();

  const sendMessage = () => {
    mpubsub.publish(message, { persist: true });
    setMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F6FF",
      }}
    >
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "android" ? undefined : "padding"}
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <>
          <View
            style={{
              padding: 12,
              backgroundColor: "#1178F8",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setvisibleModal(false);
              }}
            >
              <Text style={{ color: "white" }}>Back</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
              Chat
            </Text>
            <View style={{ height: 30 }} />
          </View>
          <FlatList
            ref={flatListRef}
            data={mpubsub.messages}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => {
              const { senderId, senderName, message, timestamp } = item;
              const localSender = localParticipantId === senderId;

              return (
                <View
                  key={i}
                  style={{
                    alignItems: localSender ? "flex-end" : "flex-start",
                    paddingHorizontal: 12,
                  }}
                >
                  <View
                    style={{
                      padding: 12,
                      marginVertical: 6,
                      borderRadius: 4,
                      backgroundColor: "white",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#9FA0A7",
                        fontWeight: "bold",
                      }}
                    >
                      {localSender ? "You" : senderName}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        color: "black",
                      }}
                    >
                      {message}
                    </Text>
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 8,
                        alignSelf: "flex-end",
                        marginTop: 4,
                        fontStyle: "italic",
                      }}
                    >
                      {formatAMPM(new Date(timestamp))}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => `${index}_message_list`}
            style={{
              flex: 1,
              marginVertical: 5,
            }}
          />
          <View
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                height: 50,
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row", flex: 2 }}>
                <TextInput
                  multiline
                  value={message}
                  placeholder={"Write your Message"}
                  style={{ flex: 1, color: "black", marginLeft: 12 }}
                  numberOfLines={2}
                  onChangeText={setMessage}
                  selectionColor={"#1178F8"}
                  placeholderTextColor={"#9FA0A7"}
                />
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {message ? (
                  <TouchableOpacity
                    onPress={sendMessage}
                    style={{
                      backgroundColor: "#1178F8",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 12,
                      marginVertical: 4,
                      marginHorizontal: 4,
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Send
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ChatViewer;
