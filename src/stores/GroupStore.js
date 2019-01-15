import { observable, action } from "mobx";
import ApiService from "../services/ApiService";
import { AsyncStorage } from "react-native";
import { Keyboard } from "react-native";
class AuthStore {
  @observable
  auth = false;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

export default AuthStore;
