class SearchController {
  constructor(authService, $scope, $state) {
    'ngInject';

    const ctrl = this;

    ctrl.query = null;
    ctrl.$state = $state;


    authService.firebaseAuthObject.$waitForSignIn()
    .then(()=> {ctrl.authObj = authService.firebaseAuthObject.$getAuth();})
    .then(authService.redirectIfNotLoggedIn);

    $scope.$watch('$ctrl.query', function maybeSwitch(newVal) {
      if (newVal) {
        $state.go('lists.search', { q: newVal });
      } else {
        $state.go('lists');
      }
    });
  }
}

export default SearchController;
