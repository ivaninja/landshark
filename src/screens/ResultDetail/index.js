import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import clockIcon from "../../../assets/icons/clock.png";
import positionIcon from "../../../assets/icons/position.png";
import locationIcon from "../../../assets/icons/location.png";
import genderIcon from "../../../assets/icons/gender.png";
import {
  Container,
  Content,
  Text,
  Icon,
  Button,
  CheckBox,
  Grid,
  Row,
  Col
} from "native-base";
import HeaderOptions from "../../components/HeaderOptions";
import { inject, observer } from "mobx-react";
import Loading from "../../components/Loading";
import UtilsService from "../../services/UtilsService";

@inject("ResultStore")
@observer
export default class ResultDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Result Details",
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
  componentWillMount() {
    const { navigation } = this.props;
    const race = navigation.getParam("race", "NO-ID");
    this.props.ResultStore.getResultById(race.id);
  }
  render() {
    const { navigation, ResultStore } = this.props;
    const { detail, detailLoading } = ResultStore;
    const race = navigation.getParam("race", "NO-ID");
    console.log(detail && detail.runner_det.length);
    return (
      <Container>
        {detailLoading && <Loading />}
        <Content>
          {!detailLoading &&
            detail.runner_det.map((runner, i) => {
              {
                /* console.log(i); */
              }
              return (
                <Grid key={i}>
                  <Row style={styles.TitleBlock}>
                    <Col>
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 18,
                          marginLeft: 10
                        }}
                      >
                        {`${runner.firstname} ${runner.lastname}`}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ paddingVertical: 5, alignItems: "center" }}>
                    <Col stye={styles.center} size={40}>
                      <View style={styles.wrapperForIcon}>
                        <Image style={styles.Icon} source={clockIcon} />
                        <Text style={styles.raceInfoItem}>Time</Text>
                      </View>
                    </Col>
                    <Col stye={styles.center} size={60}>
                      <Text style={styles.raceInfoItem}>{runner.time}</Text>
                    </Col>
                  </Row>
                  <Row style={{ paddingVertical: 5, alignItems: "center" }}>
                    <Col stye={styles.center} size={40}>
                      <View style={styles.wrapperForIcon}>
                        <Image style={styles.Icon} source={positionIcon} />
                        <Text style={styles.raceInfoItem}>Position</Text>
                      </View>
                    </Col>
                    <Col stye={styles.center} size={60}>
                      <Text style={styles.raceInfoItem}>{runner.position}</Text>
                    </Col>
                  </Row>
                  <Row style={{ paddingVertical: 5, alignItems: "center" }}>
                    <Col stye={styles.center} size={40}>
                      <View style={styles.wrapperForIcon}>
                        <Image style={styles.Icon} source={locationIcon} />
                        <Text style={styles.raceInfoItem}>Location</Text>
                      </View>
                    </Col>
                    <Col stye={styles.center} size={60}>
                      <Text style={styles.raceInfoItem}>
                        {runner.location_name}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ paddingVertical: 5, alignItems: "center" }}>
                    <Col stye={styles.center} size={40}>
                      <View style={styles.wrapperForIcon}>
                        <Image style={styles.Icon} source={genderIcon} />
                        <Text style={styles.raceInfoItem}>Gender</Text>
                      </View>
                    </Col>
                    <Col stye={styles.center} size={60}>
                      <Text style={styles.raceInfoItem}>
                        {runner.gender_name}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              );
            })}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Btn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    marginVertical: 2
  },
  fixedTopView: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  modalWindow: {
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto"
  },
  bottomModalBlock: {
    flexDirection: "row",
    paddingVertical: 10,
    borderTopColor: "#b5b5b5",
    borderTopWidth: 1
  },
  topModalBlock: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "#b5b5b5",
    borderBottomWidth: 1
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
    width: 28,
    height: 28,
    marginHorizontal: 10
  },
  raceInfoItem: {
    minHeight: 35,
    fontSize: 20,
    textAlignVertical: "bottom"
  },
  wrapperForIcon: {
    height: 35,
    flexDirection: "row",
    alignItems: "flex-end"
  }
});
