import { observable, action, toJS } from "mobx";
import ApiService from "../services/ApiService";
class RaceInProgressStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  loading = true;
  @observable
  inProgressRaces = [];
  @observable
  dataWasChanged = false;

  @action
  closeFlag = () => {
    this.dataWasChanged = false;
  };

  @action
  getRaceInProgress = async payload => {
    if (payload) {
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
        const response = await ApiService.ProgressRace(locations);
        console.log(response, "select locations");
        this.inProgressRaces = response.data.data.reverse();
        this.loading = false;
        this.dataWasChanged = true;
      } catch (e) {
        this.loading = false;
      }
    } else {
      this.loading = true;
      const allLocations = toJS(this.rootStore.LocationStore.locations);
      console.log(allLocations);
      const locations = "";
      console.log(locations);
      try {
        const response = await ApiService.ProgressRace(locations);
        console.log(response);
        this.inProgressRaces = response.data.data.reverse();
        this.loading = false;
        this.dataWasChanged = true;
      } catch (e) {
        this.loading = false;
      }
    }
  };
}

export default RaceInProgressStore;
