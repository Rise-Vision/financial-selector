class NavbarController {
  constructor( $rootScope, $scope, $state, authService ) {
    "ngInject";

    const ctrl = $scope.$ctrl = this;

    ctrl.name = "navbar";

    ctrl.logout = logout;
    ctrl.user = null;

    ctrl.$onInit = () => {
      authService.waitForAuthThen( () => {
        if ( authService.getAuth() ) {
          _populateUser();
        }
      } );
    };

    $rootScope.$on( "userLoggedIn", () => {
      _populateUser();
    } );

    function logout() {
      authService.logout();
      ctrl.user = null;
      $state.go( "home" );
    }

    function _populateUser() {
      let { displayName, email } = authService.getAuth();

      ctrl.user = {
        name: displayName,
        email: email
      };
    }
  }
}

export default NavbarController;
