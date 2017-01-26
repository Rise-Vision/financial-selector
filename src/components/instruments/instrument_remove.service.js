class instrumentRemoveService {
  constructor( $window, authService, $q, touch ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      remove( instrument, listId ) {
        return $q.all( [
          $q.when( root.child( `lists/${listId}/instruments/${instrument}` ).remove() ),
          $q.when( touch( `lists/${listId}` ) )
        ] );
      }
    };
  }
}

export default instrumentRemoveService
