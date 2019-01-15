import { observable, action } from "mobx";
import ApiService from "../services/ApiService";
import { Toast } from "native-base";
import Loading from "../components/Loading";

class EditRaceStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  loading = false;

  @action
  deleteRace = async (race, navigateToDashboard) => {
    this.loading = true;
    try {
      console.log("delete race request")
      const {data} = ApiService.DeleteRace(race.id);
      console.log(data, "delete race success")

      navigateToDashboard();
      Toast.show({
        text: `Race "${race.race_name}" was removed`,
        buttonText: "Okay"
      });
      this.loading = false;
    } catch (e) {
      Toast.show({
        text: "An error occurred!",
        buttonText: "Okay"
      });
      console.log(e)
      this.loading = false;
    }
  }

  @action
  editRace = async(params, navigateToDashboard) => {
    this.loading = true;
    try {
      console.log("edit race request")
      const {data} = ApiService.EditRace(params);
      console.log(data, "edit race success")

      navigateToDashboard();
      Toast.show({
        text: `Race "${race.race_name}" was removed`,
        buttonText: "Okay"
      });
      this.loading = false;
    } catch (e) {
      console.log(e)
      this.loading = false;
    }
  }
}

export default EditRaceStore;
