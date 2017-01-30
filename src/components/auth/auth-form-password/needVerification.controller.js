class NeedVerificationController {
  constructor( authService, $async, $scope, $state ) {
    "ngInject";

    this.$onInit = $async( async () => {
      this.auth = await authService.getAuth() || {};


      const cancel = authService.firebaseAuthObject.$onAuthStateChanged( ( auth = {} ) => {
        const { emailVerified } = auth;

        if ( emailVerified ) {
          cancel();
          $state.go( "displays" );
        }
      }, true );
    } );

    this.resend = () => {
      authService.sendEmailVerification();
      this.sent = true;
    };
  }
}

export default NeedVerificationController;
