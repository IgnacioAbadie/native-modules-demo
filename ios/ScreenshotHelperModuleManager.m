#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScreenshotHelperModule, NSObject)

RCT_EXTERN_METHOD(takeScreenshot:(nonnull NSNumber *)x y:(nonnull NSNumber *)y successCallback:(RCTResponseSenderBlock *)successCallback)

@end

