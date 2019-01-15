import React, { Component, Fragment } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
// import Store from "./stores/";
import { observer } from "mobx-react/native";
import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  Icon
} from "native-base";
import backgroundImage from "../../../assets/img/login_background.jpg";
import userIcon from "../../../assets/icons/edit_image_icon.png";
import passwordIcon from "../../../assets/icons/padlock_old.png";
import addressIcon from "../../../assets/icons/address.png";
import locationIcon from "../../../assets/icons/location.png";
import homeIcon from "../../../assets/icons/home.png";
import zipIcon from "../../../assets/icons/zip.png";
import mobileIcon from "../../../assets/icons/mobile.png";
import emailIcon from "../../../assets/icons/email.png";
import { inject } from "mobx-react";
import Toast, { DURATION } from "react-native-easy-toast";
import ViewOverflow from "react-native-view-overflow";
import { required, validateEmail, validatePassword } from "../../validation";

@inject("AuthStore")
@observer
export default class SetUserDataScreen extends Component {
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

  state = {
    name: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    location: "",
    state: "",
    zip: "",
    phone: "",
    validation: {
      name: {
        touched: false,
        errorDescription: "Required"
      },
      email: {
        touched: false,
        errorDescription: "Required"
      },
      password: {
        touched: false,
        errorDescription: "Required"
      },
      address1: {
        touched: false,
        errorDescription: "Required"
      },
      address2: {
        touched: false,
        errorDescription: "Required"
      },
      location: {
        touched: false,
        errorDescription: "Required"
      },
      state: {
        touched: false,
        errorDescription: "Required"
      },
      zip: {
        touched: false,
        errorDescription: "Required"
      },
      phone: {
        touched: false,
        errorDescription: "Required"
      }
    }
  };

  _isEveryThingValid = () => {
    const {
      name,
      email,
      password,
      address1,
      address2,
      location,
      state,
      zip,
      phone
    } = this.state;

    const arrayOfInputsForValidation = [
      { name: "name", value: name, func: required },
      { name: "email", value: email, func: validateEmail },
      { name: "password", value: password, func: validatePassword },
      { name: "address1", value: address1, func: required },
      { name: "address2", value: address2, func: required },
      { name: "location", value: location, func: required },
      { name: "state", value: state, func: required },
      { name: "zip", value: zip, func: required },
      { name: "phone", value: phone, func: required }
    ];

    const newValidation = {};

    arrayOfInputsForValidation.forEach(input => {
      newValidation[input.name] = {
        touched: true,
        errorDescription: input.func(input.value)
      };
    });

    let isEveryThingValid = true;

    Object.values(newValidation).forEach(validationBlock => {
      if (validationBlock.errorDescription) {
        isEveryThingValid = false;
      }
    });

    if (isEveryThingValid) {
      console.log(newValidation);
      const params = {
        name,
        email,
        password,
        address1,
        address2,
        location,
        state,
        zip,
        phone
      };

      const { navigate } = this.props.navigation;

      this.props.AuthStore.ProfUpdate(navigate, params);

      this.setState({
        validation: newValidation,
        name: "",
        email: "",
        password: "",
        address1: "",
        address2: "",
        location: "",
        state: "",
        zip: "",
        phone: ""
      });
    }

    this.setState({
      validation: newValidation
    });
  };

  changeForm = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  render() {
    const {
      name,
      email,
      password,
      address1,
      address2,
      location,
      state,
      zip,
      phone,
      validation
    } = this.state;
    const { changeForm } = this;

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>

        <Content showsVerticalScrollIndicator={false} overScrollMode="never">
          <Item rounded style={{ ...styles.input, marginTop: 15 }}>
            <Image
              source={userIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={name}
              placeholder="User Name"
              onChangeText={value => {
                changeForm("name", value);
              }}
            />

            {/**Error handling */}
            {validation.name.touched &&
              (validation.name.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.name.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={emailIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={email}
              placeholder="Email"
              onChangeText={value => {
                changeForm("email", value);
              }}
            />

            {/**Error handling */}
            {validation.email.touched &&
              (validation.email.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.email.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={passwordIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={value => {
                changeForm("password", value);
              }}
            />

            {/**Error handling */}
            {validation.password.touched &&
              (validation.password.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.password.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={addressIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={address1}
              placeholder="Address"
              onChangeText={value => {
                changeForm("address1", value);
              }}
            />

            {/**Error handling */}
            {validation.address1.touched &&
              (validation.address1.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.address1.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={addressIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={address2}
              placeholder="Address"
              onChangeText={value => {
                changeForm("address2", value);
              }}
            />

            {/**Error handling */}
            {validation.address2.touched &&
              (validation.address2.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.address2.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={locationIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={location}
              placeholder="Location"
              onChangeText={value => {
                changeForm("location", value);
              }}
            />

            {/**Error handling */}
            {validation.location.touched &&
              (validation.location.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.location.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={homeIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={state}
              placeholder="Home"
              onChangeText={value => {
                changeForm("state", value);
              }}
            />

            {/**Error handling */}
            {validation.state.touched &&
              (validation.state.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.state.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={zipIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={zip}
              placeholder="Post Code"
              onChangeText={value => {
                changeForm("zip", value);
              }}
            />

            {/**Error handling */}
            {validation.zip.touched &&
              (validation.zip.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.zip.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Image
              source={mobileIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              value={phone}
              placeholder="Phone Number"
              onChangeText={value => {
                changeForm("phone", value);
              }}
            />

            {/**Error handling */}
            {validation.phone.touched &&
              (validation.phone.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.phone.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Button style={styles.btnStyle} onPress={this._isEveryThingValid}>
            <Text style={{ color: "#fff", textAlign: "center" }}>SAVE</Text>
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
    marginBottom: 15
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
  },
  warningIcon: {
    color: "#E80000",
    fontSize: 30
  },
  errorBlock: {
    position: "absolute",
    right: 0,
    top: 37,
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 30,
    zIndex: 9999,
    overflow: "visible"
  },
  errorRedLine: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 0, 0, 0.8)"
  }
});
