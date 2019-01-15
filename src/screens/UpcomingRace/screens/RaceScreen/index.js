import React, { Component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Grid, Row, Col, Text, Button, Container, Content } from "native-base";

import dateIcon from "../../../../../assets/icons/date.png";
import distanceIcon from "../../../../../assets/icons/meters.png";
import clockIcon from "../../../../../assets/icons/clock.png";
import locationIcon from "../../../../../assets/icons/location.png";
import genderIcon from "../../../../../assets/icons/gender.png";
import UtilsService from "../../../../services/UtilsService";
import ageIcon from "../../../../../assets/icons/edit_image_icon.png";


class RaceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.race.race_name,
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
  });

  render() {
    const {
      props: {
        navigation: {
          navigate,
          state: {
            params: { race, checkBoxes }
          }
        }
      }
    } = this;
    const ifSmallDevice = Dimensions.get("window").width < 350;

    return (
      <Container>
        <Content
          style={{ backgroundColor: "#dbdbdb" }}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          <Grid style={{ flexDirection: "column" }}>
            <Row style={styles.TitleBlock}>
              <Col size={65}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: ifSmallDevice ? 15 : 18,
                    marginLeft: 10
                  }}
                >
                  {race.location_name}
                </Text>
              </Col>
              <Col size={35}>
                <Button
                  style={{ ...styles.Btn, marginHorizontal: 5 }}
                  onPress={() => {
                    navigate("EditRace", { race, checkBoxes });
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: ifSmallDevice ? 12 : 16 }}
                  >
                    Edit
                  </Text>
                </Button>
              </Col>
            </Row>

            <Row style={{ paddingVertical: 5, alignItems: "center" }}>
              <Col stye={styles.center} size={40}>
                <View style={styles.wrapperForIcon}>
                  <Image style={styles.Icon} source={dateIcon} />
                  <Text style={styles.raceInfoItem}>Date</Text>
                </View>
              </Col>
              <Col stye={styles.center} size={60}>
                <Text style={styles.raceInfoItem}>{race.date}</Text>
              </Col>
            </Row>
            <Row>
              <Col stye={styles.center} size={40}>
                <View style={styles.wrapperForIcon}>
                  <Image style={styles.Icon} source={distanceIcon} />
                  <Text style={styles.raceInfoItem}>Distance</Text>
                </View>
              </Col>
              <Col stye={styles.center} size={60}>
                <Text style={styles.raceInfoItem}>{race.race_distance}</Text>
              </Col>
            </Row>
            <Row>
              <Col stye={styles.center} size={40}>
                <View style={styles.wrapperForIcon}>
                  <Image style={styles.Icon} source={clockIcon} />
                  <Text style={styles.raceInfoItem}>Time</Text>
                </View>
              </Col>
              <Col stye={styles.center} size={60}>
                <Text style={styles.raceInfoItem}>{race.time}</Text>
              </Col>
            </Row>
            <Row>
              <Col stye={styles.center} size={40}>
                <View style={styles.wrapperForIcon}>
                  <Image style={styles.Icon} source={locationIcon} />
                  <Text style={styles.raceInfoItem}>Location</Text>
                </View>
              </Col>
              <Col stye={styles.center} size={60}>
                <Text style={styles.raceInfoItem}>{race.location_name}</Text>
              </Col>
            </Row>
            <Row>
              <Col stye={styles.center} size={40}>
                <View style={styles.wrapperForIcon}>
                  <Image style={styles.Icon} source={genderIcon} />
                  <Text style={styles.raceInfoItem}>Gender</Text>
                </View>
              </Col>
              <Col stye={styles.center} size={60}>
                <Text style={styles.raceInfoItem}>
                  {UtilsService.getGenderByRaceType(race.race_type)}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col stye={styles.center} size={40}>
                <View style={styles.wrapperForIcon}>
                  <Image style={styles.Icon} source={ageIcon} />
                  <Text style={styles.raceInfoItem}>Age / Grade</Text>
                </View>
              </Col>
              <Col stye={styles.center} size={60}>
                <Text style={styles.raceInfoItem}>{race.age_group}</Text>
              </Col>
            </Row>

            <Row style={styles.BlackBtnBlock}>
              <Button
                style={styles.Btn}
                onPress={() => navigate("AssignBibs", { race })}
              >
                <Text
                  style={{ color: "#fff", fontSize: ifSmallDevice ? 12 : 16 }}
                >
                  ASSIGN BIBS
                </Text>
              </Button>

              <Button
                style={styles.Btn}
                onPress={() => navigate("Lookup Runners")}
              >
                <Text
                  style={{ color: "#fff", fontSize: ifSmallDevice ? 12 : 16 }}
                >
                  LOOKUP RUNNERS
                </Text>
              </Button>
            </Row>

            <Row style={styles.WhiteBtnBlock}>
              <Button
                style={{ ...styles.Btn, alignSelf: "flex-end" }}
                onPress={() => navigate("StartRace", { race })}
              >
                <Text
                  style={{ color: "#fff", fontSize: ifSmallDevice ? 12 : 16 }}
                >
                  START RACE GROUP
                </Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const ifSmallDevice = Dimensions.get("window").width < 350;
const styles = StyleSheet.create({
  Btn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
    marginVertical: 2
  },
  TitleBlock: {
    backgroundColor: "#000",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  Icon: {
    width: ifSmallDevice ? 18 : 28,
    height: ifSmallDevice ? 18 : 28,
    marginHorizontal: 10
  },
  raceInfoItem: {
    minHeight: 35,
    fontSize: ifSmallDevice ? 16 : 18
  },
  wrapperForIcon: {
    height: ifSmallDevice ? 25 : 35,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  BlackBtnBlock: {
    backgroundColor: "#000",
    height: 50,
    alignItems: "center",
    justifyContent: "space-around"
  },
  WhiteBtnBlock: {
    backgroundColor: "#fff",
    height: 65,
    justifyContent: "center"
  }
});

export default RaceScreen;
