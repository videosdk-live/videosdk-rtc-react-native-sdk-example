import {
  NativeModules,
  NativeEventEmitter
} from "react-native";

class VideosdkRPK extends NativeEventEmitter {
  constructor(nativeModule) {
    super(nativeModule);

    this.startBroadcast = nativeModule.startBroadcast

  }
}


export default new VideosdkRPK(NativeModules.VideosdkRPK)
