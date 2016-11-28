import _ from "lodash";

class ShowListController {
  constructor($state, authService, $scope, instrumentTypeService, userInstrumentService) {
    "ngInject";

    const ctrl = this;
    const instrumentGroups = instrumentTypeService.getInstrumentGroups();

    ctrl.$state = $state;

    $scope.$watch(getUid, function updateUserList(uid) {
      if (uid) {
        ctrl.userList = userInstrumentService.getUserList(uid, "demo1");
      }
    });

    ctrl.toggleSelection = function addSelection(item) {
      const uid = getUid();
      const member = getMembershipItem(ctrl.userList, item);

      if (member) {
        userInstrumentService.removeFromList(ctrl.userList, member);
      } else {
        userInstrumentService.addToList(uid, "demo1", item);
      }
    };

    ctrl.getMembershipItem = getMembershipItem;

    instrumentGroups.$loaded().then(function updateLookupMap(groups) {
      ctrl.byId = _.keyBy(groups, "id");
    });

    function getUid() {
      // const auth = authService.getAuth();
      // if (auth) {
      //   return auth.uid;
      // }
      //
      // return null;
      return "12345";
    }

    function getMembershipItem(arr, item) {
      if (!arr) {
        return null;
      }
      let c;

      for (c = 0; c < arr.length; c++) {
        if (arr[ c ].$value === item.label) {
          return arr[ c ];
        }
      }
      return null;
    }
  }
}

export default ShowListController;
