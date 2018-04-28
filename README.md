## Functionalities

This app uses [GitHub APIs](https://developer.github.com/v3/). Its functionalities include:

- log in
- view user info
- follow/unfollow user
- view repositories
- search user/repositories
- star/unstar repositories
- view users followed/following
- visualize repository stat

It is built with React-Native (create-react-native-app). Testing is done with [Appium](https://github.com/appium/appium), [wd](https://github.com/admc/wd), and [mocha](https://mochajs.org/).

## RUN
This is ejected from create-react-native-app, so to run on iOS go to `ios/` and use XCode to build and run.
No Android support because some iOS-only components are used. Meh

## TEST

A testing demo can be found [here](https://www.youtube.com/watch?v=nPnaNirib8U). Here's [episode 2](https://www.youtube.com/watch?v=RCYYVNnC8p4).

- For both simulator and real device tests, [appium-desktop](https://github.com/appium/appium-desktop) needs to be installed and the server needs to be running.
- `test/credentials.js` needs to exist and the values need to be filled. `test/credentials.example.js` is provided as an example.

### Testing on Simulator

1. Use XCode to open `ios/mobilegithub.xcodeproj`, run on the simulator to be tested. Here's where the magic happens: 
2. Use the Activity Monitor on Mac to find the process running with the name 'mobile-github'.
3. Double click on that activity, navigate to the 'Open Files and Ports' tab.
4. Find the directory of the *.ipa file in the list and copy that file to `test/`
5. In `test/test.js` change the `app` string to 'http://localhost:3000/mobilegithub.app'.
6. Go to XCode, Window -> Devices and Similators. In the opened pane select 'Simulators' and copy the identifier of the simulator to be tested.
7. Paste the identifier to `test/credentials.js` udid field and fill in the `deviceName`, which can also be found in XCode.
8. In terminal, with directory being this repo's root directory. `npm test`.

### Testing on Real Devices

1. Use XCode to open `ios/mobilegithub.xcodeproj`, switch the target to the real device connected to Mac, Product -> Scheme -> Edit Scheme. Change the scheme for Run to be release. Then run the app on device.
2. The above step is going to take a while. After it's done, go to the navigator of the file system to the left, expand Products, right click on `mobilegithub.app` and select 'Show in Finder'
3. Compress the `.app` file to `.zip` and copy the `.zip` file to `test/`
4. In `test/test.js` change the `app` string to 'http://localhost:3000/mobilegithub.zip'.
5. Go to XCode, Window -> Devices and Similators. In the opened pane select 'Devices' and copy the identifier of the device to be tested.
6. Paste the identifier to `test/credentials.js` udid field and fill in the `deviceName`, which can also be found in XCode.
7. In terminal, with directory being this repo's root directory. `npm test`.