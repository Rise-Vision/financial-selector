class ForgetPasswordController {
  constructor( firebase, $state ) {
    "ngInject";

    this.sendPasswordResetEmail = () => {
      if ( this.email ) {
        firebase.auth().sendPasswordResetEmail( this.email );
        $state.go( "^.emailSent" );
      }
    }
  }
}

export default ForgetPasswordController;
