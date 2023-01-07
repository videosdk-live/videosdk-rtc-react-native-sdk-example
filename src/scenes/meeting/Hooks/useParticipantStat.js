import { useParticipant } from "@videosdk.live/react-native-sdk";
import { useRef, useState, useEffect } from "react";

function useParticipantStat({ participantId }) {
  const {
    webcamStream,
    micStream,
    getVideoStats,
    getAudioStats,
    getShareStats,
    isPresenting,
    displayName,
  } = useParticipant(participantId);

  const statsIntervalIdRef = useRef();
  const [score, setScore] = useState({});
  const [audioStats, setAudioStats] = useState({});
  const [videoStats, setVideoStats] = useState({});

  function getQualityScore(stats) {
    const packetLossPercent = stats.packetsLost / stats.totalPackets || 0;
    const jitter = stats.jitter;
    const rtt = stats.rtt;
    let score = 100;
    score -= packetLossPercent * 50 > 50 ? 50 : packetLossPercent * 50;
    score -= ((jitter / 30) * 25 > 25 ? 25 : (jitter / 30) * 25) || 0;
    score -= ((rtt / 300) * 25 > 25 ? 25 : (rtt / 300) * 25) || 0;
    return score / 10;
  }

  const updateStats = async () => {
    let stats = [];
    let audioStats = [];
    let videoStats = [];
    if (isPresenting) {
      stats = await getShareStats();
    } else if (webcamStream) {
      stats = await getVideoStats();
    } else if (micStream) {
      stats = await getAudioStats();
    }

    if (webcamStream || micStream || isPresenting) {
      videoStats = isPresenting ? await getShareStats() : await getVideoStats();
      audioStats = isPresenting ? [] : await getAudioStats();
    }

    let score = stats
      ? stats.length > 0
        ? getQualityScore(stats[0])
        : 100
      : 100;

    setScore(score);
    setAudioStats(audioStats);
    setVideoStats(videoStats);
  };

  useEffect(() => {
    if (webcamStream || micStream) {
      updateStats();

      if (statsIntervalIdRef.current) {
        clearInterval(statsIntervalIdRef.current);
      }

      statsIntervalIdRef.current = setInterval(updateStats, 500);
    } else {
      if (statsIntervalIdRef.current) {
        clearInterval(statsIntervalIdRef.current);
        statsIntervalIdRef.current = null;
      }
    }

    return () => {
      if (statsIntervalIdRef.current) clearInterval(statsIntervalIdRef.current);
    };
  }, [webcamStream, micStream]);

  return {
    score,
    audioStats,
    videoStats,
    displayName,
  };
}

export default useParticipantStat;
