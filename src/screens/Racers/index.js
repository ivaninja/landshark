import React, { Component } from "react";
import { StyleSheet, Text, Image, Dimensions } from "react-native";
import { observer } from "mobx-react/native";
import { inject } from "mobx-react";
import { Content, Container, List, ListItem, Row, Col } from "native-base";
import Loading from "../../components/Loading";
import CustomHeaderForLookUpRunners from "../../components/CustomHeaderForLookUpRunners";

type Props = {};
@inject("RunnersStore")
@observer
export default class RacerScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: <CustomHeaderForLookUpRunners navigation={navigation}/>
  });

  componentWillMount() {
    const { getRunners } = this.props.RunnersStore;
    getRunners();
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10
    );
  };
  renderRunnersList = () => {
    const { runners } = this.props.RunnersStore;
    const { navigate } = this.props.navigation;
    return runners.map((runner, index) => {
      return (
        <ListItem
          key={runner.id}
          onPress={() => navigate("RunnerDetail", { id: runner.id })}
        >
          <Row>
            <Col
              style={{ alignItems: "center", justifyContent: "center" }}
              size={10}
            >
              <Text>{index + 1}</Text>
            </Col>
            <Col size={20}>
              <Image style={styles.Icon} source={{ uri: runner.profile_pic }} />
            </Col>
            <Col size={70}>
              <Row>
                <Col>
                  <Text>{`${runner.firstname} ${runner.lastname}`}</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text style={{ fontStyle: "italic" }}>{`BIB# : ${
                    runner.bib_code
                  }`}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListItem>
      );
    });
  };
  render() {
    const { RunnersStore } = this.props;
    console.log(RunnersStore.runners);
    return (
      <Container>
        {/* <Text>RacerScreen</Text> */}
        <Content
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              console.warn("Reached end of page");
              RunnersStore.goToNextPage();
            }
          }}
        >
          {RunnersStore.loading && <Loading />}
          {!RunnersStore.loading && <List>{this.renderRunnersList()}</List>}
        </Content>
      </Container>
    );
  }
}

const ifSmallDevice = Dimensions.get("window").width < 350;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  Icon: {
    height: ifSmallDevice ? 50 : 60,
    width: ifSmallDevice ? 50 : 60,
    borderRadius: ifSmallDevice ? 50/2 : 60/2
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    borderRadius: 50,
    marginBottom: 5
  }
});
