import { observable, action } from "mobx";
import ApiService from "../services/ApiService";
import { Keyboard } from "react-native";

class LocationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.getLocations();
  }

  @observable
  loading = false;

  @observable
  locations = [];

  @action
  addLocation = async (params, toast) => {
    this.loading = true;
    Keyboard.dismiss();
    try {
      const resp = await ApiService.AddLocation(params);
      console.log(resp);
      toast.show(resp.data.message);
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  };
  @action
  getLocations = async id => {
    this.loading = true;
    try {
      const response = await ApiService.GetAllLocations();
      console.log(response);
      this.locations = response.data.data.map(loc => ({
        label: loc.name,
        value: loc.id
      }));
      console.log(this.locations);
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  };
}

export default LocationStore;
