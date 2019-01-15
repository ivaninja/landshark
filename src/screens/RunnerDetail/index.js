import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import { observer } from "mobx-react/native";
import { inject } from "mobx-react";
import {
  Content,
  Container,
  List,
  ListItem,
  Row,
  Col,
  Grid,
  Text
} from "native-base";
import Loading from "../../components/Loading";

type Props = {};
@inject("RunnerDetailStore")
@observer
export default class RunnerDetail extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: "Runner details",
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
    const { getRunner } = this.props.RunnerDetailStore;
    const { navigation } = this.props;
    const id = navigation.getParam("id", "NO-ID");
    getRunner(id);
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10
    );
  };

  render() {
    const { RunnerDetailStore } = this.props;
    const { runner } = RunnerDetailStore;
    return (
      <Container>
        {/* <Text>RunnerDetail</Text> */}
        <Content>
          {RunnerDetailStore.loading && <Loading />}
          {!RunnerDetailStore.loading && (
            <Grid>
              <Row style={styles.container}>
                <Image
                  style={styles.Icon}
                  source={{ uri: runner.profile_pic }}
                />
              </Row>
              <Row style={[styles.container, { marginVertical: 0 }]}>
                <Text>{`${runner.firstname} ${runner.lastname}`}</Text>
              </Row>
              <Row
                style={[
                  styles.container,
                  { marginVertical: 0, marginBottom: 10 }
                ]}
              >
                <Text>{`BIB# : ${runner.bib_code}`}</Text>
              </Row>
              <List>
                <ListItem noBorder style={[styles.borderTop, styles.border]}>
                  <Grid>
                    <Row>
                      <Text>Name</Text>
                    </Row>
                    <Row>
                      <Text style={styles.bold}>{`${runner.firstname} ${
                        runner.lastname
                      }`}</Text>
                    </Row>
                  </Grid>
                </ListItem>
                <ListItem noBorder style={styles.border}>
                  <Grid>
                    <Row>
                      <Text>Age / Grade</Text>
                    </Row>
                    <Row>
                      <Text style={styles.bold}>{runner.grade}</Text>
                    </Row>
                  </Grid>
                </ListItem>
                <ListItem noBorder style={styles.border}>
                  <Grid>
                    <Row>
                      <Text>School</Text>
                    </Row>
                    <Row>
                      <Text style={styles.bold}>{runner.school}</Text>
                    </Row>
                  </Grid>
                </ListItem>
                <ListItem noBorder style={styles.border}>
                  <Grid>
                    <Row>
                      <Text>Father`s Name</Text>
                    </Row>
                    <Row>
                      <Text style={styles.bold}>
                        {runner.emr_firstname} {runner.emr_lastname}
                      </Text>
                    </Row>
                  </Grid>
                </ListItem>
                <ListItem noBorder style={styles.border}>
                  <Grid>
                    <Row>
                      <Text>Contacts</Text>
                    </Row>
                    <Row>
                      <Text style={styles.bold}>
                        {runner.emr_workphone}
                        {runner.emr_homephone
                          ? `, ${runner.emr_homephone}`
                          : ""}
                      </Text>
                    </Row>
                  </Grid>
                </ListItem>
                <ListItem noBorder style={styles.border}>
                  <Grid>
                    <Row>
                      <Text>Sex</Text>
                    </Row>
                    <Row>
                      <Text style={styles.bold}>{runner.gender_name}</Text>
                    </Row>
                  </Grid>
                </ListItem>
                <ListItem noBorder style={styles.border}>
                  <Grid>
                    <Row>
                      <Text>Age / Grade</Text>
                    </Row>
                    <Row>
                      <Text style={styles.bold}>{runner.age || "-"}</Text>
                    </Row>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: 15,
    alignItems: "center"
  },
  Icon: {
    height: 110,
    width: 110,
    borderRadius: 55
  },
  borderTop: {
    borderTopColor: "#545454",
    borderTopWidth: 1
  },
  border: {
    borderBottomColor: "#545454",
    borderBottomWidth: 1,
    marginLeft: 0,
    paddingLeft: 10
  },
  bold: {
    fontWeight: "bold"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
