import Foundation
import ReplayKit
import Photos
import UIKit

@objc(VideosdkRPK)
class VideosdkRPK: RCTEventEmitter {
  
  private var status = "Empty"
  
  
  var start_notificaion_callback: CFNotificationCallback = { center, observer, name, object, info in
    NotificationCenter.default.post(name: Notification.Name("START_BROADCAST"), object: nil)
  }
  
  
  var stop_notificaion_callback: CFNotificationCallback = { center, observer, name, object, info in
    NotificationCenter.default.post(name: Notification.Name("STOP_BROADCAST"), object: nil)
  }
  
  
  override init() {
    super.init()
    NotificationCenter.default.addObserver(self, selector: #selector(self.startBroadcastCallback(notification:)), name: Notification.Name("START_BROADCAST"), object: nil)
    
    
    NotificationCenter.default.addObserver(self, selector: #selector(self.stopBroadcastCallback(notification:)), name: Notification.Name("STOP_BROADCAST"), object: nil)
    
    let notificationStartIdentifier = "com.notification.start" as CFString
    let notificationCenter = CFNotificationCenterGetDarwinNotifyCenter()
    
    CFNotificationCenterAddObserver(notificationCenter,
                                    nil,
                                    start_notificaion_callback,
                                    notificationStartIdentifier,
                                    nil,
                                    CFNotificationSuspensionBehavior.deliverImmediately)
    
    
    let notificationStopIdentifier = "com.notification.stop" as CFString
    
    CFNotificationCenterAddObserver(notificationCenter,
                                    nil,
                                    stop_notificaion_callback,
                                    notificationStopIdentifier,
                                    nil,
                                    CFNotificationSuspensionBehavior.deliverImmediately)
    
    
  }
  
  @objc func startBroadcastCallback(notification: NSNotification){
    status = "START_BROADCAST"
    sendEvent(withName: "onScreenShare", body: status)
    status="STARTED_BROADCASTING"
  }
  
  
  @objc func stopBroadcastCallback(notification: NSNotification){
    status = "STOP_BROADCAST"
    sendEvent(withName: "onScreenShare", body: status)
    status = "Empty"
  }
  
  
  @objc
  func startBroadcast() {
    DispatchQueue.main.async { [self] in
      let pickerView = RPSystemBroadcastPickerView(
        frame: CGRect(x: 0, y: 0, width: 0, height: 0))
      var tap = pickerView.subviews.first as! UIButton
      pickerView.translatesAutoresizingMaskIntoConstraints = false
      pickerView.preferredExtension = "org.reactjs.native.example.RNCodeSample"
      tap.sendActions(for: .touchUpInside)
      
    }
  }
  
  override func supportedEvents() -> [String]! {
    return ["onScreenShare"]
  }
  override func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": status]
  }
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}

