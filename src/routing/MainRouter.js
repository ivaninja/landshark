import { DrawerNavigator, createStackNavigator } from "react-navigation";
import RacerScreen from "../screens/Racers/index";
import EditRaceScreen from "../screens/EditRace";
import SettingsScreen from "../screens/Settings";
import DashBoard from "../screens/DashBoard";
import EditProfile from "../screens/EditProfile";
import ChangePasswordScreen from "../screens/ChangePassword";
import ScheduleRaceScreen from "../screens/ScheduleRace";
import InputLocationScreen from "../screens/InputLocation";
import UpcomingRaceScreen from "../screens/UpcomingRace";
import RaceInfoScreen from "../screens/UpcomingRace/screens/RaceScreen";
import AssignBibsScreen from "../screens/AssignBibs";
import QrScanner from "../screens/QrScanner";
import RaceInProgressScreen from "../screens/RaceInProgress";
import ResultDetail from "../screens/ResultDetail";
import AppInfo from "../screens/AppInfo";

import React from "react";
import { Image, StyleSheet } from "react-native";
import homeIcon from "../../assets/icons/home_white.png";
import scheduleIcon from "../../assets/icons/schedule_race_white.png";
import runnerRaceIcon from "../../assets/icons/lookup_runner_white.png";
import resultsIcon from "../../assets/icons/results_white.png";
import settingIcon from "../../assets/icons/setting_white.png";
import upcomingIcon from "../../assets/icons/upcoming_race_white.png";

import CustomDrawer from "../components/CustomDrawer";
import RunnerDetail from "../screens/RunnerDetail/index";
import StartRaceScreen from "../screens/UpcomingRace/screens/RaceScreen/screens/SrartRace";
import ResultsScreen from "../screens/Results/index";

const mainStackNavigator = createStackNavigator({
  DashBoard: { screen: DashBoard }
});

const settingsStackNavigator = createStackNavigator(
  {
    Settings: { screen: SettingsScreen },
    EditProfile: { screen: EditProfile },
    ChangePassword: { screen: ChangePasswordScreen },
    AppInfo: {screen: AppInfo}
  },
  { initialRouteName: "Settings" }
);

const ScheduleRaceStackNavigator = createStackNavigator(
  {
    ScheduleRace: { screen: ScheduleRaceScreen },
    InputLocation: { screen: InputLocationScreen }
  },
  { initialRouteName: "ScheduleRace" }
);

const RunnersStack = createStackNavigator(
  {
    RunnerList: { screen: RacerScreen },
    RunnerDetail: { screen: RunnerDetail }
  },
  { initialRouteName: "RunnerList" }
);
const ResultsStack = createStackNavigator(
  {
    ResultList: { screen: ResultsScreen },
    ResultDetail: { screen: ResultDetail }
    // RunnerDetail: { screen: RunnerDetail }
  },
  { initialRouteName: "ResultList" }
);
const UpcomingRaceStackNavigator = createStackNavigator(
  {
    UpcomingRace: { screen: UpcomingRaceScreen },
    RaceInfo: { screen: RaceInfoScreen },
    AssignBibs: { screen: AssignBibsScreen },
    StartRace: {
      screen: StartRaceScreen
    },
    QrScanner: {
      screen: QrScanner
    },
    EditRace: {
      screen: EditRaceScreen
    }
  },
  { initialRouteName: "UpcomingRace" }
);

const RaceInProgressStack = createStackNavigator(
  {
    RaceInProgress: {
      screen: RaceInProgressScreen
    },
    ProgressAssignBibs: {
      screen: AssignBibsScreen
    },
    QrScanner: {
      screen: QrScanner
    },
    EditRace: {
      screen: EditRaceScreen
    }
  },
  { initialRouteName: "RaceInProgress" }
);

const MainRouter = DrawerNavigator(
  {
    Dashboard: {
      screen: mainStackNavigator,
      navigationOptions: {
        drawerIcon: () => <Image style={styles.Icon} source={homeIcon} />
      }
    },
    "Upcoming Races": {
      screen: UpcomingRaceStackNavigator,
      navigationOptions: {
        drawerIcon: () => <Image style={styles.Icon} source={upcomingIcon} />
      }
    },
    "Schedule Race": {
      screen: ScheduleRaceStackNavigator,
      navigationOptions: {
        drawerIcon: () => <Image style={styles.Icon} source={scheduleIcon} />
      }
    },
    "Lookup Runners": {
      screen: RunnersStack,
      navigationOptions: {
        drawerIcon: () => <Image style={styles.Icon} source={runnerRaceIcon} />
      }
    },
    "Races in Progress": {
      screen: RaceInProgressStack,
      navigationOptions: {
        drawerIcon: () => <Image style={styles.Icon} source={upcomingIcon} />
      }
    },
    Results: {
      screen: ResultsStack, //Change Screen
      navigationOptions: {
        drawerIcon: () => <Image style={styles.Icon} source={resultsIcon} />
      }
    },
    Settings: {
      screen: settingsStackNavigator,
      navigationOptions: {
        drawerIcon: () => <Image style={styles.Icon} source={settingIcon} />
      }
    }
  },
  { initialRouteName: "Dashboard", contentComponent: CustomDrawer }
);

export default MainRouter;

const styles = StyleSheet.create({
  Icon: {
    width: 25,
    height: 25
  }
});
