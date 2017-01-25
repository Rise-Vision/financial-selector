class PasswordLoginController {
  constructor( authService, $async, $state ) {
    "ngInject";

    const ctrl = this;

    this.login = $async( async ( user ) => {
      try {
        await authService.login( user );
        $state.go( "^.home" );
      } catch ( e ) {
        console.error( e );
        _outputError( e );
      }
    } );

    function _outputError( err ) {
      switch ( err.code ) {
      case "auth/user-not-found":
        ctrl.error = "Error: The user does not exist.";
        break;
      default:
        ctrl.error = err;
        break;
      }
    }
  }
}

export default PasswordLoginController;
