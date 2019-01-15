## Commands for build android apk

1.

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

2.

```
cd android
```

3.

```
./gradlew clean
```

4.

```
./gradlew assembleRelease -x bundleReleaseJsAndAssets
```
