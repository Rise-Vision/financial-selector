class instrumentListService {
  constructor( $window, $firebaseObject, authService ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      attachListTo( target ) {
        authService.waitForAuthThen( () => {
          target.instrumentList = $firebaseObject( root.child( `lists/${target.listId}` ) );
        } );
      }
    };
  }
}

export default instrumentListService
