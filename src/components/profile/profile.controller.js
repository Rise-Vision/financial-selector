class ProfileController {
  constructor( authService ) {
    "ngInject";

    const ctrl = this;

    authService.firebaseAuthObject.$waitForSignIn().then( assignAuth ).then( authService.redirectIfNotLoggedIn );

    function assignAuth() {
      ctrl.authObj = authService.firebaseAuthObject.$getAuth();
    }
  }
}

export default ProfileController;
