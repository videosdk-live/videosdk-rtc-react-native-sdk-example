import { NativeModules, NativeEventEmitter,Platform } from "react-native";

class VideosdkRPK extends NativeEventEmitter {
  constructor(nativeModule) {
    super(nativeModule);
    this.startBroadcast = Platform.OS === "ios" ? nativeModule.startBroadcast : null
  }
}

export default new VideosdkRPK(NativeModules.VideosdkRPK);
