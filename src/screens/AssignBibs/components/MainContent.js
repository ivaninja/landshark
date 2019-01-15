import React, { Component, Fragment } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, Button, Row, Content, Grid } from "native-base";

export default class MainContent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.selectedGroupData.length !==
        this.props.selectedGroupData.length ||
      nextProps.dataWasChanged
    ) {
      return true;
    }

    return false;
  }

  _renderMembersResults = results => {
    const {
      props: {
        navigation: { navigate },
        race
      }
    } = this;

    return results.map((result, i) => (
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
          {result.position}
        </Text>

        <Text style={{ marginHorizontal: 10, ...styles.contentText }}>
          {result.time}
        </Text>

        {result.bib_code && (
          <Fragment>
            <Text style={{ marginHorizontal: 5, ...styles.contentText }}>
              {result.firstname} {result.lastname}
            </Text>
            <Text style={{ marginHorizontal: 5, ...styles.contentText }}>
              Bib# {result.bib_code}
            </Text>
          </Fragment>
        )}

        <Button
          style={styles.Btn}
          onPress={() =>
            navigate("QrScanner", {
              race,
              dataForRequest: {
                position: result.position,
                scan_by: this.props.scan_by,
                default_group: result.default_group,
                indexOfMember: i,
                assignBibs: true
              }
            })
          }
        >
          <Text style={{ color: "#fff" }}>
            {result.bib_code ? "RESCAN" : "SCAN BIB"}
          </Text>
        </Button>

        <Button
          style={styles.Btn}
          onPress={this.props.openModal(
            result.position,
            i,
            result.default_group
          )}
        >
          <Text style={{ color: "#fff" }}>ENTER BIB</Text>
        </Button>
      </Row>
    ));
  };

  render() {
    return (
      <ScrollView
        style={{ height: "100%" }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <Content
          style={{ backgroundColor: "#fff", height: "100%" }}
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal={true}
          alwaysBounceHorizontal={true}
        >
          <Grid style={{ flexDirection: "column" }}>
            {this._renderMembersResults(this.props.selectedGroupData)}
          </Grid>
        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Btn: {
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
    marginTop: 15
  }
});
