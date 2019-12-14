//
//  ScreenshotHelperModuleManager.swift
//  native_modules_demo
//
//  Created by Nacho 2 on 28/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(ScreenshotHelperModule)
class ScreenshotHelperModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc (takeScreenshot:y:successCallback:)
  func takeScreenshot(_ x: NSNumber, y: NSNumber, successCallback: RCTResponseSenderBlock) -> Void {
    DispatchQueue.main.async {
      let layer = UIApplication.shared.keyWindow!.layer
      let scale = UIScreen.main.scale
      let size = CGSize(width: 20, height: 30)

      // Creates UIImage of same size as view
      UIGraphicsBeginImageContextWithOptions(layer.frame.size, false, scale)
      layer.render(in: UIGraphicsGetCurrentContext()!)
      
      let screenshot = UIGraphicsGetImageFromCurrentImageContext()
      UIGraphicsEndImageContext()
      
      // THIS IS TO SAVE SCREENSHOT TO PHOTOS
      UIImageWriteToSavedPhotosAlbum(screenshot!, nil, nil, nil)
    }
    successCallback([true])
  }
}
