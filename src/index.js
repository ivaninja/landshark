import React, { Component, Fragment } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { observer } from "mobx-react/native";
import AuthRouter from "./routing/AuthRouter";
import MainRouter from "./routing/MainRouter";
import { inject } from "mobx-react";

type Props = {};
@inject("AuthStore")
@observer
export default class App extends Component<Props> {
  render() {
    const { auth } = this.props.AuthStore;

    return auth ? (
      <Fragment>
        <StatusBar
          backgroundColor="rgba(184, 8, 17, 0.9)"
          barStyle="light-content"
        />
        <MainRouter />
      </Fragment>
    ) : (
      <Fragment>
        <StatusBar
          backgroundColor="rgba(184, 8, 17, 0.9)"
          barStyle="light-content"
        />
        <AuthRouter />
      </Fragment>
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
