/*eslint no-console: ["error", { allow: ["log"] }] */

import Firebase from "firebase";

class AuthService {
  constructor( $firebaseAuth, firebase,
    $firebaseObject, $state, encodeForFirebaseProp ) {
    "ngInject";
    const root = firebase.database().ref(),
      firebaseAuthObject = $firebaseAuth();

    let _loginRedirectTransitioning = false;

    return {
      register,
      login,
      loginWithGoogle,
      logout,
      getAuth,
      sendEmailVerification,
      firebaseAuthObject,
      redirectIfNotLoggedIn,
      waitForAuthThen,
      getMyEmail,
      getMyUserId,
      amIRiseAdmin,
    };

    async function register( { email, password } ) {
      await firebaseAuthObject.$createUserWithEmailAndPassword( email, password );
    }

    async function sendEmailVerification() {
      const auth = await getAuth();

      return await auth.sendEmailVerification();
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

    async function getAuth() {
      await firebaseAuthObject.$waitForSignIn();
      return firebaseAuthObject.$getAuth();
    }

    function waitForAuthThen( doSomething ) {
      return firebaseAuthObject.$waitForSignIn().then( doSomething );
    }

    async function getMyEmail() {
      const { email } = await getAuth() || {};

      return email;
    }

    async function getMyUserId() {

      return encodeForFirebaseProp( await getMyEmail() );
    }

    async function getMyUserProfile() {
      const
        myUserId = await getMyUserId(),
        myRec = myUserId && new $firebaseObject( root.child( `users/${myUserId}` ) );

      myRec && await myRec.$loaded();

      return myRec;
    }

    async function amIRiseAdmin() {
      const { riseAdmin } = await getMyUserProfile();

      //coerce into boolean
      return !!riseAdmin;
    }

    async function redirectIfNotLoggedIn() {
      if ( !_loginRedirectTransitioning ) {
        _loginRedirectTransitioning = true;
        const auth = await getAuth();

        if ( !auth ) {
          await $state.go( "unauthorized.home" );
        } else if ( !auth.emailVerified ) {
          await $state.go( "unauthorized.needVerification" );
        }

        _loginRedirectTransitioning = false;
      }
    }
  }
}

export default AuthService;
