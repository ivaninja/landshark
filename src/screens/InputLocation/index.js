import React, { Component, Fragment } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { observer } from "mobx-react/native";
import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  H1,
  Icon
} from "native-base";
import backgroundImage from "../../../assets/img/login_background.jpg";
import { required } from "../../validation";
import ViewOverflow from "react-native-view-overflow";
import { inject } from "mobx-react";
import Toast, { DURATION } from "react-native-easy-toast";
import Loading from "../../components/Loading";

@inject("LocationStore")
@observer
export default class InputLocationScreen extends Component {
  static navigationOptions = {
    title: "Input Location",
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
  };

  state = {
    locationName: "",
    locationAddress: "",
    city: "",
    state: "",
    zip: "",
    validation: {
      locationName: {
        touched: false,
        errorDescription: "Required"
      },
      locationAddress: {
        touched: false,
        errorDescription: "Required"
      },
      city: {
        touched: false,
        errorDescription: "Required"
      },
      state: {
        touched: false,
        errorDescription: "Required"
      },
      zip: {
        touched: false,
        errorDescription: "Required"
      }
    }
  };

  _onValueChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  _requiredValidation = name => value => {
    this.setState({
      validation: {
        ...this.state.validation,
        [name]: {
          touched: true,
          errorDescription: required(value)
        }
      }
    });
  };

  saveLocation = () => {
    const { locationName, locationAddress, city, state, zip } = this.state;
    const { toast } = this.refs;
    const params = {
      name: locationName,
      address: locationAddress,
      city,
      state,
      zip
    };
    const { LocationStore } = this.props;
    LocationStore.addLocation(params, toast);
    this.setState({
      locationName: "",
      locationAddress: "",
      city: "",
      state: "",
      zip: ""
    });
  };
  _isEveryThisValid = () => {
    const {
      locationName,
      locationAddress,
      city,
      state,
      zip
    } = this.state.validation;
    const arrayOfInputs = [locationName, locationAddress, city, state, zip];

    return arrayOfInputs.every(input => input.errorDescription === null);
  };

  render() {
    const {
      state: { validation, locationName, locationAddress, city, state, zip },
      _onValueChange,
      _requiredValidation,
      _isEveryThisValid
    } = this;
    const { loading } = this.props.LocationStore;

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>

        {loading && <Loading />}
        <Content showsVerticalScrollIndicator={false} overScrollMode="never">
          <Item rounded style={{ ...styles.input, marginTop: 20 }}>
            <Input
              placeholder="Location Name"
              value={locationName}
              onChangeText={value => {
                _onValueChange("locationName")(value);
                _requiredValidation("locationName")(value);
              }}
            />

            {/**Error handling */}
            {validation.locationName.touched &&
              (validation.locationName.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.locationName.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Input
              placeholder="Location Address #1"
              value={locationAddress}
              onChangeText={value => {
                _onValueChange("locationAddress")(value);
                _requiredValidation("locationAddress")(value);
              }}
            />

            {/**Error handling */}
            {validation.locationAddress.touched &&
              (validation.locationAddress.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.locationAddress.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Input
              placeholder="City"
              value={city}
              onChangeText={value => {
                _onValueChange("city")(value);
                _requiredValidation("city")(value);
              }}
            />

            {/**Error handling */}
            {validation.city.touched &&
              (validation.city.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.city.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Input
              placeholder="State"
              value={state}
              onChangeText={value => {
                _onValueChange("state")(value);
                _requiredValidation("state")(value);
              }}
            />

            {/**Error handling */}
            {validation.state.touched &&
              (validation.state.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.state.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          <Item rounded style={styles.input}>
            <Input
              placeholder="Zip"
              value={zip}
              onChangeText={value => {
                _onValueChange("zip")(value);
                _requiredValidation("zip")(value);
              }}
            />

            {/**Error handling */}
            {validation.zip.touched &&
              (validation.zip.errorDescription && (
                <Fragment>
                  <Icon
                    style={styles.warningIcon}
                    name="exclamation-circle"
                    type="FontAwesome"
                  />
                  <ViewOverflow style={styles.errorBlock}>
                    <View style={styles.errorRedLine} />
                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                      {validation.zip.errorDescription}
                    </Text>
                  </ViewOverflow>
                </Fragment>
              ))}
          </Item>

          {/* <Button style={styles.submitBtn}>
            <Text style={{ color: "#fff" }}>SAVE</Text>
          </Button> */}

          {_isEveryThisValid() ? (
            <Button style={styles.submitBtn} onPress={this.saveLocation}>
              <Text style={{ color: "#fff" }}>SAVE</Text>
            </Button>
          ) : (
            <Button disabled style={styles.disabledBtn}>
              <Text style={{ color: "#fff" }}>SAVE</Text>
            </Button>
          )}
        </Content>
        <Toast ref="toast" />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: { paddingHorizontal: 20 },
  ViewForBackImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  backImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  wrapperForSharkIcon: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30
  },
  sharkIconImg: {
    width: 60,
    height: 60
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 20
  },
  submitBtn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 15
  },
  disabledBtn: {
    backgroundColor: "rgba(91, 91, 91, 1)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 15
  },
  warningIcon: {
    color: "#E80000",
    fontSize: 30
  },
  errorBlock: {
    position: "absolute",
    right: 0,
    top: 37,
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 30,
    zIndex: 9999,
    overflow: "visible"
  },
  errorRedLine: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 0, 0, 0.8)"
  }
});
