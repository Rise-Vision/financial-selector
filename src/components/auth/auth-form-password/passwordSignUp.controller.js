class PasswordSignUpController {
  constructor( authService, $state, $async ) {
    "ngInject";

    const ctrl = this;

    this.register = $async( async ( user ) => {
      try {
        await authService.register( user );
        await authService.login( user );
        await authService.sendEmailVerification();
        await authService.redirectIfNotLoggedIn();
        $state.go( "displays" );
      } catch ( e ) {
        console.error( e );
        _outputError( e );
      }
    } );

    function _outputError( err ) {
      ctrl.error = err;
    }
  }
}

export default PasswordSignUpController;
