import { observable, action, reaction } from "mobx";
import ApiService from "../services/ApiService";

class RunnersStore {
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
  runners = [];
  @observable
  auth = true;
  @observable
  searchQuery = "";

  searchReaction = reaction(
    () => this.searchQuery,
    searchQuery => {
      this.loading = true;
      console.log(searchQuery);
      if (!searchQuery) {
        this.loading = false;
        return (this.runners = this.allRunners.slice(0, this.itemsPerPage));
      }
      this.runners = this.allRunners.filter(runner => {
        const searchReg = new RegExp(searchQuery, "i");
        const resName = (runner.firstname + " " + runner.lastname).match(
          searchReg
        );
        const resBib = runner.bib_code.toString().match(searchReg);
        console.log(resName);
        return resName || resBib;
      });
      this.loading = false;
      // const test = this.allRunners.filter(runner => runner.bib == 228 );
      // console.log(test);
    },
    { delay: 500 }
  );

  @action
  getRunners = async () => {
    this.loading = true;
    try {
      const response = await ApiService.GetLookUpRunners();
      console.log(response.data.data);
      this.allRunners = response.data.data;
      this.runners = this.allRunners.slice(0, this.itemsPerPage);

      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  };
  @action
  goToNextPage = () => {
    this.page++;
    const nextPageRunners = this.allRunners.slice(
      (this.page - 1) * this.itemsPerPage,
      this.itemsPerPage * this.page
    );
    console.log(
      (this.page - 1) * this.itemsPerPage,
      this.itemsPerPage * this.page
    );
    this.runners = [...this.runners.concat(nextPageRunners)];
    console.log(this.runners.length);
  };
  @action
  logout = () => (this.auth = false);
  @action
  login = () => (this.auth = true);
}

export default RunnersStore;
