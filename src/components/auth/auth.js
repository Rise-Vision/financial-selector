import angular from "angular";
import uiRouter from "angular-ui-router";
import authFormGoogleComponent from "./auth-form-google/component";
import AuthService from "./auth.service";
import commonUtils from "../common_utils";

const PROTECTED_PATHS = [ "profile", "lists" ],
  authModule = angular.module( "app.auth", [
    uiRouter,
    commonUtils,
  ] )
.component( "authFormGoogle", authFormGoogleComponent )
.service( "authService", AuthService )
.run( injectFirebaseAuthRedirect )
.run( setupRouteTransitions )
.name;

function injectFirebaseAuthRedirect( $state, authService ) {
  "ngInject";

  authService.firebaseAuthObject.$onAuthStateChanged( function redirectIfNoAccessRights( authData ) {
    if ( !authData && pathIsProtected( $state.current.name ) ) {
      authService.logout();
      authService.redirectIfNotLoggedIn();
    }
  } );
}

function setupRouteTransitions( $state, $transitions, authService ) {
  "ngInject";

  $transitions.onBefore( {
    from: "*",
    to: function to( state ) {
      return pathIsProtected( state.name );
    }
  }, authService.redirectIfNotLoggedIn );
}

function pathIsProtected( stateName ) {
  return PROTECTED_PATHS.indexOf( stateName ) !== -1;
}

export default authModule;
