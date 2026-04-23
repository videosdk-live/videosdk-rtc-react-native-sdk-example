import { REACT_APP_VIDEOSDK_TOKEN, REACT_APP_AUTH_URL } from "@env";

const API_BASE_URL = "https://api.videosdk.live/v2";

const VIDEOSDK_TOKEN = REACT_APP_VIDEOSDK_TOKEN;
const API_AUTH_URL = REACT_APP_AUTH_URL;

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API",
    );
    return null;
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    try {
      const res = await fetch(`${API_AUTH_URL}/get-token`, { method: "GET" });
      if (!res.ok) {
        throw new Error(`getToken failed: ${res.status}`);
      }
      const { token } = await res.json();
      return token;
    } catch (error) {
      console.error("getToken error:", error);
      return null;
    }
  } else {
    console.error("Error: Please add a token or Auth Server URL");
    return null;
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/rooms`;

  const options = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`createMeeting failed: ${response.status}`);
    }

    const data = await response.json();
    return data.roomId;
  } catch (error) {
    console.error("createMeeting error:", error);
    return null;
  }
};

export const validateMeeting = async ({ meetingId, token }) => {
  const url = `${API_BASE_URL}/rooms/validate/${meetingId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`validateMeeting failed: ${response.status}`);
    }
    const result = await response.json();
    return result ? result.roomId === meetingId : false;
  } catch (error) {
    console.error("validateMeeting error:", error);
    return false;
  }
};
