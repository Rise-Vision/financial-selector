/*eslint no-console: ["error", { allow: ["log"] }] */

import Firebase from "firebase";

class AuthService {
  constructor( $firebaseAuth, firebase,
    $firebaseObject, $state, encodeForFirebaseProp ) {
    "ngInject";
    const root = firebase.database().ref(),
      firebaseAuthObject = $firebaseAuth();

    return {
      register,
      login,
      loginWithGoogle,
      logout,
      getAuth,
      firebaseAuthObject,
      needRedirect,
      waitForAuthThen,
      getMyEmail,
      getMyUserId,
      amIRiseAdmin,
    };

    async function register( { email, password } ) {
      return await firebaseAuthObject.$createUserWithEmailAndPassword( email, password );
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

    async function needRedirect() {
      const auth = await getAuth();

      if ( !auth ) {
        return "unauthorized.home";
      } else {
        return null;
      }
    }
  }
}

export default AuthService;
