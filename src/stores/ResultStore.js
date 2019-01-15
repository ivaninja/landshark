import { observable, action, toJS } from "mobx";
import ApiService from "../services/ApiService";
class ResultStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  loading = true;
  @observable
  detailLoading = true;
  @observable
  detail = null;
  @observable
  resultRaces = [];
  @observable
  page = 1;
  itemsPerPage = 50;
  @observable
  dataWasChanged = false;

  @action
  closeFlag = () => {
    this.dataWasChanged = false;
  };

  @action
  getResults = async payload => {
    this.loading = true;
    let locations = [];
    if (payload) {
      this.loading = true;
      locations = payload
        .reduce((acc, nextItem) => {
          if (nextItem.checked) {
            acc += "," + nextItem.value;
          }

          return acc;
        }, "")
        .substr(1);
    } else {
      const allLocations = toJS(this.rootStore.LocationStore.locations);
      console.log(allLocations);
      locations = "";
    }
    try {
      this.loading = true;
      console.log(1);
      const response = await ApiService.PastRaces(locations);
      this.allResults = response.data.data;
      this.resultRaces = response.data.data.reverse().splice(
        (this.page - 1) * this.itemsPerPage,
        this.itemsPerPage * this.page
      );
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  };
  @action
  goToNextPage = () => {
    this.page++;
    const nextPageResults = this.allResults.slice(
      (this.page - 1) * this.itemsPerPage,
      this.itemsPerPage * this.page
    );

    this.resultRaces = [...this.resultRaces.concat(nextPageResults)];
  };
  @action
  getResultById = async race_id => {
    this.detailLoading = true;
    console.log("ssssssssssssssssss");
    const resp = await ApiService.GetRaceResults({ race_id });
    console.log(resp);
    console.log("ssssssssssssssssss");

    this.detail = resp.data.data;
    this.detailLoading = false;
  };
}

export default ResultStore;
