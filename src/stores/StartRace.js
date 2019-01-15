import { observable, computed, action, toJS } from "mobx";
import ApiService from "../services/ApiService";
import moment from "moment";
import { Toast } from "native-base";

class StartRaceStore {
  constructor(rootStore) {
    // super();
    this.rootStore = rootStore;
  }
  timer;
  @observable
  laps = [];
  @observable
  stoppedTime = {
    miliseconds: 0,
    seconds: 0,
    minutes: 0
  };
  @observable
  miliseconds = 0;
  @observable
  seconds = 0;
  @observable
  minutes = 0;
  @observable
  place = 0;
  @observable
  dataWasChanged = false;

  @observable
  groupNumber = null;
  @observable
  loading = false;

  @action
  closeFlag = () => {
    this.dataWasChanged = false;
  };

  @action
  addLap = dataForRequest => {
    if (!this.timer) return;

    const position = this.place + 1;
    const time = `${this.minutes
      .toString()
      .padStart(1, 0)}:${this.seconds
      .toString()
      .padStart(2, 0)}:${this.miliseconds.toString().padStart(3, 0)}`;

    dataForRequest.position = position;
    dataForRequest.time = time;

    try {
      console.log("lap request");
      const response = ApiService.AddRaceResult(dataForRequest).then(data =>
        console.log(data)
      );
      console.log(response, "lap success");

      this.laps.unshift({
        place: position,
        time: time,
        memberData: { fullName: null, bib: null },
        existMemberData: false
      });

      this.place += 1;
      this.dataWasChanged = true;
    } catch (e) {
      console.log(e);
    }
  };
  @action
  startTimer = () => {
    if (this.timer) return;
    const now = moment();

    const delay = 10;
    this.timer = setInterval(() => {
      const delayedNow = moment()
        // .add(this.stoppedTime.miliseconds, "milliseconds")
        .add(this.stoppedTime.seconds, "seconds")
        .add(this.stoppedTime.minutes, "minutes");
      const delay = delayedNow.diff(now);
      const duration = moment.duration(delay);
      this.miliseconds = duration._data.milliseconds;
      this.seconds = duration._data.seconds;
      this.minutes = duration._data.minutes;
    }, delay);
  };
  @action
  stopTimer = () => {
    clearInterval(this.timer);
    this.stoppedTime = {
      miliseconds: this.miliseconds,
      seconds: this.seconds,
      minutes: this.minutes
    };
    this.timer = null;
  };
  @action
  resetRace = async (race_id) => {
    this.loading = true;
    try {
      console.log(race_id, "reset req");
      const { data } = await ApiService.ResetRace(race_id);
      console.log(data, "reset success");

      clearInterval(this.timer);
      this.miliseconds = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.stoppedTime = {
        miliseconds: this.miliseconds,
        seconds: this.seconds,
        minutes: this.minutes
      };
      this.timer = null;
      this.laps = [];
      this.place = 0;
      this.groupNumber = 1;
      this.loading = false;
    } catch (e) {
      Toast.show({
        text: "An error occurred!",
        buttonText: "Okay"
      });
      console.log(e);
      this.loading = false;
    }
  };

  @action
  clearData = () => {
    clearInterval(this.timer);
      this.miliseconds = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.stoppedTime = {
        miliseconds: this.miliseconds,
        seconds: this.seconds,
        minutes: this.minutes
      };
      this.timer = null;
      this.laps = [];
      this.place = 0;
  }

  @action
  getAllGroups = async race_id => {
    this.loading = true;
    try {
      console.log(race_id);
      const { data } = await ApiService.GetAllGroups(race_id);
      this.groupNumber = data.data;
      console.log(data.data);
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  };

  @action
  startRace = async race_id => {
    this.loading = true;
    try {
      console.log("startRace");
      const { data } = await ApiService.StartRace(race_id);
      console.log(data);
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  };

  @action
  assignBibCode = async dataForRequest => {
    this.loading = true;
    try {
      console.log("assignBibCode");
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

      this.laps[indexOfMember].memberData = {
        fullName: `${data.data.firstname} ${data.data.lastname}`,
        bib: dataForRequest.bib_code,
        data: data.data
      };
      this.laps[indexOfMember].existMemberData = true;

      this.dataWasChanged = true;
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  };

  @action
  saveGroupDetails = async (default_group, race_id) => {
    this.loading = true;
    try {
      console.log("save group request");
      const { data } = ApiService.SaveGroupDetails(default_group, race_id).then(
        data => console.log(data)
      );
      console.log(data, "save group request success");

      this.groupNumber += 1;

      this.clearData();
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  };
}

export default StartRaceStore;
