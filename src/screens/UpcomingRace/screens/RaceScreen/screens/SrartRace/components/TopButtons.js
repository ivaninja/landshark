import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "native-base";

export default class TopButtons extends Component {
  shouldComponentUpdate() {
    return false;
  }


  render() {
    return (
      <View style={styles.btnBlock}>
        <Button style={styles.Btn} onPress={this.props.StartRace}>
          <Text style={{ color: "#fff", fontSize: 24 }}>START</Text>
        </Button>

        <View
          style={{ backgroundColor: "#fff", width: "0.5%", height: "100%" }}
        />

        <Button style={styles.Btn} onPress={this.props.addLap}>
          <Text style={{ color: "#fff", fontSize: 24 }}>LAP</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "#a0a0a0",
    borderBottomWidth: 2
  },
  Btn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    width: "49.75%",
    flex: 0,
    borderRadius: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
