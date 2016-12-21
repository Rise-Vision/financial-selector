/*eslint no-console: ["error", { allow: ["log"] }] */

import Firebase from "firebase";

class AuthService {
  constructor( $firebaseAuth, firebase,
    $firebaseObject, $state, emailToUserKey ) {
    "ngInject";
    const root = firebase.database().ref();
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
      waitForAuthThen,
      getMyUserId,
      amIRiseAdmin,
    };

    function register( user ) {
      return firebaseAuthObject.$createUserWithEmailAndPassword( user.email, user.password );
    }

    function login( user ) {
      return firebaseAuthObject.$signInWithEmailAndPassword( user.email, user.password );
    }

    function loginWithGoogle() {
      const provider = new Firebase.auth.GoogleAuthProvider();

      provider.addScope( "https://www.googleapis.com/auth/userinfo.email" );

      return firebaseAuthObject.$signInWithPopup( provider );
    }

    function logout() {
      firebaseAuthObject.$signOut();
    }

    function getAuth() {
      return firebaseAuthObject.$getAuth();
    }

    function waitForAuthThen( doSomething ) {
      return firebaseAuthObject.$waitForSignIn().then( doSomething );
    }

    async function getMyEmail() {
      await firebaseAuthObject.$waitForSignIn();
      const { email } = getAuth();

      return email;
    }

    async function getMyUserId() {

      return emailToUserKey( await getMyEmail() );
    }

    async function getMyUserProfile() {
      const
        myUserId = await getMyUserId(),
        myRec = new $firebaseObject( root.child( `users/${myUserId}` ) );

      await myRec.$loaded();

      return myRec;
    }

    async function amIRiseAdmin() {
      const { riseAdmin } = await getMyUserProfile();

      //coerce into boolean
      return !!riseAdmin;
    }

    function redirectIfNotLoggedIn() {
      if ( !_loginRedirectTransitioning ) {
        _loginRedirectTransitioning = true;
        firebaseAuthObject.$waitForSignIn().then( function markAndGoToLogin() {
          if ( !getAuth() ) {
            $state.go( "home" ).then( function markOffTransition() {
              _loginRedirectTransitioning = false;
            } );
          }
        } );
      }
    }
  }
}

export default AuthService;
