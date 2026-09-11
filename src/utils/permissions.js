import { PermissionsAndroid, Platform } from "react-native";

// Camera and mic are required to preview and join a meeting.
const REQUIRED_PERMISSIONS = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
];

let pending = null;

/**
 * Requests camera, mic and (on Android 13+) notification permissions in a
 * single system dialog. Concurrent callers share one request. Resolves to
 * true when camera and mic are granted. Always true on iOS.
 *
 * POST_NOTIFICATIONS is a runtime permission only on Android 13+ (API 33).
 * Older versions reject it as "never_ask_again", so it is requested only
 * where supported and never blocks the meeting: the foreground service still
 * runs without it, only its notification is hidden.
 */
export const requestPermissions = async () => {
  if (Platform.OS !== "android") return true;
  if (pending) return pending;

  pending = (async () => {
    try {
      const permissions =
        Platform.Version >= 33
          ? [
              ...REQUIRED_PERMISSIONS,
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            ]
          : REQUIRED_PERMISSIONS;

      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const allGranted = REQUIRED_PERMISSIONS.every(
        (permission) =>
          granted[permission] === PermissionsAndroid.RESULTS.GRANTED
      );

      console.log(allGranted ? "permissions granted" : "permissions denied");
      return allGranted;
    } catch (err) {
      console.error("Error requesting permissions:", err);
      return false;
    } finally {
      pending = null;
    }
  })();

  return pending;
};

/**
 * Checks whether camera and mic are already granted, without showing any
 * dialog. Always true on iOS.
 */
export const hasRequiredPermissions = async () => {
  if (Platform.OS !== "android") return true;
  try {
    const results = await Promise.all(
      REQUIRED_PERMISSIONS.map((permission) =>
        PermissionsAndroid.check(permission)
      )
    );
    return results.every(Boolean);
  } catch (err) {
    console.error("Error checking permissions:", err);
    return false;
  }
};
