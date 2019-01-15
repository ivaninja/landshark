import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon, ActionSheet } from "native-base";
import { inject } from "mobx-react";
import { observer } from "mobx-react/native";

@inject("AuthStore")
@observer
export default class HeaderOptions extends Component {
  state = {
    active: false,
    options: [
      { text: "Logout", func: this.props.AuthStore.logout },
      {
        text: "Cancel",
        func: () => {
          return;
        }
      }
    ]
  };

  render() {
    const {
      state: { options }
    } = this;

    return (
      <Fragment>
        <TouchableOpacity
          onPress={() => {
            ActionSheet.show(
              {
                options: options,
                title: "Menu",
                cancelButtonIndex: 1,
              },
              optionIndex => {
                if (Boolean(options[optionIndex])) {
                  options[optionIndex].func();
                }
              }
            );
          }}
        >
          <Icon
            type="FontAwesome"
            name="ellipsis-v"
            style={{ color: "#fff", marginRight: 10 }}
          />
        </TouchableOpacity>
      </Fragment>
    );
  }
}
