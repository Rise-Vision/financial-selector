class HomeController {
  constructor(authService, $scope, $state) {
    "ngInject";

    const ctrl = $scope.$ctrl = this;
    this.name = "home";

    ctrl.error = null;

    ctrl.loginWithGoogle = loginWithGoogle;

    function loginWithGoogle() {
      return authService.loginWithGoogle().then(switchToDisplays).catch(showError);
    }

    function switchToDisplays() {
      $state.go("displays");
    }

    function showError(error) {
      ctrl.error = error;
    }
  }
}

export default HomeController;
