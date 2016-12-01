class displaySaveService {
  constructor( $window, $firebaseObject, displayValidationService, authService ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      save(displayId) {
        let displays = $firebaseObject( root.child( "users" ).child( authService.getAuth().uid ).child( "displays" ) );
        displays[displayId] = displayValidationService.results()[displayId];
        return displays.$save();
      }
    };
  }
}

export default displaySaveService
