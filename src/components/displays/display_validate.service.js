class displayValidationService {
  constructor( $http, displayValidationURL, $q ) {
    "ngInject";

    let cache = {};

    return {
      results() {
        return cache;
      },

      async validateAndGet( displayId ) {
        await this.validate( displayId );
        return cache[ displayId ];
      },

      validate( displayId ) {
        if ( Object.keys( cache ).includes( displayId ) ) {
          return $q.when( true );
        }

        return $http.get( displayValidationURL.replace( "DISPLAYID", displayId ) )
        .then( ( resp ) => {
          cache[ displayId ] = resp.data && resp.data.item;
          return cache[ displayId ];
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
