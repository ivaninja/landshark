import { observable, action, toJS } from "mobx";
import ApiService from "../services/ApiService";
import LocationStore from "./LocationsStore";
class UpcomingRacesStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  loading = false;
  @observable
  upcomingRaces = [];
  @observable
  dataWasChanged = false;

  @action
  closeFlag = () => {
    this.dataWasChanged = false;
  };

  @action
  getUpcomingRaces = async (payload) => {
    this.loading = true;
    if(payload) {

      this.loading = true;

      const locations = payload
        .reduce((acc, nextItem) => {
          if (nextItem.checked) {
            acc += "," + nextItem.value;
          }

          return acc;
        }, "")
        .substr(1);

      try {
        const response = await ApiService.UpcomingRaces(locations);
        console.log(response, "select locations");
        this.upcomingRaces = response.data.data.reverse();
        this.loading = false;
        this.dataWasChanged = true;
      } catch (e) {
        console.log("ERROR")
        this.loading = false;
      }
    } else {
      this.loading = true;
      const allLocations = toJS(this.rootStore.LocationStore.locations);
      console.log(allLocations);
      const locations = "";
      console.log(locations);
      try {
        const response = await ApiService.UpcomingRaces(locations);
        console.log(response);
        this.upcomingRaces = response.data.data.reverse();
        this.loading = false;
        this.dataWasChanged = true;
      } catch (e) {
        console.log("ERROR")
        this.loading = false;
      }
    }
  };
}

export default UpcomingRacesStore;
