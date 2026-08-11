package com.myapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import live.videosdk.rnwebrtc.WebRTCModulePackage
import com.myapp.ForegroundServiceMediaPackage

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          add(WebRTCModulePackage())
          add(ForegroundServiceMediaPackage())
          // NativePubsubPackage is autolinked from
          // @videosdk.live/react-native-sdk (see its package.json → react-native
          // → android.packageInstance). No manual add() required.
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
