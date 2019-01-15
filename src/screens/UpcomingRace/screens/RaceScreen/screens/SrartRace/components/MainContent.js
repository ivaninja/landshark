import React, { Component, Fragment } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, Row, Button, Grid, Content } from "native-base";

export default class MainContent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.laps.length !== this.props.laps.length ||
      nextProps.dataWasChanged
    ) {
      return true;
    }

    return false;
  }

  _renderLaps = laps => {
    const { navigate } = this.props.navigation;
    const { race } = this.props;

    return laps.map((result, i) => {
      return (
        <Row
          style={{
            height: 70,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          key={i}
        >
          <Text style={{ marginHorizontal: 10, ...styles.contentText }}>
            {result.place}
          </Text>

          <Text style={styles.contentText}>{result.time}</Text>

          {result.existMemberData && (
            <Fragment>
              <Text style={{ marginHorizontal: 5, ...styles.contentText }}>
                {result.memberData.fullName}
              </Text>
              <Text style={{ marginHorizontal: 5, ...styles.contentText }}>
                Bib# {result.memberData.bib}
              </Text>
            </Fragment>
          )}

          <Button
            style={styles.BtnContent}
            onPress={() =>
              navigate("QrScanner", {
                race,
                dataForRequest: this.props.dataForScanner(result.place, i)
              })
            }
          >
            <Text style={{ color: "#fff" }}>
              {result.existMemberData ? "RESCAN" : "SCAN BIB"}
            </Text>
          </Button>

          <Button
            style={styles.BtnContent}
            onPress={this.props.openModal(result.place, i)}
          >
            <Text style={{ color: "#fff" }}>ENTER BIB</Text>
          </Button>
        </Row>
      );
    });
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <Content
          style={{ backgroundColor: "#fff" }}
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal={true}
          alwaysBounceHorizontal={true}
        >
          <Grid style={{ flexDirection: "column" }}>
            {this._renderLaps(this.props.laps)}
          </Grid>
        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  BtnContent: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
    marginVertical: 2,
    marginHorizontal: 5
  },
  contentText: {
    textAlignVertical: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: "auto",
    marginTop: 15,
    alignSelf: "center"
  }
});
