import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
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
import RenderRaces from "./components/Races";
import { inject, observer } from "mobx-react";
import Loading from "../../components/Loading";
import Modal from "react-native-modal";

@inject("ResultStore", "LocationStore")
@observer
export default class ResultsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Results",
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
    checkBoxes: [],
    isModalVisible: false
  };

  componentWillMount() {
    this.props.ResultStore.getResults();
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10
    );
  };
  componentWillUpdate(nextProps) {
    const { locations } = nextProps.LocationStore;
    const { checkBoxes } = this.state;

    const newCheckBoxes = [];

    if (locations.length > 0 && checkBoxes.length === 0) {
      locations.forEach(location => {
        const checkBoxData = {
          value: location.value,
          label: location.label,
          checked: false
        };

        newCheckBoxes.push(checkBoxData);
      });

      this.setState({
        checkBoxes: newCheckBoxes
      });
    }
  }

  _openModal = () => {
    this.setState({
      isModalVisible: true
    });
  };

  _closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  _toggleCheckBoxes = index => () => {
    const { checkBoxes } = this.state;
    checkBoxes[index].checked = !checkBoxes[index].checked;

    const newCheckBoxes = [...checkBoxes];

    this.setState({
      checkBoxes: newCheckBoxes
    });
  };

  _selectAll = () => {
    const { checkBoxes } = this.state;

    const newCheckBoxes = checkBoxes.reduce((acc, checkBox) => {
      checkBox.checked = true;
      acc.push(checkBox);

      return acc;
    }, []);

    this.setState({
      checkBoxes: newCheckBoxes
    });
  };

  _renderCheckBoxes = locations => {
    return locations.map((location, i) => {
      return (
        <Row key={i} style={{ marginVertical: 5 }}>
          <Col size={20}>
            <CheckBox
              checked={location.checked}
              color="#ff0560"
              onPress={this._toggleCheckBoxes(i)}
            />
          </Col>
          <Col size={80}>
            <Text>{location.label}</Text>
          </Col>
        </Row>
      );
    });
  };

  render() {
    const {
      resultRaces,
      loading,
      getResults,
      goToNextPage,
      dataWasChanged
    } = this.props.ResultStore;
    const {
      state: { isModalVisible, checkBoxes },
      _openModal,
      _closeModal,
      _renderCheckBoxes,
      _selectAll
    } = this;

    return (
      <Container>
        <View style={styles.fixedTopView}>
          <Button style={styles.Btn} onPress={_openModal}>
            <Text style={{ color: "#fff", fontSize: 14 }}>
              SELECT LOCATIONS
            </Text>
          </Button>

          <Modal
            ref="modal"
            animationType={"none"}
            isVisible={isModalVisible}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
          >
            <View style={styles.modalWindow}>
              <View style={styles.topModalBlock}>
                <Text
                  style={{ color: "#5b5b5b", fontSize: 22, marginLeft: 20 }}
                >
                  Select Location
                </Text>
              </View>

              <ScrollView>
                <Grid>{_renderCheckBoxes(checkBoxes)}</Grid>
              </ScrollView>

              <View style={styles.bottomModalBlock}>
                <Text
                  style={{
                    color: "#ff0560",
                    width: "50%",
                    textAlign: "center",
                    fontSize: 16
                  }}
                  onPress={_selectAll}
                >
                  SELECT ALL
                </Text>

                <Text
                  style={{
                    color: "#ff0560",
                    width: "25%",
                    textAlign: "center",
                    fontSize: 16
                  }}
                  onPress={_closeModal}
                >
                  DISMISS
                </Text>

                <Text
                  style={{
                    color: "#ff0560",
                    width: "25%",
                    textAlign: "center",
                    fontSize: 16
                  }}
                  onPress={() => {
                    getResults(checkBoxes);
                    _closeModal();
                  }}
                >
                  OK
                </Text>
              </View>
            </View>
          </Modal>
        </View>

        <Content
          style={{ backgroundColor: "#dbdbdb" }}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              console.warn("Reached end of page");
              goToNextPage();
            }
          }}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          {loading && <Loading />}
          {!loading && (
            <RenderRaces dataWasChanged={dataWasChanged} races={resultRaces} />
          )}
        </Content>
      </Container>
    );
  }

  componentDidUpdate() {
    this.props.ResultStore.closeFlag();
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
  }
});
