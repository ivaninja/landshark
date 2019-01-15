import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Store from "../../stores";
import { observer } from "mobx-react/native";
import { Container, Content, Text, Row, Icon, Grid } from "native-base";
import userIcon from "../../../assets/icons/edit_image_icon.png";
import passwordIcon from "../../../assets/icons/padlock_old.png";
import appInfoIcon from "../../../assets/icons/app_info.png"

import HeaderOptions from "../../components/HeaderOptions";

@observer
export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
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
    headerRight: <HeaderOptions />,
    headerLeft: (
      <Icon
        type="FontAwesome"
        name="bars"
        style={{ color: "#fff", marginLeft: 10 }}
        onPress={navigation.toggleDrawer}
      />
    )
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content
          style={{ backgroundColor: "#dbdbdb" }}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          <Grid>
            <Row style={styles.Row}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.wrapperForOption}
                onPress={() => navigate("EditProfile")}
              >
                <Image style={styles.Icon} source={userIcon} />
                <Text style={styles.Title}>Edit Profile</Text>
              </TouchableOpacity>
            </Row>

            <Row style={{ width: "100%", height: 2 }}>
              <View style={{ width: "100%", backgroundColor: "#828282" }} />
            </Row>

            <Row style={styles.Row}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.wrapperForOption}
                onPress={() => navigate("ChangePassword")}
              >
                <Image style={styles.Icon} source={passwordIcon} />
                <Text style={styles.Title}>Change Password</Text>
              </TouchableOpacity>
            </Row>

            <Row style={{ width: "100%", height: 2 }}>
              <View style={{ width: "100%", backgroundColor: "#828282" }} />
            </Row>

            <Row style={styles.Row}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.wrapperForOption}
                onPress={() => navigate("AppInfo")}
              >
                <Image style={styles.Icon} source={appInfoIcon} />
                <Text style={styles.Title}>App Info</Text>
              </TouchableOpacity>
            </Row>

            <Row style={{ width: "100%", height: 2 }}>
              <View style={{ width: "100%", backgroundColor: "#828282" }} />
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Row: {
    height: 80
  },
  Icon: {
    height: 35,
    width: 35,
    marginHorizontal: 10
  },
  wrapperForOption: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center"
  },
  Title: {
    color: "#767474",
    fontSize: 18,
    fontWeight: "bold"
  }
});
