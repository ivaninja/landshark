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
  Icon
} from "native-base";
import Toast, { DURATION } from "react-native-easy-toast";
import backgroundImage from "../../../assets/img/login_background.jpg";
import sharkIcon from "../../../assets/AppIcon/sharkIcon.png";
import userIcon from "../../../assets/icons/edit_image_icon.png";
import passwordIcon from "../../../assets/icons/padlock_old.png";
import { inject } from "mobx-react";
import { validateEmail, validatePassword } from "../../validation";
import ViewOverflow from "react-native-view-overflow";
import Loading from "../../components/Loading";

@inject("AuthStore")
@observer
export default class LoginScreen extends Component {
  static navigationOptions = {
    title: "Log in",
    headerStyle: {
      backgroundColor: "rgba(122, 4, 7, 1)",
      height: 50,
      width: "100%"
    },
    headerTintColor: "#fff",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerTitleContainerStyle: { justifyContent: "center", textAlign: "center" }
  };

  state = {
    emailValue: "",
    passwordValue: "",
    validation: {
      email: {
        touched: false,
        errorDescription: "Required"
      },
      password: {
        touched: false,
        errorDescription: "Required"
      }
    }
  };

  _isEveryThisValid = () => {
    const { email, password } = this.state.validation;

    return (
      email.errorDescription === null && password.errorDescription === null
    );
  };

  _onValueChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  _validateEmail = value => {
    this.setState({
      validation: {
        ...this.state.validation,
        email: {
          touched: true,
          errorDescription: validateEmail(value)
        }
      }
    });
  };

  _validatePassword = value => {
    this.setState({
      validation: {
        ...this.state.validation,
        password: {
          touched: true,
          errorDescription: validatePassword(value)
        }
      }
    });
  };
  login = () => {
    const { login } = this.props.AuthStore;
    const { emailValue, passwordValue } = this.state;
    const { toast } = this.refs;
    login(emailValue, passwordValue, toast);
  };
  render() {
    const { navigate } = this.props.navigation;
    const { loading } = this.props.AuthStore;
    const { login } = this;
    const {
      state: {
        emailValue,
        passwordValue,
        validation: { email, password }
      },
      _onValueChange,
      _isEveryThisValid,
      _validateEmail,
      _validatePassword
    } = this;

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>

        {loading && <Loading />}
        <Content showsVerticalScrollIndicator={false} overScrollMode="never">
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.wrapperForSharkIcon}>
              <Image style={styles.sharkIconImg} source={sharkIcon} />
            </View>
          </View>

          <Item rounded style={styles.input}>
            <Image
              source={userIcon}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Input
              placeholder="Email"
              value={emailValue}
              onChangeText={value => {
                _onValueChange("emailValue")(value);
                _validateEmail(value);
              }}
            />

            {/**Error handling */}
            {email.touched &&
              (email.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {email.errorDescription}
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
              placeholder="Password"
              value={passwordValue}
              onChangeText={value => {
                _onValueChange("passwordValue")(value);
                _validatePassword(value);
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

          {_isEveryThisValid() ? (
            <Button style={styles.submitBtn} onPress={login}>
              <Text style={{ color: "#fff" }}>LOGIN</Text>
            </Button>
          ) : (
            <Button disabled style={styles.disabledBtn}>
              <Text style={{ color: "#fff" }}>LOGIN</Text>
            </Button>
          )}

          <View style={{ marginBottom: 30 }}>
            <Text
              style={{ color: "#fff", textAlign: "center" }}
              onPress={() => navigate("Registration")}
            >
              New User Register
            </Text>
          </View>

          {/* <View>
            <Text
              style={{ color: "#fff", textAlign: "center" }}
              onPress={() => navigate("RecoveryScreen")}
            >
              Recovery Password
            </Text>
          </View> */}
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
