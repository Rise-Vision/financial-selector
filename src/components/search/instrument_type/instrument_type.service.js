import initData from "./init_data";
import Firebase from "firebase";

class InstrumentTypeService {
  constructor($firebaseArray) {
    "ngInject";

    const root = Firebase.database().ref();
    const instrumentGroups = root.child("instrumentGroups");
    const service = {
      getInstrumentGroups,
      initialize,
    };

    return service;

    function initialize() {
      const array = $firebaseArray(instrumentGroups);

      array.$loaded().then(ensureInitialized);

      function ensureInitialized(arr) {
        if (arr.length === 0) {
          initData.instrumentGroups.forEach(function addGroup(g) {
            arr.$add(g);
          });
        }
      }
    }

    function getInstrumentGroups() {
      return $firebaseArray(instrumentGroups);
    }
  }
}

export default InstrumentTypeService;
