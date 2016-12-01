class displayListService {
  constructor( $window, $firebaseObject, authService ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      list: $firebaseObject( root.child( "users" ).child( authService.getAuth().uid ).child( "displays" ) )
    };
  }
}

export default displayListService

