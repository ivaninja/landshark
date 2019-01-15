import RunnersStore from "./LookupRunnersStore";
import RunnerDetailStore from "./RunnerDetailStore";
import LocationStore from "./LocationsStore";
import UpcomingRacesStore from "./UpcomingRacesStore";
import ScheduleRaceStore from "./ScheduleRace";
import TestStore from "./TestStore";
import AuthStore from "./AuthStore";
import StartRaceStore from "./StartRace";
import ResultStore from "./ResultStore";
import AssignBib from "./AssignBib";
import RaceInProgressStore from "./RacesInProgressStore";
import EditRaceStore from "./EditRaceStore";

class RootStore {
  constructor() {
    this.RunnersStore = new RunnersStore(this);
    this.RunnerDetailStore = new RunnerDetailStore(this);
    this.LocationStore = new LocationStore(this);
    this.UpcomingRacesStore = new UpcomingRacesStore(this);
    this.ScheduleRaceStore = new ScheduleRaceStore(this);
    this.TestStore = new TestStore(this);
    this.AuthStore = new AuthStore(this);
    this.StartRaceStore = new StartRaceStore(this);
    this.ResultStore = new ResultStore(this);
    this.AssignBibStore = new AssignBib(this);
    this.RaceInProgressStore = new RaceInProgressStore(this);
    this.EditRaceStore = new EditRaceStore(this);
  }
}
export default RootStore;
