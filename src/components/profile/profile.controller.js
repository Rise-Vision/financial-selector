class ProfileController {
  constructor( authService ) {
    "ngInject";

    const ctrl = this;

    ctrl.authObj = authService.firebaseAuthObject.$getAuth();
  }
}

export default ProfileController;
