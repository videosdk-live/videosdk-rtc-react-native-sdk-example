import React from "react";
import { View, Text } from "react-native";
import colors from "../../../../styles/colors";
import { ROBOTO_FONTS } from "../../../../styles/fonts";
import useParticipantStat from "../../Hooks/useParticipantStat";

function ParticipantStatsViewer({ participantId }) {
  const { audioStats, videoStats, displayName, score } = useParticipantStat({
    participantId,
  });

  const qualityStateArray = [
    { label: "", audio: "Audio", video: "Video" },
    {
      label: "Latency",
      audio:
        audioStats && audioStats[0]?.rtt ? `${audioStats[0]?.rtt} ms` : "-",
      video:
        videoStats && videoStats[0]?.rtt ? `${videoStats[0]?.rtt} ms` : "-",
    },
    {
      label: "Jitter",
      audio:
        audioStats && audioStats[0]?.jitter
          ? `${parseFloat(audioStats[0]?.jitter).toFixed(2)} ms`
          : "-",
      video:
        videoStats && videoStats[0]?.jitter
          ? `${parseFloat(videoStats[0]?.jitter).toFixed(2)} ms`
          : "-",
    },
    {
      label: "Packet Loss",
      audio: audioStats
        ? audioStats[0]?.packetsLost
          ? `${parseFloat(
              (audioStats[0]?.packetsLost * 100) / audioStats[0]?.totalPackets
            ).toFixed(2)}%`
          : "-"
        : "-",
      video: videoStats
        ? videoStats[0]?.packetsLost
          ? `${parseFloat(
              (videoStats[0]?.packetsLost * 100) / videoStats[0]?.totalPackets
            ).toFixed(2)}%`
          : "-"
        : "-",
    },
    {
      label: "Bitrate",
      audio:
        audioStats && audioStats[0]?.bitrate
          ? `${parseFloat(audioStats[0]?.bitrate).toFixed(2)} kb/s`
          : "-",
      video:
        videoStats && videoStats[0]?.bitrate
          ? `${parseFloat(videoStats[0]?.bitrate).toFixed(2)} kb/s`
          : "-",
    },
    {
      label: "Frame rate",
      audio: "-",
      video:
        videoStats &&
        (videoStats[0]?.size?.framerate === null ||
          videoStats[0]?.size?.framerate === undefined)
          ? "-"
          : `${videoStats ? videoStats[0]?.size?.framerate : "-"}`,
    },
    {
      label: "Resolution",
      audio: "-",
      video: videoStats
        ? videoStats && videoStats[0]?.size?.width === null
          ? "-"
          : `${videoStats[0]?.size?.width}x${videoStats[0]?.size?.height}`
        : "-",
    },
    {
      label: "Codec",
      audio: audioStats && audioStats[0]?.codec ? audioStats[0]?.codec : "-",
      video: videoStats && videoStats[0]?.codec ? videoStats[0]?.codec : "-",
    },
  ];

  const Item = ({ val }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.primary[100], fontSize: 16 }}>{val}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2B3034",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginVertical: 8,
          borderWidth: 0.5,
          height: 50,
          alignItems: "center",
          backgroundColor:
            score > 7 ? "#3BA55D" : score > 4 ? "#faa713" : "#FF5D5D",
        }}
      >
        <Text
          style={{
            fontFamily: ROBOTO_FONTS.RobotoBold,
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          {displayName} - Quality Metrics :{" "}
          {score > 7 ? "Good" : score > 4 ? "Average" : "Poor"}
        </Text>
      </View>
      {qualityStateArray.map(({ label, audio, video }) => {
        return (
          <View
            style={{
              paddingHorizontal: 12,
              flexDirection: "row",
              padding: 4,
              borderWidth: 0.5,
              height: 40,
              borderColor: colors.primary[700],
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ color: colors.primary[100], fontSize: 16 }}>
                {label}
              </Text>
            </View>
            <Item val={audio} />
            <Item val={video} />
          </View>
        );
      })}
    </View>
  );
}

export default ParticipantStatsViewer;
