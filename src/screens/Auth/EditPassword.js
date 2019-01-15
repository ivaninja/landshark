import React, { Component, Fragment } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { observer } from "mobx-react/native";
import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  H1,
  Icon
} from "native-base";
import backgroundImage from "../../../assets/img/login_background.jpg";
import sharkIcon from "../../../assets/AppIcon/sharkIcon.png";
import passwordIcon from "../../../assets/icons/padlock_old.png";
import { inject } from "mobx-react";
import { validateConfirmPassword, validatePassword } from "../../validation";
import ViewOverflow from "react-native-view-overflow";

@inject("RunnersStore")
@observer
export default class EditPasswordScreen extends Component {
  static navigationOptions = {
    title: "Set New Password",
    headerStyle: {
      backgroundColor: "rgba(122, 4, 7, 1)",
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
    passwordValue: "",
    confirmPasswordValue: "",
    validation: {
      password: {
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
    const { confirmPassword, password } = this.state.validation;

    return (
      confirmPassword.errorDescription === null &&
      password.errorDescription === null
    );
  };

  _onValueChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  _validatePasswordWithConfirm = (value) => {
    const {
      confirmPasswordValue,
      validation: { confirmPassword }
    } = this.state;

    this.setState({
      validation: {
        ...this.state.validation,
        password: {
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
    const { passwordValue } = this.state;

    this.setState({
      validation: {
        ...this.state.validation,
        confirmPassword: {
          touched: true,
          errorDescription: validateConfirmPassword(
            passwordValue,
            passwordToConfirm
          )
        }
      }
    });
  };

  render() {
    const { login } = this.props.RunnersStore;
    const {
      state: {
        confirmPasswordValue,
        passwordValue,
        validation: { confirmPassword, password }
      },
      _onValueChange,
      _isEveryThisValid,
      _validateConfirmPassword,
      _validatePasswordWithConfirm
    } = this;

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>

        <Content showsVerticalScrollIndicator={false} overScrollMode="never">
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.wrapperForSharkIcon}>
              <Image style={styles.sharkIconImg} source={sharkIcon} />
            </View>
          </View>

          <H1 style={{ color: "#fff", textAlign: "center", marginBottom: 20 }}>
            Set Password
          </H1>

          <Item rounded style={styles.input}>
            <Image
              source={passwordIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              secureTextEntry={true}
              placeholder="Enter New Password"
              value={passwordValue}
              onChangeText={value => {
                _onValueChange("passwordValue")(value);
                _validatePasswordWithConfirm(value);
              }}
            />

            {/**Error handling */}
            {password.touched &&
              (password.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {password.errorDescription}
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
            <Button style={styles.submitBtn} onPress={login}>
              <Text style={{ color: "#fff" }}>SAVE CHANGES</Text>
            </Button>
          ) : (
            <Button style={styles.disabledBtn} disabled>
              <Text style={{ color: "#fff" }}>SAVE CHANGES</Text>
            </Button>
          )}
        </Content>
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
  wrapperForSharkIcon: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30
  },
  sharkIconImg: {
    width: 60,
    height: 60
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 20
  },
  submitBtn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 15
  },
  disabledBtn: {
    backgroundColor: "rgba(91, 91, 91, 1)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 15
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
