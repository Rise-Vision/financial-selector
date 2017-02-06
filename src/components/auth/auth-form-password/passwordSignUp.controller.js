class PasswordSignUpController {
  constructor( authService, $state, $async ) {
    "ngInject";

    const ctrl = this;

    this.register = $async( async ( user ) => {
      try {
        await authService.register( user );
        await authService.login( user );
        $state.go( "unauthorized.home" );
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
