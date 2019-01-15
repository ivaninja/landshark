import React, { Component, Fragment } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Grid, Row, Col, Text, Button } from "native-base";
import { withNavigation } from "react-navigation";

import dateIcon from "../../../../assets/icons/date.png";
import distanceIcon from "../../../../assets/icons/meters.png";
import clockIcon from "../../../../assets/icons/clock.png";
import locationIcon from "../../../../assets/icons/location.png";
import genderIcon from "../../../../assets/icons/gender.png";
import ageIcon from "../../../../assets/icons/edit_image_icon.png";
import UtilsService from "../../../services/UtilsService";

class Races extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.races.length !== this.props.races.length ||
      nextProps.dataWasChanged
    ) {
      return true;
    }

    return false;
  }

  _renderRacesRows = races => {
    const { navigate } = this.props.navigation;
    /**
     * 
added_by: 96
age_group: "2-6th "
created_on: "2018-09-24 19:22:02"
date: "2018-09-24"
default_group: 1
id: 747
location_name: "Church for All Nations"
participants: 0
race_distance: 1
race_location: "80"
race_name: "2-6th Mile (boys Subtract 1 Minuet) "
race_type: 3
runner_det: []
runners: null
status: 0
time: "17:55"
     */
    const ifSmallDevice = Dimensions.get("window").width < 350;

    return races.map((race, i) => (
      <Fragment key={i}>
        <Row style={styles.TitleBlock}>
          <Col size={65}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: ifSmallDevice ? 16 : 18,
                marginLeft: 10
              }}
            >
              {race.race_name}
            </Text>
          </Col>

          <Col size={35}>
            <Button
              style={{ ...styles.Btn, marginRight: 10 }}
              onPress={() =>
                navigate("RaceInfo", {
                  race,
                  checkBoxes: this.props.checkBoxes
                })
              }
            >
              <Text numberOfLines={1} style={{ color: "#fff", fontSize: 13 }}>
                {ifSmallDevice ? "START" : "START RACE"}
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
      </Fragment>
    ));
  };

  render() {
    const {
      _renderRacesRows,
      props: { races }
    } = this;

    return (
      <Grid style={{ flexDirection: "column" }}>{_renderRacesRows(races)}</Grid>
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
    marginVertical: 2,
    height: "80%"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  TitleBlock: {
    backgroundColor: "#000",
    height: 50,
    alignItems: "center"
  },
  Icon: {
    width: ifSmallDevice ? 18 : 28,
    height: ifSmallDevice ? 18 : 28,
    marginHorizontal: 10
  },
  raceInfoItem: {
    minHeight: 35,
    fontSize: ifSmallDevice ? 16 : 18,
  },
  wrapperForIcon: {
    height: ifSmallDevice ? 25 : 35,
    flexDirection: "row",
    alignItems: "flex-start"
  }
});

export default withNavigation(Races);
