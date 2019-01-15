import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
// import Store from "./stores/";
import { observer } from "mobx-react/native";
import { Container, Content, Text, Button, Item, Input } from "native-base";
import backgroundImage from "../../../assets/img/login_background.jpg";
import userIcon from "../../../assets/icons/edit_image_icon.png";
import passwordIcon from "../../../assets/icons/padlock_old.png";
import addressIcon from "../../../assets/icons/address.png";
import locationIcon from "../../../assets/icons/location.png";
import homeIcon from "../../../assets/icons/home.png";
import zipIcon from "../../../assets/icons/zip.png";
import mobileIcon from "../../../assets/icons/mobile.png";
import emailIcon from "../../../assets/icons/email.png";
import defaultAvatar from "../../../assets/img/eagle.jpg";
import { inject } from "mobx-react";
import Toast, { DURATION } from "react-native-easy-toast";

@inject("AuthStore")
@observer
export default class EditProfileScreen extends Component {
  static navigationOptions = {
    title: "Edit Profile",
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
  };
  updateProfile = () => {
    const { toast } = this.refs;
    this.props.AuthStore.updateProfile(toast);
  };
  render() {
    const { user, changeForm, updateProfile } = this.props.AuthStore;
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>

        <Content showsVerticalScrollIndicator={false} overScrollMode="never">
          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Image
              style={{
                width: 130,
                height: 130,
                borderRadius: 70,
                borderWidth: 2,
                borderColor: "#fff"
              }}
              source={defaultAvatar}
            />
          </View>

          <Item rounded style={styles.input}>
            <Image
              source={userIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={user.name}
              placeholder="User Name"
              onChangeText={value => {
                changeForm("name", value);
              }}
            />
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={emailIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={user.email}
              placeholder="Email"
              onChangeText={value => {
                changeForm("email", value);
              }}
            />
          </Item>

          {/* <Item rounded style={styles.input}>
            <Image
              source={passwordIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input secureTextEntry={true} placeholder="Password" />
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={addressIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input placeholder="Address" />
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={addressIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input placeholder="Address" />
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={locationIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input placeholder="Location" />
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={homeIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input placeholder="Home" />
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={zipIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input placeholder="Post Code" />
          </Item> */}

          <Item rounded style={styles.input}>
            <Image
              source={mobileIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={user.phone}
              placeholder="Phone Number"
              onChangeText={value => {
                changeForm("phone", value);
              }}
            />
          </Item>

          <Button style={styles.btnStyle} onPress={this.updateProfile}>
            <Text style={{ color: "#fff", textAlign: "center" }}>
              SAVE CHANGES
            </Text>
          </Button>
        </Content>
        <Toast ref="toast" />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: { paddingHorizontal: 20 },
  ViewForBackImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  backImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 10
  },
  btnStyle: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
    width: "45%",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  }
});
