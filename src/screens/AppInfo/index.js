import React, { Component } from "react";
import { Text, View, Linking } from "react-native";

export default class index extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "App Info",
    headerStyle: {
      backgroundColor: "rgba(184, 8, 17, 1)",
      height: 50,
      width: "100%"
    },
    headerTintColor: "#fff",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerTitleContainerStyle: {
      justifyContent: "center",
      textAlign: "center"
    },
    headerRight: <View />
  });

  _goToURL = url => () => {
    Linking.openURL(url);
  };

  render() {
    const { _goToURL } = this;
    const url = "http://totalcreations.com/";

    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          1.23 created for Landsharks running Club by{" "}
          <Text
            style={{ textDecorationLine: "underline", color: "#0054db" }}
            onPress={_goToURL(url)}
          >
            Totalcreations.com
          </Text>
        </Text>
      </View>
    );
  }
}
