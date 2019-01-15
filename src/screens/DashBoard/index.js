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
import {
  Container,
  Content,
  Text,
  Row,
  Col,
  Icon,
  H2,
  Grid
} from "native-base";
import scheduleIcon from "../../../assets/icons/schedule_race_white.png";
import runnerRaceIcon from "../../../assets/icons/lookup_runner_white.png";
import resultsIcon from "../../../assets/icons/results_white.png";
import settingIcon from "../../../assets/icons/setting_white.png";
import logoutIcon from "../../../assets/icons/logout_white.png";
import upcomingIcon from "../../../assets/icons/upcoming_race_white.png";

import HeaderOptions from "../../components/HeaderOptions";
import { inject } from "mobx-react";

@inject("AuthStore")
@observer
export default class DashBoard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Dashboard",
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
    const { logout, user } = this.props.AuthStore;
    const ifSmallDevice = Dimensions.get("window").width < 350;

    return (
      <Container style={styles.Container}>
        <Content showsVerticalScrollIndicator={false} overScrollMode="never">
          <H2 style={styles.Title}>{"Welcome " + user.name + ":"}</H2>
          <Grid>
            <Row style={styles.Row}>
              <Col style={{ paddingRight: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={() => navigate("Schedule Race")}
                >
                  <Image style={styles.Icon} source={scheduleIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Schedule Race
                  </Text>
                </TouchableOpacity>
              </Col>

              <Col style={{ paddingLeft: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={() => navigate("Upcoming Races")}
                >
                  <Image style={styles.Icon} source={runnerRaceIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Start a Race
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>

            <Row style={styles.Row}>
              <Col style={{ paddingRight: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={() => navigate("Results")}
                >
                  <Image style={styles.Icon} source={resultsIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Results
                  </Text>
                </TouchableOpacity>
              </Col>

              <Col style={{ paddingLeft: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={() => navigate("Upcoming Races")}
                >
                  <Image style={styles.Icon} source={upcomingIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Upcoming Races
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>

            <Row style={styles.Row}>
              <Col style={{ paddingRight: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={() => navigate("Lookup Runners")}
                >
                  <Image style={styles.Icon} source={runnerRaceIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Lookup Runners
                  </Text>
                </TouchableOpacity>
              </Col>

              <Col style={{ paddingLeft: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={() => navigate("Races in Progress")}
                >
                  <Image style={styles.Icon} source={upcomingIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Races in Progress
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>

            <Row style={styles.Row}>
              <Col style={{ paddingRight: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={() => navigate("Settings")}
                >
                  <Image style={styles.Icon} source={settingIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>
              </Col>

              <Col style={{ paddingLeft: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.CardNav}
                  onPress={logout}
                >
                  <Image style={styles.Icon} source={logoutIcon} />
                  <Text
                    style={{
                      fontSize: ifSmallDevice ? 14 : 16,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: { paddingHorizontal: 20 },
  Title: { color: "#727272", marginTop: 10, marginBottom: 10 },
  Row: {
    marginTop: 10,
    marginBottom: 10,
    height: 130
  },
  CardNav: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(184, 8, 17, 1)",
    justifyContent: "center",
    alignItems: "center"
  },
  Icon: {
    height: 70,
    width: 70,
    marginBottom: 10
  }
});
