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
  @objc (takeScreenshot:)
  func takeScreenshot(_ successCallback: RCTResponseSenderBlock) -> Void {
    
    successCallback([true])
  }
}
