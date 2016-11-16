class AuthController {
  constructor( authService, $scope, $state ) {
    "ngInject";

    const ctrl = $scope.$ctrl = this;

    ctrl.error = null;

    ctrl.register = registerWithPassword;
    ctrl.loginWithPassword = loginWithPassword;
    ctrl.loginWithGoogle = loginWithGoogle;

    function registerWithPassword( user ) {
      return authService.register( user ).then( function loginWithPwd() {
        return ctrl.loginWithPassword( user );
      } ).then( function sendWelcomeEmail() {
        // return authService.sendWelcomeEmail(user.email);
      } ).catch( showError );
    }

    function loginWithPassword( user ) {
      return authService.login( user ).then( switchToProfile ).catch( showError );
    }

    function loginWithGoogle() {
      return authService.loginWithGoogle().then( switchToProfile ).catch( showError );
    }

    function switchToProfile() {
      $state.go( "profile" );
    }

    function showError( error ) {
      ctrl.error = error;
    }
  }
}

export default AuthController;
