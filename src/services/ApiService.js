import http from "./http";
import CONFIG from "./config/index";
import {AsyncStorage} from "react-native";
// import { action } from 'mobx';
class ApiService {
  static SignIn(params) {
    /** emailid, password */
    return http.post(CONFIG.API_URL, null, {
      params: { action: "signin", ...params }
    });
  }
  static SignUp(reg_code) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "signup", reg_code }
    });
  }
  static UserDetails() {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "user_details" }
    });
  }
  static async UpcomingRaces(locationId) {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const id = user.id || 1;
    console.log(locationId, id, "qweqweqwewqe");
    return http.post(CONFIG.API_URL, null, {
      params: { action: "upcoming_races", loc_id: locationId, id }
    });
  }
  static async PastRaces(loc_id) {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const id = user.id || 1;
    return http.post(CONFIG.API_URL, null, {
      params: { action: "past_races", id, loc_id }
    });
    id;
  }
  static async AddRace(params) {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const id = user.id || 1;
    return http.post(CONFIG.API_URL, null, {
      params: { action: "add_race", id, ...params }
    });
  }
  static EditRace(params) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "edit_race", ...params }
    });
  }
  static DeleteRace(race_id) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "delete_race", race_id }
    });
  }
  static async AddLocation(params) {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const id = user.id || 1;
    return http.post(CONFIG.API_URL, null, {
      params: { action: "add_location", id, ...params }
    });
  }
  static GetLookUpRunners() {
    //URL_LOOKUP_RUNNERS
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_runners" }
    });
  }
  static GetAllRunners() {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "getRunners" }
    });
  }
  static GetRunnerDetails(id) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "runner_details", id }
    });
  }
  static GetRaceDetails() {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "race_details" }
    });
  }
  static GetRaceResults(params) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_race_results", ...params }
    });
  }
  static PasswordUpdate(params) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "password_update", ...params }
    });
  }
  static UserUpdate(params) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "user_update", ...params, image_name: "" }
    });
  }
  static ProfUpdate(params) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "prof_update", ...params }
    });
  }
  static ProfSkip(params) {
    return http.post(CONFIG.API_URL, null, { params: { action: "prof_skip", ...params } });
  }
  static async GetLocations() {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const user_id = user.id || 1;
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_locations", user_id }
    });
  }
  static GetPrLocations() {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_prlocations" }
    });
  }
  static GetResLocations() {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_reslocations" }
    });
  }
  static GetAllLocations() {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_all_locations" }
    });
  }
  static AddRaceResult(dataForRequest) {
    return http.post(CONFIG.API_URL, null, {
      params: {
        action: "add_race_result",
        lap_by: dataForRequest.lap_by,
        race_id: dataForRequest.race_id,
        position: dataForRequest.position,
        time: dataForRequest.time,
        default_group: dataForRequest.default_group
      }
    });
  }
  static AssignBibCode(dataForRequest) {
    return http.post(CONFIG.API_URL, null, {
      params: {
        action: "assign_bibcode",
        position: dataForRequest.position,
        scan_by: dataForRequest.scan_by,
        race_id: dataForRequest.race_id,
        default_group: dataForRequest.default_group,
        bib_code: dataForRequest.bib_code
      }
    });
  }
  static StartRace(race_id) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "start_race_results", race_id }
    });
  }
  static ResetRace(race_id) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "reset_race", race_id }
    });
  }
  static SaveGroupDetails(default_group, race_id) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "save_group_details", race_id, default_group }
    });
  }
  static AddBibResults(race_id, selectedGroup) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "addbib_results", race_id, selectedGroup }
    });
  }
  static GetAllGroups(race_id) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_allgroups", race_id }
    });
  }
  static async ProgressRace(loc_id) {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const id = user.id || 1;
    return http.post(CONFIG.API_URL, null, {
      params: { action: "progress_races", id, loc_id }
    });
  }
  static FinishRace(race_id) {
    return http.post(CONFIG.API_URL, null, {
      params: { action: "get_race_results", race_id }
    });
  }
}
export default ApiService;
