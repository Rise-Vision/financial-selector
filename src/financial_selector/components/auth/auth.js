import angular from 'angular';
import uiRouter from 'angular-ui-router';
import authFormPasswordComponent from './auth-form-password/component';
import authFormGoogleComponent from './auth-form-google/component';
import AuthService from './auth.service';
import loginTemplate from './login.html';
import registerTemplate from './register.html';
import AuthController from './auth.controller';

const PROTECTED_PATHS = ['profile'];

const authModule = angular.module('app.auth', [
  uiRouter,
])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('auth', {
      url: '/auth',
      component: 'auth',
    });
})
.config(setupRoutes)
.component('authFormPassword', authFormPasswordComponent)
.component('authFormGoogle', authFormGoogleComponent)
.service('authService', AuthService)
.run(injectFirebaseAuthRedirect)
.run(setupRouteTransitions)

.name;

function setupRoutes($stateProvider) {
  'ngInject';

  $stateProvider.state('register', {
    url: '/register',
    template: registerTemplate,
    controller: AuthController,
  });
  $stateProvider.state('login', {
    url: '/login',
    template: loginTemplate,
    controller: AuthController,
  });
}

function injectFirebaseAuthRedirect($state, authService) {
  'ngInject';

  authService.firebaseAuthObject.$onAuthStateChanged(
    function redirectIfNoAccessRights(authData) {
      if (!authData && pathIsProtected($state.current.name)) {
        authService.logout();
        authService.redirectIfNotLoggedIn();
      }
    });
}

function setupRouteTransitions($state, $transitions, authService) {
  'ngInject';

  $transitions.onBefore({
    from: '*',
    to: function to(state) { return pathIsProtected(state.name); } },
    authService.redirectIfNotLoggedIn);
}

function pathIsProtected(stateName) {
  return PROTECTED_PATHS.indexOf(stateName) !== -1;
}

export default authModule;
