import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

export default class BottomButtons extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.groupNumber !== this.props.groupNumber) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={{ flexDirection: "row", height: 60 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.saveGroupBtn}
          onPress={this.props.stopTimer}
        >
          <Text style={styles.saveTitle}>STOP</Text>
        </TouchableOpacity>

        <View
          style={{ backgroundColor: "#fff", height: "100%", width: "0.5%" }}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.saveGroupBtn}
          onPress={() => this.props.saveGroupDetails()}
        >
          <Text style={styles.saveTitle}>SAVE GROUP {this.props.groupNumber}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveGroupBtn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    width: "49.75%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  saveTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center"
  }
});
