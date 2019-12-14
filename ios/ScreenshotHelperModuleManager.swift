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

      // Creates UIImage of same size as view
      UIGraphicsBeginImageContextWithOptions(layer.frame.size, true, scale)
      layer.render(in: UIGraphicsGetCurrentContext()!)

      let screenshot = UIGraphicsGetImageFromCurrentImageContext()
      UIGraphicsEndImageContext()
      
      // Crop Screenshot
      let horizontalField = x
      let verticalField = y
      let crop = CGRect(x: (250 * Int(truncating: verticalField)), y: 127 + (360 * Int(truncating: horizontalField)), width: 250, height: 360)
      let cgImage = screenshot?.cgImage?.cropping(to: crop)
      let croppedImage: UIImage = UIImage(cgImage: cgImage!)
      
      // THIS IS TO SAVE SCREENSHOT TO PHOTOS
      UIImageWriteToSavedPhotosAlbum(croppedImage, nil, nil, nil)
    }
    successCallback([true])
  }
}
