#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScreenshotHelperModule, NSObject)
RCT_EXTERN_METHOD(takeScreenshot: (RCTResponseSenderBlock *)successCallback)
@end
