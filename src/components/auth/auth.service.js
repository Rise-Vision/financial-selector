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
      firebaseAuthObject,
      redirectIfNotLoggedIn,
      waitForAuthThen,
      getMyEmail,
      getMyUserId,
      amIRiseAdmin,
    };

    function register( { email, password } ) {
      return firebaseAuthObject.$createUserWithEmailAndPassword( email, password );
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

    function redirectIfNotLoggedIn() {
      if ( !_loginRedirectTransitioning ) {
        _loginRedirectTransitioning = true;
        getAuth().then( ( auth ) => {
          if ( !auth ) {
            $state.go( "unauthorized.home" ).then( () => {
              _loginRedirectTransitioning = false;
            } );
          } else {
            _loginRedirectTransitioning = false;
          }
        } );
      }
    }
  }
}

export default AuthService;
