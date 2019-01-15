import React, { Component } from "react";

import { StyleSheet, Image, View } from "react-native";
import { inject, observer } from "mobx-react";
import QRCodeScanner from "react-native-qrcode-scanner";

@inject("StartRaceStore", "AuthStore", "AssignBibStore")
@observer
export default class ScanScreen extends Component {
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

  _assignBibCode = bib_code => {
    const { race, dataForRequest } = this.props.navigation.state.params;

    const position = dataForRequest.position;
    const scan_by = dataForRequest.scan_by;
    const race_id = race.id;
    const default_group = this.props.StartRaceStore.groupNumber;

    if (dataForRequest.assignBibs) {
      const {
        AssignBibStore: { assignBibCode }
      } = this.props;
      
      assignBibCode({
        position,
        scan_by,
        race_id,
        default_group: dataForRequest.default_group,
        bib_code,
        indexOfMember: dataForRequest.indexOfMember
      });

    } else {

      const {
        StartRaceStore: { assignBibCode }
      } = this.props;

      assignBibCode({
        position,
        scan_by,
        race_id,
        default_group,
        bib_code,
        indexOfMember: dataForRequest.indexOfMember
      });
    }
  };

  onSuccess = e => {
    const { goBack } = this.props.navigation;

    if (isNaN(Number(e.data))) {
      alert("Incorrect QR Code!");
      this.scanner.reactivate();
    } else {
      this._assignBibCode(e.data);
      console.log("SCAN", e);

      goBack();
    }
  };

  render() {
    const {
      props: {
        navigation: {
          goBack,
          state: {
            params: { race, dataForRequest }
          }
        }
      }
    } = this;
    console.log(dataForRequest, this.props.navigation);

    const Marker = (
      <Image
        source={require("../../../assets/QRScaner/marker.png")}
        style={{ height: 300, width: 300 }}
      />
    );

    return (
      <QRCodeScanner
        ref={node => {
          this.scanner = node;
        }}
        onRead={this.onSuccess}
        topViewStyle={{ backgroundColor: "rgba(0,0,0, 0)" }}
        bottomViewStyle={{ backgroundColor: "rgba(0,0,0, 0)" }}
        showMarker={true}
        customMarker={Marker}
        cameraStyle={{ height: "100%", width: "100%" }}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    backgroundColor: "rgba(0,0,0, 0.6)",
    padding: 16
  }
});
