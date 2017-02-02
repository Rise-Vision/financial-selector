class NavbarController {
  constructor( $scope, $state, authService ) {
    "ngInject";

    this.logout = logout;
    this.user = null;

    authService.firebaseAuthObject.$onAuthStateChanged( ( user ) => {
      this.user = user;
      if ( user ) {
        this.user.name = user.displayName;
      }
    } );

    function logout() {
      authService.logout();
      $state.go( $state.$current, null, { reload: true } );
    }
  }
}

export default NavbarController;
