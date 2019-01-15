import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Container,
  Item,
  Input,
  Toast
} from "native-base";
import TopButtons from "./components/TopButtons";
import BottomButtons from "./components/BottomButtons";
import MainContent from "./components/MainContent";
import { inject, observer } from "mobx-react";
import HeaderRight from "./components/HeaderRight";
import Modal from "react-native-modal";
import Loading from "../../../../../../components/Loading"

@inject("StartRaceStore", "AuthStore")
@observer
class StartRaceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Start Race",
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
    headerRight: <HeaderRight race_id={navigation.state.params.race.id}/>
  });

  state = {
    isModalVisible: false,
    inputValue: "",
    position: null
  };

  _openModal = (position, index) => () => {
    this.setState({
      isModalVisible: true,
      position,
      indexOfMember: index
    });
  };

  _closeModal = () => {
    this.setState({
      isModalVisible: false,
      position: null,
      inputValue: ""
    });
  };

  _assignBibCode = () => {
    const { race } = this.props.navigation.state.params;
    const {
      StartRaceStore: { assignBibCode }
    } = this.props;

    const position = `${this.state.position}`;
    const scan_by = this.props.AuthStore.user.id;
    const race_id = race.id;
    const default_group = this.props.StartRaceStore.groupNumber;
    const bib_code = this.state.inputValue;

    assignBibCode({
      position,
      scan_by,
      race_id,
      default_group,
      bib_code,
      indexOfMember: this.state.indexOfMember
    });
  };

  _dataForScanner = (position, indexOfMember) => ({
    position: `${position}`,
    scan_by: this.props.AuthStore.user.id,
    default_group: this.props.StartRaceStore.groupNumber,
    indexOfMember,
    assignBibs: false
  });

  _addLap = () => {
    const { race } = this.props.navigation.state.params;
    const { addLap } = this.props.StartRaceStore;

    const lap_by = this.props.AuthStore.user.id;
    const race_id = race.id;
    const default_group = this.props.StartRaceStore.groupNumber;

    addLap({
      race_id,
      lap_by,
      default_group
    });
  };

  componentWillMount() {
    const { race } = this.props.navigation.state.params;
    const {
      StartRaceStore: { clearData, getAllGroups, startRace }
    } = this.props;

    startRace(race.id);
    clearData();
    getAllGroups(race.id);
  }

  StartRace = async () => {
    const { StartRaceStore } = this.props;
    console.log("test");
    StartRaceStore.startTimer();
  };
  formatForTime = (time, zeroCount) => {
    return time.toString().padStart(zeroCount, 0);
  };

  _onValueChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      StartRaceStore: {
        miliseconds,
        seconds,
        minutes,
        stopTimer,
        laps,
        groupNumber,
        saveGroupDetails,
        dataWasChanged,
        loading
      }
    } = this.props;

    const {
      _onValueChange,
      _closeModal,
      _assignBibCode,
      _addLap,
      state: { isModalVisible, inputValue }
    } = this;

    const { race } = this.props.navigation.state.params;

    return (
      <Container>
        <Modal
          ref="modal"
          animationType={"none"}
          isVisible={isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          hideModalContentWhileAnimating={true}
          useNativeDriver={true}
        >
          <View style={styles.modalWindow}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginHorizontal: 20,
                marginVertical: 20
              }}
            >
              ENTER BIB CODE
            </Text>

            <Item style={{ borderWidth: 0 }}>
              <Input
                keyboardType="numeric"
                underlineColorAndroid="#e5e5e5"
                autoFocus={true}
                placeholder="Search"
                placeholderTextColor="#e5e5e5"
                style={{
                  fontSize: 18
                }}
                selectionColor="#ff0560"
                value={inputValue}
                onChangeText={_onValueChange("inputValue")}
              />
            </Item>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                height: 40
              }}
            >
              <TouchableOpacity
                style={{ marginHorizontal: 20 }}
                activeOpacity={0.6}
                onPress={_closeModal}
              >
                <Text style={{ fontSize: 21, color: "#ff0560" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 20 }}
                activeOpacity={0.6}
                onPress={() => {
                  _assignBibCode();
                  _closeModal();
                }}
              >
                <Text style={{ fontSize: 21, color: "#ff0560" }}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <View style={styles.timeBlock}>
            <Text style={{ color: "#14009b", fontSize: 55 }}>
              {this.formatForTime(minutes, 1)}:
            </Text>
            <Text style={{ color: "#14009b", fontSize: 55 }}>
              {this.formatForTime(seconds, 2)}:
            </Text>
            <Text style={{ color: "#14009b", fontSize: 55 }}>
              {this.formatForTime(miliseconds, 3)}
            </Text>
          </View>

          <TopButtons addLap={_addLap} StartRace={this.StartRace} />
        </View>

        {loading && <Loading />}          
        <MainContent
          race={race}
          navigation={this.props.navigation}
          laps={laps}
          dataForScanner={this._dataForScanner}
          openModal={this._openModal}
          dataWasChanged={dataWasChanged}
        />

        <BottomButtons
          saveGroupDetails={() => {
            if(laps.length > 0) {
              saveGroupDetails(groupNumber, race.id)
            } else {
              Toast.show({
                text: "Start the race before save group!",
                buttonText: "Okay"
              });
            }
          }}
          stopTimer={stopTimer}
          groupNumber={groupNumber}
        />
      </Container>
    );
  }

  componentDidUpdate() {
    this.props.StartRaceStore.closeFlag();
  }
}

const styles = StyleSheet.create({
  timeBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  modalWindow: {
    width: "100%",
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto"
  },
  BtnContent: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
    marginVertical: 2,
    marginHorizontal: 5
  },
  btnBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "#a0a0a0",
    borderBottomWidth: 2
  },
  Btn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    width: "49.75%",
    flex: 0,
    borderRadius: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  saveGroupBtn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    width: "49.75%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  saveTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center"
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

export default StartRaceScreen;
