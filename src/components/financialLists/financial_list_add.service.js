class financialListAddService {
  constructor( $window, authService, $q, encodeForFirebaseProp ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      add( name, displayId = "tempDisplayId" ) {
        let deferred = $q.defer(),
          key = root.child( "lists" ).push().key,
          addData = {};

        addData[ "/lists/" + key ] = {
          listName: name,
          instruments: {},
          creationDate: $window.firebase.database.ServerValue.TIMESTAMP,
          changeDate: $window.firebase.database.ServerValue.TIMESTAMP,
          modifiedBy: encodeForFirebaseProp( $window.firebase.auth().currentUser.email )
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
