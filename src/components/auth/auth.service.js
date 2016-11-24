/*eslint no-console: ["error", { allow: ["log"] }] */

import Firebase from "firebase";

class AuthService {
  constructor($firebaseAuth, $state) {
    "ngInject";
    const firebaseAuthObject = $firebaseAuth();
    let _loginRedirectTransitioning = false;

    return {
      register,
      login,
      loginWithGoogle,
      logout,
      getAuth,
      firebaseAuthObject,
      redirectIfNotLoggedIn,
    };

    function register(user) {
      return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }

    function login(user) {
      return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
    }

    function loginWithGoogle() {
      const provider = new Firebase.auth.GoogleAuthProvider();

      provider.addScope("https://www.googleapis.com/auth/userinfo.email");

      return firebaseAuthObject.$signInWithPopup(provider);
    }

    function logout() {
      firebaseAuthObject.$signOut();
    }

    function getAuth() {
      return firebaseAuthObject.$getAuth();
    }

    function redirectIfNotLoggedIn() {
      if (!_loginRedirectTransitioning) {
        _loginRedirectTransitioning = true;
        firebaseAuthObject.$waitForSignIn().then(function markAndGoToLogin() {
          if (!getAuth()) {
            $state.go("home").then(function markOffTransition() {
              _loginRedirectTransitioning = false;
            });
          }
        });
      }
    }
  }
}

export default AuthService;
