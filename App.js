/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, YellowBox } from "react-native";
import RootStore from "./src/stores/";
import { observer, Provider } from "mobx-react/native";
import App from "./src";
import SplashScreen from "react-native-splash-screen";
import { Root } from "native-base";

YellowBox.ignoreWarnings(["debugger"]);

type Props = {};
export default class Main extends Component<Props> {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    // console.log(Store.tes);

    return (
      <Provider {...new RootStore()}>
        <Root>
          <App />
        </Root>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
