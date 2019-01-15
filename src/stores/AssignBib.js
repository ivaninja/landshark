import { observable, action } from "mobx";
import ApiService from "../services/ApiService";
import {Toast} from "native-base";

class AssignBib {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable
  loading = false;

  @observable
  countOfGroups = null;

  @observable
  selectedGroupData = [];

  @observable
  dataWasChanged = false;

  @action
  closeFlag = () => {
    this.dataWasChanged = false;
  }

  @action
  resetAssignBib = () => {
    this.loading = true;

    this.countOfGroups = null;

    this.selectedGroupData = [];
  };

  @action
  getAllGroups = async race_id => {
    this.loading = true;
    try {
      console.log(race_id);
      const { data } = await ApiService.GetAllGroups(race_id);

      this.loading = false;
      this.countOfGroups = data.data - 1;
      console.log(data);
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  };

  @action
  getAddBibResults = async (race_id, selectedGroup) => {
    this.loading = true;

    try {
      console.log(race_id, selectedGroup, "getAddBibResults req");
      const { data } = await ApiService.AddBibResults(race_id, selectedGroup);
      console.log(data.data.runner_det, "getAddBibResults success");

      this.selectedGroupData = data.data.runner_det;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  };

  @action
  assignBibCode = async dataForRequest => {
    this.loading = true;
    try {
      console.log(dataForRequest, "assignBibCode");
      const { data } = await ApiService.AssignBibCode(dataForRequest);
      console.log(data, "assignBibCode success");

      if (!data.data.firstname) {
        Toast.show({
          text: "Wrong bib!",
          buttonText: "Okay"
        });
        this.loading = false;
        return;
      }

      const indexOfMember = Number(dataForRequest.indexOfMember);
      const groupToChange = [...this.selectedGroupData]

      groupToChange[indexOfMember].firstname = data.data.firstname;
      groupToChange[indexOfMember].lastname = data.data.lastname;
      groupToChange[indexOfMember].bib_code = dataForRequest.bib_code;

      this.selectedGroupData = groupToChange;
      this.dataWasChanged = true;
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  };

  @action
  FinishRace = async (race_id, navigate) => {
    this.loading = true;

    try {
      const { data } = await ApiService.FinishRace(race_id);
      console.log(data, "finish race")

      this.loading = false;
      
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  };
}

export default AssignBib;
