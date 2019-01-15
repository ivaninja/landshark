import { observable, computed, action, toJS } from "mobx";
import ApiService from "../services/ApiService";
class TestStore {
  constructor(rootStore) {
    // super();
    this.rootStore = rootStore;
  }

  @observable
  testValue = 1;

  @action
  updTest = () => {
    console.log("sadasd");
    this.testValue += 5;
    console.log("___________-");
  };
  @computed
  get up100() {
    return this.testValue + 100;
  }
}

export default TestStore;
