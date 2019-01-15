import { observable, action } from "mobx";
import ApiService from "../services/ApiService";
import { AsyncStorage } from "react-native";
import { Keyboard } from "react-native";
class AuthStore {
  @observable
  auth = false;
  constructor(rootStore) {
    this.rootStore = rootStore;
    AsyncStorage.getItem("user").then(user => {
      console.log(user);
      if (user) {
        this.auth = true;
        this.user = JSON.parse(user);
      }
    });
  }
  @observable
  loading = false;
  @observable
  user = {};
  @observable
  authError = false;

  @observable
  reg_code = null;

  @action
  changeForm = (name, value) => {
    console.log(name, value);
    this.user[name] = value;
  };
  @action
  logout = async () => {
    this.auth = false;
    await AsyncStorage.removeItem("user");
  };
  @action
  registration = async (code, navigate, toast) => {
    this.loading = true;
    Keyboard.dismiss();
    const response = await ApiService.SignUp(code);
    toast.show(response.data.message);

    console.log(response);
    this.loading = false;

    if (response.data.data.success === 1) {
      this.reg_code = response.data.data.code;
      navigate("SwitcherScreen");
    }
  };

  @action
  skipRegistration = async () => {
    try {
      this.loading = true;
      Keyboard.dismiss();

      const params = {};
      params.reg_code = this.reg_code;

      const response = await ApiService.ProfSkip(params);
      console.log(response);

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data })
      );
      this.auth = true;
      this.user = { ...response.data.data };

      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  };

  @action
  changePassword = async ({
    currentPasswordValue,
    newPasswordValue,
    toast
  }) => {
    this.loading = true;
    Keyboard.dismiss();

    const body = {
      id: this.user.id,
      cur_password: currentPasswordValue,
      new_password: newPasswordValue
    };
    console.log(body);
    console.log(this.user);
    const response = await ApiService.PasswordUpdate(body);
    toast.show(response.data.message);
    console.log(response);
    this.loading = false;
  };
  @action
  updateProfile = async toast => {
    this.loading = true;
    Keyboard.dismiss();
    const params = { ...this.user };
    const response = await ApiService.UserUpdate(this.user);
    AsyncStorage.setItem("user", JSON.stringify({ ...this.user }));
    toast.show(response.data.message);
    console.log(response);
    this.loading = false;
  };

  @action
  ProfUpdate = async (navigate, params) => {
    try {
      this.loading = true;
      Keyboard.dismiss();

      params.gender = "";
      params.reg_code = this.reg_code;
      params.image_name = "";

      console.log(params);
      const response = await ApiService.ProfUpdate(params);
      console.log(response);

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data })
      );
      this.auth = true;
      this.user = { ...response.data.data };

      this.loading = false;
    } catch (error) {
      console.error(error);
      this.loading = false;
    }
  };

  @action
  login = async (emailid, password, toast) => {
    this.loading = true;
    Keyboard.dismiss();
    const response = await ApiService.SignIn({ emailid, password });
    console.log(response);
    if (response.data.response == 0) {
      console.log("test");
      this.auth = false;
      this.authError = response.message;
      this.loading = false;
      toast.show(response.data.message);
      return;
    }
    delete response.data.response;
    delete response.data.message;
    delete response.data.data;
    this.auth = true;
    console.log(JSON.stringify({ ...response.data }));
    this.user = { ...response.data };
    await AsyncStorage.setItem("user", JSON.stringify({ ...response.data }));
    this.loading = false;
  };
  @action
  recoveryPassword = async () => {};
}

export default AuthStore;
