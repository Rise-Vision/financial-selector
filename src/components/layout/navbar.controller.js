class NavbarController {
  constructor( $scope, $state, authService ) {
    "ngInject";

    const ctrl = $scope.$ctrl = this;

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
      $state.go( $state.$current, null, { reload: true } );
    }

    async function _populateUser() {
      let { displayName, email } = await authService.getAuth();

      ctrl.user = {
        name: displayName,
        email: email
      };
    }
  }
}

export default NavbarController;
