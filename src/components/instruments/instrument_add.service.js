class financialListAddService {
  constructor( $window, authService, $q ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      add( instrumentsToAdd, listId ) {
        let deferred = $q.defer(),
          addData = instrumentsToAdd.reduce( ( obj, el ) => {
            return Object.assign( obj, {
              [ encodeURIComponent( el.symbol ).replace( /\./g, "%2E" ) ]: {
                category: el.category,
                name: el.name,
                symbol: el.symbol,
              }
            } );
          }, {} );

        root.child( `lists/${listId}/instruments` ).update( addData )
        .then( () => deferred.resolve() )
        .catch( ( err ) => deferred.reject( err ) );

        return deferred.promise;
      }
    };
  }
}

export default financialListAddService
