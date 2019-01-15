import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
// import Store from "./stores/";
import { observer, inject } from "mobx-react";
import { Button, Input } from "native-base";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
@inject("TestStore", "ScheduleRaceStore")
@observer
export default class RaceScreen extends Component<Props> {
  _onValueChange = name => value => {
    const { changeRace } = this.props.ScheduleRaceStore;
    changeRace(name, value);
  };
  render() {
    console.log("rerender");
    const { TestStore, ScheduleRaceStore } = this.props;
    return (
      <View>
        {/* <Text>{TScheduleRaceStore.newRace.name}</Text> */}
        <Button onPress={() => ScheduleRaceStore.changeRace("name", "sad")}>
          <Text>{ScheduleRaceStore.newRace.name}</Text>
        </Button>
        <Input
          placeholder="Race Name"
          value={ScheduleRaceStore.newRace.race_name}
          onChangeText={this._onValueChange("name")}
        />
      </View>
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
