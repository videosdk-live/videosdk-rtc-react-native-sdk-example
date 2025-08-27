package com.myapp

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class ForegroundServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "ForegroundServiceModule"
        private const val TAG = "ForegroundServiceModule"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun startService(promise: Promise) {
        try {
            Log.d(TAG, "Starting foreground service from React Native")
            
            val intent = Intent(reactApplicationContext, MyForegroundService::class.java).apply {
                action = MyForegroundService.ACTION_START
            }
            
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                reactApplicationContext.startForegroundService(intent)
            } else {
                reactApplicationContext.startService(intent)
            }
            
            promise.resolve(true)
            Log.d(TAG, "Foreground service start intent sent")
        } catch (e: Exception) {
            Log.e(TAG, "Error starting foreground service", e)
            promise.reject("SERVICE_ERROR", "Failed to start foreground service", e)
        }
    }

    @ReactMethod
    fun stopService(promise: Promise) {
        try {
            Log.d(TAG, "Stopping foreground service from React Native")
            
            val intent = Intent(reactApplicationContext, MyForegroundService::class.java).apply {
                action = MyForegroundService.ACTION_STOP
            }
            
            reactApplicationContext.stopService(intent)
            promise.resolve(true)
            Log.d(TAG, "Foreground service stop intent sent")
        } catch (e: Exception) {
            Log.e(TAG, "Error stopping foreground service", e)
            promise.reject("SERVICE_ERROR", "Failed to stop foreground service", e)
        }
    }

    @ReactMethod
    fun isServiceRunning(promise: Promise) {
        try {
            // Check if the service is running by checking if there's an active notification
            val notificationManager = reactApplicationContext.getSystemService(android.app.NotificationManager::class.java)
            val activeNotifications = notificationManager?.activeNotifications
            
            val isRunning = activeNotifications?.any { it.id == MyForegroundService.NOTIFICATION_ID } ?: false
            
            Log.d(TAG, "Service running status: $isRunning")
            promise.resolve(isRunning)
        } catch (e: Exception) {
            Log.e(TAG, "Error checking service status", e)
            promise.reject("SERVICE_ERROR", "Failed to check service status", e)
        }
    }
}