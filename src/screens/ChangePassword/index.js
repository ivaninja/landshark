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
import passwordIcon from "../../../assets/icons/padlock_old.png";
import { validatePassword, validateConfirmPassword } from "../../validation";
import ViewOverflow from "react-native-view-overflow";
import { inject } from "mobx-react";
import Toast, { DURATION } from "react-native-easy-toast";

@inject("AuthStore")
@observer
export default class ChangePasswordScreen extends Component {
  static navigationOptions = {
    title: "Change Password",
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
    currentPasswordValue: "",
    newPasswordValue: "",
    confirmPasswordValue: "",
    validation: {
      currentPassword: {
        touched: false,
        errorDescription: "Required"
      },
      newPassword: {
        touched: false,
        errorDescription: "Required"
      },
      confirmPassword: {
        touched: false,
        errorDescription: "Required"
      }
    }
  };

  _isEveryThisValid = () => {
    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = this.state.validation;

    return (
      currentPassword.errorDescription === null &&
      newPassword.errorDescription === null &&
      confirmPassword.errorDescription === null
    );
  };

  _onValueChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  _validatePassword = value => {
    this.setState({
      validation: {
        ...this.state.validation,
        currentPassword: {
          touched: true,
          errorDescription: validatePassword(value)
        }
      }
    });
  };

  _validatePasswordWithConfirm = value => {
    const {
      confirmPasswordValue,
      validation: { confirmPassword }
    } = this.state;

    this.setState({
      validation: {
        ...this.state.validation,
        newPassword: {
          touched: true,
          errorDescription: validatePassword(value)
        },
        confirmPassword: {
          ...this.state.validation.confirmPassword,
          errorDescription: validateConfirmPassword(value, confirmPasswordValue)
        }
      }
    });
  };

  _validateConfirmPassword = passwordToConfirm => {
    const { newPasswordValue } = this.state;

    this.setState({
      validation: {
        ...this.state.validation,
        confirmPassword: {
          touched: true,
          errorDescription: validateConfirmPassword(
            newPasswordValue,
            passwordToConfirm
          )
        }
      }
    });
  };
  changePassword = () => {
    const {
      currentPasswordValue,
      newPasswordValue,
      confirmPasswordValue
    } = this.state;
    const { toast } = this.refs;
    this.props.AuthStore.changePassword({
      currentPasswordValue,
      newPasswordValue,
      confirmPasswordValue,
      toast
    });
  };
  render() {
    const { navigate } = this.props.navigation;
    const {
      state: {
        currentPasswordValue,
        newPasswordValue,
        confirmPasswordValue,
        validation: { currentPassword, newPassword, confirmPassword }
      },
      _onValueChange,
      _isEveryThisValid,
      _validateConfirmPassword,
      _validatePassword,
      _validatePasswordWithConfirm
    } = this;

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>

        <Content showsVerticalScrollIndicator={false} overScrollMode="never">
          <Item rounded style={{ ...styles.input, marginTop: 20 }}>
            <Image
              source={passwordIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              secureTextEntry={true}
              placeholder="Current Password"
              value={currentPasswordValue}
              onChangeText={value => {
                _onValueChange("currentPasswordValue")(value);
                _validatePassword(value);
              }}
            />

            {/**Error handling */}
            {currentPassword.touched &&
              (currentPassword.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {currentPassword.errorDescription}
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
              secureTextEntry={true}
              placeholder="New Password"
              value={newPasswordValue}
              onChangeText={value => {
                _onValueChange("newPasswordValue")(value);
                _validatePasswordWithConfirm(value);
              }}
            />

            {/**Error handling */}
            {newPassword.touched &&
              (newPassword.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {newPassword.errorDescription}
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
              secureTextEntry={true}
              placeholder="Confirm Password"
              value={confirmPasswordValue}
              onChangeText={value => {
                _onValueChange("confirmPasswordValue")(value);
                _validateConfirmPassword(value);
              }}
            />

            {/**Error handling */}
            {confirmPassword.touched &&
              (confirmPassword.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {confirmPassword.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          {_isEveryThisValid() ? (
            <Button style={styles.btnStyle} onPress={this.changePassword}>
              <Text style={{ color: "#fff", textAlign: "center" }}>UPDATE</Text>
            </Button>
          ) : (
            <Button disabled style={styles.disabledBtn}>
              <Text style={{ color: "#fff", textAlign: "center" }}>UPDATE</Text>
            </Button>
          )}
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
    marginBottom: 20
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
  disabledBtn: {
    backgroundColor: "rgba(91, 91, 91, 1)",
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
