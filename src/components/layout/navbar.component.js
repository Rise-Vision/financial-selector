import template from "./navbar.html";

const navBarComponent = {
  restrict: "E",
  template,
  bindings: {},
  controller: NavbarController,
};

function NavbarController( $state, authService ) {
  "ngInject";

  const ctrl = this;

  ctrl.isLoggedIn = authService.getAuth;
  ctrl.logout = logout;

  function logout() {
    authService.logout();
    $state.go( "home" );
  }
}

export default navBarComponent;
