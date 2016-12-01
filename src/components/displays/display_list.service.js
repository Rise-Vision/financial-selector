class displayListService {
  constructor( $window, $firebaseObject, authService ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      attachListTo(target) {
        authService.waitForAuthThen((auth)=>{
          target.displayList = $firebaseObject( root.child( "users" ).child( auth.uid ).child( "displays" ) );
        });
      }
    };
  }
}

export default displayListService

