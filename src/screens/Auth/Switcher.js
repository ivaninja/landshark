import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { observer } from "mobx-react/native";
import { Container, Content, Text, Button } from "native-base";
import backgroundImage from "../../../assets/img/login_background.jpg";
import { inject } from "mobx-react";

@inject("AuthStore")
@observer
export default class Switcher extends Component {
  static navigationOptions = {
    title: "Sign up",
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

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>

        <Content
          style={{ height: "100%" }}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          <Button
            style={styles.btnStyle}
            onPress={() => {
              navigate("SetUserData");
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              EDIT PROFILE
            </Text>
          </Button>

          <Button
            style={styles.btnStyle}
            onPress={() => this.props.AuthStore.skipRegistration()}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>SKIP</Text>
          </Button>
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
  btnStyle: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
    width: "80%",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  }
});
