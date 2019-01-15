import React, { Component, Fragment } from "react";
import { Text, View, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Icon, Input } from "native-base";
import { observer, inject } from "mobx-react";

@inject("RunnersStore")
@observer
export default class CustomHeaderForLookUpRunners extends Component {
  state = {
    inputValue: "",
    isSearchVisible: false
  };

  _showSearch = () => {
    this.setState({
      isSearchVisible: true
    });
  };

  _hideSearch = () => {
    this.setState({
      inputValue: "",
      isSearchVisible: false
    });
  };

  _onValueChange = name => value => {
    this.props.RunnersStore.searchQuery = value;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      props: { navigation },
      state: { isSearchVisible, inputValue },
      _hideSearch,
      _showSearch,
      _onValueChange
    } = this;

    return (
      <SafeAreaView style={styles.headerView}>
        {!isSearchVisible ? (
          <Fragment>
            <View>
              <Icon
                type="FontAwesome"
                name="bars"
                style={{ color: "#fff", marginLeft: 10 }}
                onPress={navigation.toggleDrawer}
              />
            </View>

            <View>
              <Text style={styles.title}> Lookup Runners </Text>
            </View>

            <View>
              <Icon
                type="FontAwesome"
                name="search"
                style={{ color: "#fff", marginRight: 10 }}
                onPress={_showSearch}
              />
            </View>
          </Fragment>
        ) : (
          <Fragment>
            <View>
              <Icon
                type="FontAwesome"
                name="arrow-left"
                style={{ color: "#fff", marginLeft: 10 }}
                onPress={_hideSearch}
              />
            </View>

            <Input
              autoFocus={true}
              underlineColorAndroid="#fff"
              placeholder="Search"
              placeholderTextColor="#e5e5e5"
              style={styles.input}
              selectionColor="#e5e5e5"
              value={inputValue}
              onChangeText={_onValueChange("inputValue")}
            />
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    height: Platform.OS === "android" ? 50 : 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  input: {
    color: "#fff",
    marginLeft: 20,
    marginRight: 20
  }
});
