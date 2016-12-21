import angular from "angular";
import uiRouter from "angular-ui-router";
import authFormGoogleComponent from "./auth-form-google/component";
import AuthService from "./auth.service";

const PROTECTED_PATHS = [ "profile", "lists" ],
  authModule = angular.module( "app.auth", [
    uiRouter,
  ] )
.component( "authFormGoogle", authFormGoogleComponent )
.service( "authService", AuthService )
.constant( "emailToUserKey", emailToUserKey )
.constant( "userKeyToEmail", userKeyToEmail )
.run( injectFirebaseAuthRedirect )
.run( setupRouteTransitions )
.name;


function emailToUserKey( email ) {
  return encodeURIComponent( email ).replace( /\./g, "%2E" );
}

function userKeyToEmail( path ) {
  return decodeURIComponent( path );
}

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
