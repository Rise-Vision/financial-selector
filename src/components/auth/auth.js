import angular from "angular";
import uiRouter from "angular-ui-router";
import authFormGoogleComponent from "./auth-form-google/component";
import AuthService from "./auth.service";
import commonUtils from "../common_utils";
import touchFactory from "./touch.service";
import passwordFormComponent from "./auth-form-password/passwordForm.component";
import passwordLoginComponent from "./auth-form-password/passwordLogin.component";
import passwordSignUpComponent from "./auth-form-password/passwordSignUp.component";
import forgetPasswordComponent from "./auth-form-password/forgetPassword.component";
import needVerificationComponent from "./auth-form-password/needVerification.component";

const UNPROTECTED_PATHS = [ "unauthorized.home",
    "unauthorized.passwordLogin",
    "unauthorized.passwordSignUp",
    "unauthorized.forgetPassword",
    "unauthorized.emailSent" ],
  authModule = angular.module( "app.auth", [
    uiRouter,
    commonUtils,
  ] )
.config( ( $stateProvider ) => {
  "ngInject";
  $stateProvider
  .state( "unauthorized.passwordLogin", {
    url: "/login",
    component: "passwordLogin",
  } )
  .state( "unauthorized.passwordSignUp", {
    url: "/signup",
    component: "passwordSignUp",
    resolve: {
      email: ( $location ) => {
        "ngInject";
        return $location.$$search.email;
      }
    }
  } ).state( "unauthorized.forgetPassword", {
    url: "/forget-password",
    component: "forgetPassword",
  } ).state( "unauthorized.emailSent", {
    url: "/forget-password-sent",
    component: "forgetPassword",
    resolve: {
      sent: () => true,
    }
  } ).state( "unauthorized.needVerification", {
    url: "/need-verification",
    component: "needVerification",
  } );
} )
.component( "passwordForm", passwordFormComponent )
.component( "passwordSignUp", passwordSignUpComponent )
.component( "forgetPassword", forgetPasswordComponent )
.component( "needVerification", needVerificationComponent )
.component( "passwordLogin", passwordLoginComponent )
.component( "authFormGoogle", authFormGoogleComponent )
.service( "authService", AuthService )
.factory( "touch", touchFactory )
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
  }, () => {
    authService.redirectIfNotLoggedIn();
  } );
}

function pathIsProtected( stateName ) {
  // assumes protection by default
  return UNPROTECTED_PATHS.indexOf( stateName ) < 0;
}

export default authModule;
