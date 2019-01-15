import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import { observer } from "mobx-react/native";
import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  Icon,
  Picker
} from "native-base";
import backgroundImage from "../../../assets/img/login_background.jpg";
import HeaderOptions from "../../components/HeaderOptions";
import DateTimePicker from "react-native-modal-datetime-picker";
import addIcon from "../../../assets/icons/add.png";
import { inject } from "mobx-react";
import { required } from "../../validation";
import ViewOverflow from "react-native-view-overflow";
import Loading from "../../components/Loading";
import Toast, { DURATION } from "react-native-easy-toast";
import moment from "moment";

@inject("LocationStore", "AuthStore", "ScheduleRaceStore")
@observer
export default class ScheduleRaceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Schedule Race",
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

  state = {
    raceName: "",
    raceDistance: "",
    ageGroup: "",
    selectedLocation: "",
    selectedGender: "",
    raceDate: "",
    raceTime: "",
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    genderOptions:
      Platform.OS === "android"
        ? [
            { label: "Select Gender", value: "" },
            { label: "Male", value: 1 },
            { label: "Female", value: 2 },
            { label: "Coed", value: 0 }
          ]
        : [
            { label: "Male", value: 1 },
            { label: "Female", value: 2 },
            { label: "Coed", value: 0 }
          ],
    validation: {
      raceName: {
        touched: false,
        errorDescription: "Required"
      },
      raceDistance: {
        touched: false,
        errorDescription: "Required"
      },
      ageGroup: {
        touched: false,
        errorDescription: "Required"
      },
      selectedLocation: {
        touched: false,
        errorDescription: "Required"
      },
      selectedGender: {
        touched: false,
        errorDescription: "Required"
      },
      raceDate: {
        touched: false,
        errorDescription: "Required"
      },
      raceTime: {
        touched: false,
        errorDescription: "Required"
      }
    }
  };

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = value => {
    this.setState({ raceDate: value });
    this._hideDatePicker();
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = value => {
    this.setState({ raceTime: moment(value).format("hh:mm A") });
    this._hideTimePicker();
  };

  _formatedDate = date => {
    return date
      .split(" ")
      .slice(0, 4)
      .join(" ");
  };

  _formatedTime = time => {
    return time
      .split(" ")
      .slice(4, 6)
      .join(" ");
  };

  _onValueChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  _renderPickerItems = options => {
    return options.map((option, i) => (
      <Picker.Item
        key={i}
        label={option.label}
        value={option.value}
        color={option.value.length === 0 ? "#a8a8a8" : "#000"}
      />
    ));
  };

  _isEveryThingValid = () => {
    const {
      raceName,
      raceDistance,
      ageGroup,
      selectedLocation,
      selectedGender,
      raceDate,
      raceTime
    } = this.state;
    const { toast } = this.refs;
    const arrayOfInputsForValidation = [
      { name: "raceName", value: raceName },
      { name: "raceDistance", value: raceDistance },
      { name: "ageGroup", value: ageGroup },
      { name: "selectedLocation", value: selectedLocation },
      { name: "selectedGender", value: selectedGender },
      { name: "raceDate", value: raceDate },
      { name: "raceTime", value: raceTime }
    ];

    const newValidation = {};

    arrayOfInputsForValidation.forEach(input => {
      newValidation[input.name] = {
        touched: true,
        errorDescription: required(input.value)
      };
    });

    let isEveryThingValid = true;

    Object.values(newValidation).forEach(validationBlock => {
      if (validationBlock.errorDescription) {
        isEveryThingValid = false;
      }
    });

    if (isEveryThingValid) {
      console.log(newValidation);
      const params = {
        id: this.props.AuthStore.user.id,
        race_name: raceName,
        race_location: selectedLocation || 1,
        age_group: ageGroup,
        race_type: selectedGender,
        date: raceDate,
        time: raceTime,
        race_distance: raceDistance
      };
      this.props.ScheduleRaceStore.scheduleRace(params, toast);

      this.setState({
        validation: newValidation,
        raceName: "",
        raceDistance: "",
        ageGroup: "",
        selectedLocation: "",
        selectedGender: "",
        raceDate: "",
        raceTime: ""
      });
    }

    this.setState({
      validation: newValidation
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      LocationStore: { locations },
      LocationStore
    } = this.props;
    const {
      state: {
        raceDate,
        raceTime,
        isDatePickerVisible,
        isTimePickerVisible,
        selectedLocation,
        selectedGender,
        genderOptions,
        raceName,
        raceDistance,
        ageGroup,
        validation
      },
      _formatedDate,
      _formatedTime,
      _onValueChange,
      _renderPickerItems,
      _isEveryThingValid
    } = this;

    const formatedLocations =
      Platform.OS === "android"
        ? [{ label: "Select Location", value: "" }, ...locations]
        : [...locations];

    return (
      <Container style={styles.Container}>
        <View style={styles.ViewForBackImg}>
          <Image style={styles.backImg} source={backgroundImage} />
        </View>
        {LocationStore.loading && <Loading />}
        {!LocationStore.loading && (
          <Content showsVerticalScrollIndicator={false} overScrollMode="never">
            <Item rounded style={{ ...styles.input, marginTop: 20 }}>
              <Input
                placeholder="Race Name"
                value={raceName}
                onChangeText={value => {
                  _onValueChange("raceName")(value);
                }}
              />

              {/**Error handling */}
              {validation.raceName.touched &&
                (validation.raceName.errorDescription && (
                  <Fragment>
                    <Icon
                      style={styles.warningIcon}
                      name="exclamation-circle"
                      type="FontAwesome"
                    />
                    <ViewOverflow style={styles.errorBlock}>
                      <View style={styles.errorRedLine} />
                      <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {validation.raceName.errorDescription}
                      </Text>
                    </ViewOverflow>
                  </Fragment>
                ))}
            </Item>

            <Item rounded style={{ ...styles.input, height: 53 }}>
              <Picker
                placeholder="Select Location"
                mode="dropdown"
                selectedValue={selectedLocation}
                onValueChange={value => {
                  _onValueChange("selectedLocation")(value);
                }}
              >
                {_renderPickerItems(formatedLocations)}
              </Picker>

              {/**Error handling */}
              {validation.selectedLocation.touched &&
                (validation.selectedLocation.errorDescription && (
                  <Fragment>
                    <Icon
                      style={styles.warningIcon}
                      name="exclamation-circle"
                      type="FontAwesome"
                    />
                    <ViewOverflow style={styles.errorBlock}>
                      <View style={styles.errorRedLine} />
                      <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {validation.selectedLocation.errorDescription}
                      </Text>
                    </ViewOverflow>
                  </Fragment>
                ))}
            </Item>

            <Item rounded style={styles.input}>
              <Input
                placeholder="Race Distance"
                value={raceDistance}
                onChangeText={value => {
                  _onValueChange("raceDistance")(value);
                }}
              />

              {/**Error handling */}
              {validation.raceDistance.touched &&
                (validation.raceDistance.errorDescription && (
                  <Fragment>
                    <Icon
                      style={styles.warningIcon}
                      name="exclamation-circle"
                      type="FontAwesome"
                    />
                    <ViewOverflow style={styles.errorBlock}>
                      <View style={styles.errorRedLine} />
                      <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {validation.raceDistance.errorDescription}
                      </Text>
                    </ViewOverflow>
                  </Fragment>
                ))}
            </Item>

            <Item rounded style={{ ...styles.input, height: 53 }}>
              <TouchableOpacity
                style={styles.pickerInput}
                activeOpacity={0.8}
                onPress={this._showDatePicker}
              >
                {!raceDate ? (
                  <Text style={styles.placeholder}>Race Date</Text>
                ) : (
                  <Text style={styles.DateTime}>
                    {moment(raceDate).format("MM/DD/YYYY")}
                  </Text>
                )}
              </TouchableOpacity>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDatePicker}
              />

              {/**Error handling */}
              {validation.raceDate.touched &&
                (validation.raceDate.errorDescription && (
                  <Fragment>
                    <Icon
                      style={styles.warningIcon}
                      name="exclamation-circle"
                      type="FontAwesome"
                    />
                    <ViewOverflow style={styles.errorBlock}>
                      <View style={styles.errorRedLine} />
                      <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {validation.raceDate.errorDescription}
                      </Text>
                    </ViewOverflow>
                  </Fragment>
                ))}
            </Item>

            <Item rounded style={{ ...styles.input, height: 53 }}>
              <TouchableOpacity
                style={styles.pickerInput}
                activeOpacity={0.8}
                onPress={this._showTimePicker}
              >
                {!raceTime ? (
                  <Text style={styles.placeholder}>Race Time</Text>
                ) : (
                  <Text style={styles.DateTime}>{raceTime}</Text>
                )}
              </TouchableOpacity>
              <DateTimePicker
                isVisible={isTimePickerVisible}
                onConfirm={this._handleTimePicked}
                onCancel={this._hideTimePicker}
                mode="time"
                is24Hour={false}
              />

              {/**Error handling */}
              {validation.raceTime.touched &&
                (validation.raceTime.errorDescription && (
                  <Fragment>
                    <Icon
                      style={styles.warningIcon}
                      name="exclamation-circle"
                      type="FontAwesome"
                    />
                    <ViewOverflow style={styles.errorBlock}>
                      <View style={styles.errorRedLine} />
                      <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {validation.raceTime.errorDescription}
                      </Text>
                    </ViewOverflow>
                  </Fragment>
                ))}
            </Item>

            <Item rounded style={{ ...styles.input, height: 53 }}>
              <Picker
                placeholder="Select Gender"
                mode="dropdown"
                selectedValue={selectedGender}
                onValueChange={_onValueChange("selectedGender")}
              >
                {_renderPickerItems(genderOptions)}
              </Picker>

              {/**Error handling */}
              {validation.selectedGender.touched &&
                (validation.selectedGender.errorDescription && (
                  <Fragment>
                    <Icon
                      style={styles.warningIcon}
                      name="exclamation-circle"
                      type="FontAwesome"
                    />
                    <ViewOverflow style={styles.errorBlock}>
                      <View style={styles.errorRedLine} />
                      <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {validation.selectedGender.errorDescription}
                      </Text>
                    </ViewOverflow>
                  </Fragment>
                ))}
            </Item>

            <Item rounded style={styles.input}>
              <Input
                placeholder="Age Group"
                value={ageGroup}
                onChangeText={value => {
                  _onValueChange("ageGroup")(value);
                }}
              />

              {/**Error handling */}
              {validation.ageGroup.touched &&
                (validation.ageGroup.errorDescription && (
                  <Fragment>
                    <Icon
                      style={styles.warningIcon}
                      name="exclamation-circle"
                      type="FontAwesome"
                    />
                    <ViewOverflow style={styles.errorBlock}>
                      <View style={styles.errorRedLine} />
                      <Text style={{ color: "#fff", paddingHorizontal: 5 }}>
                        {validation.ageGroup.errorDescription}
                      </Text>
                    </ViewOverflow>
                  </Fragment>
                ))}
            </Item>

            <Button style={styles.btnStyle} onPress={_isEveryThingValid}>
              <Text style={{ color: "#fff", textAlign: "center" }}>SAVE</Text>
            </Button>

            <View style={{ width: "100%" }}>
              <Button
                style={styles.addBtn}
                onPress={() => navigate("InputLocation")}
              >
                <Image style={styles.addIcon} source={addIcon} />
              </Button>
            </View>
          </Content>
        )}
        <Toast
          ref="toast"
          positionValue={500}
          style={{ padding: 40, fontSize: 24 }}
          textStyle={{ fontSize: 18, color: "white" }}
        />
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
  input: {
    backgroundColor: "#fff",
    marginBottom: 20
  },
  btnStyle: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
    width: "45%",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  placeholder: {
    marginLeft: 7,
    color: "#575757",
    fontSize: 16.5
  },
  pickerInput: {
    width: "87%",
    height: "100%",
    justifyContent: "center"
  },
  DateTime: {
    marginLeft: 7,
    color: "#000",
    fontSize: 16.5
  },
  addIcon: {
    width: 30,
    height: 30
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(184, 8, 17, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginVertical: 10
  },
  warningIcon: {
    color: "#E80000",
    fontSize: 30,
    marginLeft: "auto"
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
