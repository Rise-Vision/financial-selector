class NavbarController {
  constructor( $scope, $state, authService ) {
    "ngInject";

    const ctrl = $scope.$ctrl = this;

    var cancelWatch;

    ctrl.name = "navbar";

    ctrl.logout = logout;
    ctrl.user = null;

    authService.firebaseAuthObject.$onAuthStateChanged( ( user ) => {
      if ( user ) {
        _populateUser();
      }
    } );

    function logout() {
      authService.logout();
      ctrl.user = null;
    }

    async function _populateUser() {
      let { displayName, email } = await authService.getAuth();

      ctrl.user = {
        name: displayName,
        email: email
      };

      if ( cancelWatch ) {
        // cancel previous watch
        cancelWatch;
      }
      cancelWatch = $scope.$watch( "$ctrl.user", ( ) => {
        $state.go( $state.$current, null, { reload: true } );
      }, true );
    }
  }
}

export default NavbarController;
