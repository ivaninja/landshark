import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { DrawerItems } from "react-navigation";
import logoutIcon from "../../assets/icons/logout_white.png";
import defaultAvatar from "../../assets/img/eagle.jpg";
import { inject } from "mobx-react";
import { observer } from "mobx-react/native";

@inject("AuthStore")
@observer
export default class CustomDrawer extends Component {
  render() {
    const { logout, user } = this.props.AuthStore;
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{
            backgroundColor: "rgba(184, 8, 17, 1)"
          }}
        >
          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#fff"
              }}
              source={{ uri: user.profile_pic }}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
              {user.name}
            </Text>
          </View>

          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <View
              style={{ width: "90%", height: 2, backgroundColor: "#fff" }}
            />
          </View>

          <DrawerItems
            {...this.props}
            labelStyle={{ color: "#fff", marginHorizontal: 20 }}
            activeLabelStyle={{ color: "#fff" }}
            activeBackgroundColor="transparent"
            iconContainerStyle={{
              opacity: 1
            }}
          />

          <TouchableOpacity
            activeOpacity={1}
            style={{ flexDirection: "row", alignItems: "flex-end" }}
            onPress={logout}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                marginLeft: 15
              }}
              source={logoutIcon}
            />
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                marginHorizontal: 37
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
