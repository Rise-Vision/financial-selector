class financialListAddService {
  constructor( $window, authService, $q ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      add( name, displayId = "tempDisplayId" ) {
        let deferred = $q.defer(),
          key = root.child( "lists" ).push().key,
          email = authService.getMyEmail(),
          addData = {};

        addData[ "/lists/" + key ] = {
          listName: name,
          displayId: displayId,
          instruments: {},
          creationDate: $window.firebase.database.ServerValue.TIMESTAMP,
          changeDate: $window.firebase.database.ServerValue.TIMESTAMP,
          modifiedBy: email,
        };

        addData[ "/displays/" + displayId + "/lists/" + key ] = true;

        root.update( addData )
        .then( () => deferred.resolve() )
        .catch( ( err ) => deferred.reject( err ) );

        return deferred.promise;
      }
    };
  }
}

export default financialListAddService
