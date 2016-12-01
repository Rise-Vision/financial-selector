class displayValidationService {
  constructor( $http, displayValidationURL ) {
    "ngInject";

    let cache = {};

    return {
      results() {
        return cache;
      },

      validate( displayId ) {
        if ( Object.keys( cache ).includes( displayId ) ) {
          return;
        }

        return $http.get( displayValidationURL.replace( "DISPLAYID", displayId ) )
        .then( ( resp ) => {
          cache[ displayId ] = resp.data && resp.data.item;
        } )
        .catch( () => {
          cache[ displayId ] = false;
          return Promise.reject( Error( `Could not validate ${displayId}.` ) );
        } );
      }
    };
  }
}

export default displayValidationService
