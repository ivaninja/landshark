import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/Auth/Login";
import RegistrationScreen from "../screens/Auth/Registration";
import RecoveryScreen from "../screens/Auth/Recovery";
import EditPasswordScreen from "../screens/Auth/EditPassword";
import SetUserData from "../screens/Auth/SetUserData";
import Switcher from "../screens/Auth/Switcher";

const AuthRouter = createStackNavigator({
  Login: { screen: LoginScreen },
  Registration: { screen: RegistrationScreen },
  RecoveryScreen: {screen: RecoveryScreen},
  SetUserData: {screen: SetUserData},
  EditPasswordScreen: {screen: EditPasswordScreen},
  SwitcherScreen: {screen: Switcher}
});
export default AuthRouter;
