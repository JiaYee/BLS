# cordova-plugin-browsertab

Note: This is not an official Google product.

## About

This plugin provides an interface to in-app browser tabs that exist on some
mobile platforms, specifically
[Custom Tabs](http://developer.android.com/tools/support-library/features.html#custom-tabs)
on Android (including the
[Chrome Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs)
implementation), and
[SFSafariViewController](https://developer.apple.com/library/ios/documentation/SafariServices/Reference/SFSafariViewController_Ref/)
on iOS.

## Usage

To open a URL in an in-app browser tab on a compatible platform:

    cordova.plugins.inappbrowsertab.openUrl('https://www.google.com');

This plugin is designed to complement cordova-plugin-inappbrowser. No fallback
is triggered automatically, you need to test whether it will succeed, and then
perform your own fallback logic like opening the link in the system browser
instead using cordova-plugin-inappbrowser.

    cordova.InAppBrowser.open('https://www.google.com/', '_system');

Complete example with fallback handling:

    var testURL = 'https://www.google.com';

    document.querySelector("#tabwithfallback").addEventListener('click', function(ev) {
    cordova.plugins.inappbrowsertab.isAvailable(function(result) {
        if (!result) {
          cordova.InAppBrowser.open(testURL, '_system');
        } else {
          cordova.plugins.inappbrowsertab.openUrl(
              testURL,
              function(successResp) {},
              function(failureResp) {
                error.textContent = "failed to launch browser tab";
                error.style.display = '';
              });
        }
      },
      function(isAvailableError) {
        error.textContent = "failed to query availability of in-app browser tab";
        error.style.display = '';
      });
    });

## Building

Install Cordova if you haven't already:

    npm install -g cordova

Then from the root directory:

    cd demo
    cordova platform add ios
    cordova run ios
    cordova platform add android
    cordova run android

