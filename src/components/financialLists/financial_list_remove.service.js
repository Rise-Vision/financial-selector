class financialListRemoveService {
  constructor( $window, authService, $q ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      remove( listId, displayId ) {
        let deferred = $q.defer(),
          update = {};

        update[ "/lists/" + listId ] = null;
        update[ "/displays/" + displayId + "/lists/" + listId ] = null;

        root.update( update )
        .then( () => deferred.resolve() )
        .catch( ( err ) => deferred.reject( err ) );

        return deferred.promise;
      }
    };
  }
}

export default financialListRemoveService
