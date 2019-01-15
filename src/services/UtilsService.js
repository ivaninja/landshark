class UtilsService {
  static getGenderByRaceType(type) {
    switch (type) {
      case 1:
        return "Male";
      case 2:
        return "Female";
      case 0:
        return "Coed";
      default:
        return "Coed";
    }
  }
}
export default UtilsService;
