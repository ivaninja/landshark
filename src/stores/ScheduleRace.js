import { observable, computed, action, toJS } from "mobx";
import ApiService from "../services/ApiService";
import { Keyboard } from "react-native";
class ScheduleRaceStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  newRace = { race_name: "test", name: "test2" };

  @action
  changeRace = (name, value) => {
    // console.log(name, value);
    console.log(this.newRace);
    console.log("************");
    this.newRace = { name: value };
    // console.log(this.newRace);
  };
  @action
  scheduleRace = async (params, toast) => {
    console.log(params);
    Keyboard.dismiss();
    const resp = await ApiService.AddRace(params);
    console.log(resp);
    toast.show(resp.data.message);
  };

  @observable
  price = 0;
  @observable
  amount = 1;
  @action
  changeTest = () => {
    price = 4;
  };
  @computed
  get total() {
    console.log("jhere");
    return this.price * this.amount;
  }
}

export default ScheduleRaceStore;
