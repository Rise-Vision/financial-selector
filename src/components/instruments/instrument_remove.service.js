class instrumentRemoveService {
  constructor( $window, authService, $q ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      remove( instrument, listId ) {
        return $q.when( root.child( `lists/${listId}/instruments/${instrument}` ).remove() );
      }
    };
  }
}

export default instrumentRemoveService
