import React, { Component, Fragment } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  Grid,
  Row,
  Toast,
  Text,
  Button,
  Container,
  Content,
  Item,
  Picker,
  Input
} from "native-base";
import { inject, observer } from "mobx-react";
import Modal from "react-native-modal";
import Loading from "../../components/Loading";
import MainContent from "./components/MainContent";

@inject("AssignBibStore", "AuthStore")
@observer
export default class AssignBibsScreen extends Component {
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

  state = {
    selectedGroup: "",
    isModalVisible: false,
    inputValue: "",
    position: null
  };

  _openModal = (position, index, default_group) => () => {
    this.setState({
      isModalVisible: true,
      position,
      indexOfMember: index,
      default_group
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
      AssignBibStore: { assignBibCode }
    } = this.props;

    const position = `${this.state.position}`;
    const scan_by = this.props.AuthStore.user.id;
    const race_id = race.id;
    const default_group = this.state.default_group;
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

  componentWillMount() {
    const { race } = this.props.navigation.state.params;
    this.props.AssignBibStore.getAllGroups(race.id);
  }

  _renderPickerItems = countOfGroups => {
    const PickerItems =
      Platform.OS === "android"
        ? [
            <Picker.Item
              key={228}
              label={"Select Group"}
              value={""}
              color={"#a8a8a8"}
            />
          ]
        : [];

    for (let i = 0; i < countOfGroups; i++) {
      const PickerItem = (
        <Picker.Item key={i} label={`Group ${i + 1}`} value={i + 1} />
      );
      PickerItems.push(PickerItem);
    }

    return PickerItems;
  };

  _onValueChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  _finishRace = race_id => () => {
    const {
      props: {
        navigation: { navigate },
        AssignBibStore: { FinishRace, selectedGroupData }
      }
    } = this;

    const isValid = selectedGroupData.reduce((acc, result) => {
      if (result.bib_code === null) {
        acc = false;
      }

      return acc;
    }, true);

    if (selectedGroupData.length === 0) {
      Toast.show({
        text: "Select Group",
        buttonText: "Okay"
      });

      return;
    }

    if (isValid) {
      FinishRace(race_id);
      navigate("Dashboard");
    } else {
      Toast.show({
        text: "Fill every results",
        buttonText: "Okay"
      });
    }
  };

  componentWillUpdate(nextProps, nextState) {
    const {
      props: {
        AssignBibStore: { getAddBibResults }
      },
      state: { selectedGroup }
    } = this;
    const { race } = this.props.navigation.state.params;
    const groupLength = nextState.selectedGroup.toString().length;

    if (groupLength > 0 && selectedGroup !== nextState.selectedGroup) {
      getAddBibResults(race.id, nextState.selectedGroup);
    }
  }

  render() {
    const {
      props: {
        navigation: { navigate },
        AssignBibStore: {
          countOfGroups,
          selectedGroupData,
          loading,
          dataWasChanged
        }
      },
      state: { selectedGroup, isModalVisible, inputValue },
      _onValueChange,
      _renderPickerItems,
      _renderMembersResults,
      _closeModal,
      _assignBibCode,
      _finishRace
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

        <Item>
          <Picker
            placeholder="Select Group"
            mode="dropdown"
            selectedValue={selectedGroup}
            onValueChange={_onValueChange("selectedGroup")}
          >
            {_renderPickerItems(countOfGroups)}
          </Picker>
        </Item>

        {loading && <Loading />}

        <MainContent
          navigation={this.props.navigation}
          race={race}
          dataWasChanged={dataWasChanged}
          scan_by={this.props.AuthStore.user.id}
          openModal={this._openModal}
          selectedGroupData={selectedGroupData}
        />

        {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={() => {
              navigate("EditRace", { race });
            }}
          >
            <Text style={styles.finish}>EDIT RACE</Text>
          </TouchableOpacity>

          <View
            style={{ backgroundColor: "#fff", width: "0.5%", height: "100%" }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={_finishRace(race.id)}
          >
            <Text style={styles.finish}>FINISH RACE</Text>
          </TouchableOpacity>
        </View> */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bottomBtn}
          onPress={_finishRace(race.id)}
        >
          <Text style={styles.finish}>FINISH RACE</Text>
        </TouchableOpacity>
      </Container>
    );
  }

  componentDidUpdate() {
    this.props.AssignBibStore.closeFlag();
  }

  componentWillUnmount() {
    this.props.AssignBibStore.resetAssignBib();
  }
}

const styles = StyleSheet.create({
  modalWindow: {
    width: "100%",
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto"
  },
  Btn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
    marginVertical: 2,
    marginHorizontal: 5
  },
  // bottomBtn: {
  //   backgroundColor: "rgba(184, 8, 17, 1)",
  //   width: "49.75%",
  //   height: 60,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  bottomBtn: {
    backgroundColor: "rgba(184, 8, 17, 1)",
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  finish: {
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
    marginTop: 15
  }
});
