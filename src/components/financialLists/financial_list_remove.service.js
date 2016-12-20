class financialListRemoveService {
  constructor( $window ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      remove( listId, displayId ) {
        let update = {};

        update[ "/lists/" + listId ] = null;
        update[ "/displays/" + displayId + "/lists/" + listId ] = null;

        return root.update( update )
      }
    };
  }
}

export default financialListRemoveService
