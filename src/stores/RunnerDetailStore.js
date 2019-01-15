import { observable, action } from "mobx";
import ApiService from "../services/ApiService";

class RunnerDetailStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  allRunners = [];
  @observable
  page = 1;
  itemsPerPage = 100;
  @observable
  loading = true;
  @observable
  runner = {};

  @action
  getRunner = async id => {
    this.loading = true;
    try {
      const response = await ApiService.GetRunnerDetails(id);
      console.log(response);
      this.runner = response.data.data;
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  };
}

export default RunnerDetailStore;
