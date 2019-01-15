import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { TouchableOpacity, Alert } from "react-native";
import { Text } from "native-base";

@inject("StartRaceStore")
@observer
class HeaderRigth extends Component {
  _alert = () => {
    Alert.alert(
      "Are you sure want to reset?",
      "Every data will be removed!",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            return;
          }
        },
        {
          text: "Ok",
          onPress: () => {
            this.props.StartRaceStore.resetRace(
              this.props.race_id
            );
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._alert}>
        <Text style={{ color: "#fff", marginRight: 10 }}>Reset Race</Text>
      </TouchableOpacity>
    );
  }
}
export default HeaderRigth;
