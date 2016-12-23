class displayUsersService {
  constructor( $firebaseArray, $firebaseObject, firebase,
    $firebaseAuth, $q, encodeForFirebaseProp, decodeForFirebaseProp ) {
    "ngInject";
    const root = firebase.database().ref(),
      authMethods = $firebaseAuth( );

    async function myUserId() {
      await authMethods.$waitForSignIn();
      const { email } = authMethods.$getAuth();

      return encodeForFirebaseProp( email );
    }

    async function myRoleFor( displayId ) {
      const myUid = await myUserId(),
        myProfile = await getProfileByDisplayIdAndUserId( displayId, myUid );

      if ( myProfile ) {
        return myProfile.role;
      } else {
        return null;
      }
    }

    async function inviteUserToDisplay( { displayId, email, role } ) {

      ensureAdminRole( displayId );
      const userId = encodeForFirebaseProp( email ),
        //run in parallel
        [ userFBObj, displayFBObj ] = await $q.all( [ getUser( userId ), getDisplay( displayId ) ] );

      await associateUserToDisplay( userFBObj, displayFBObj, role );
      return userId;
    }

    async function associateUserToDisplay( userFBObj, displayFBObj, role ) {
      const displayId = displayFBObj.$id,
        userId = userFBObj.$id;

      if ( userFBObj.displays && userFBObj.displays[ displayId ] ) {
        throw new Error( `An invitation is already sent to ${userId} for display ${displayId}` );
      } else {
        let dUnderU = { accepted: false, role };

        if ( !userFBObj.displays ) {
          Object.assign( userFBObj, { displays: { [ displayId ]: dUnderU } } );
        } else if ( !userFBObj.displays[ displayId ] ) {
          userFBObj.displays[ displayId ] = dUnderU;
        }

        if ( !displayFBObj.users ) {
          Object.assign( displayFBObj, { users: { [ userId ]: true } } );
        } else if ( !displayFBObj.users[ userId ] ) {
          displayFBObj.users[ userId ] = true;
        }

        await $q.all( [ userFBObj.$save(), displayFBObj.$save() ] );
      }
    }

    async function getDisplay( displayId ) {
      const dObj = $firebaseObject( root.child( `displays/${displayId}` ) );

      await dObj.$loaded();
      return dObj;
    }

    async function getUserForDisplay( userId, displayId ) {
      const currUser = $firebaseObject( root.child( `users/${userId}` ) );

      await currUser.$loaded();
      let profileForDisplay = _extractProfileForDisplay( currUser, displayId );

      return profileForDisplay;
    }

    async function getProfileByDisplayIdAndUserId( displayId, userId ) {
      const profileRec = $firebaseObject( root.child( `users/${userId}/displays/${displayId}` ) ),
        userRec = $firebaseObject( root.child( `users/${userId}` ) );

      await $q.all( [ profileRec.$loaded(), userRec.$loaded() ] );
      let { riseAdmin } = userRec,
        { role, status } = profileRec || {},
        profile = Object.assign( { role, status }, riseAdmin ? { role: "RiseAdmin" } : "" );

      return profile;
    }

    async function ensureAdminRole( displayId ) {
      const myRole = await myRoleFor( displayId );

      if ( ![ "DisplayAdmin", "RiseAdmin" ].includes( myRole ) ) {
        throw new Error( `You are not an admin for this display (${displayId}).` );
      }
    }

    function _UsersWithDisplay( ref, displayId ) {
      this.displayId = displayId;
      return $firebaseArray.call( this, ref );
    }

    _UsersWithDisplay.prototype.$$added = async function $$added( snap ) {
      const userId = snap.getKey();

      return await getUserForDisplay( userId, this.displayId );
    }

    _UsersWithDisplay.prototype.$$updated = async function $$updated( snap ) {
      const userId = snap.getKey(),
        rec = this.$getRecord( userId );

      Object.assign( rec, await getUserForDisplay( userId, this.displayId ) );
      return true;
    };

    let UsersWithDisplay = $firebaseArray.$extend( _UsersWithDisplay );

    async function getUser( userId ) {
      const user = new $firebaseObject(
        root.child( `users/${userId}` ) );

      await user.$loaded();

      return user;
    }

    async function getUsersForDisplay( displayId ) {
      const userArr = new UsersWithDisplay(
        root.child( `displays/${displayId}/users` ), displayId
       );

      await userArr.$loaded();
      return userArr;
    }

    async function disinvite( userId, displayId ) {

      const dUnderU = $firebaseObject( root.child( `users/${userId}/displays/${displayId}` ) ),
        uUnderD = $firebaseObject( root.child( `displays/${displayId}/users/${userId}` ) )

      await ensureAdminRole( displayId );

      return await $q.all( [ dUnderU.$remove(), uUnderD.$remove() ] );
    }

    async function updateInvite( userId, displayId, { role, name = "" } ) {
      await ensureAdminRole( displayId );

      const userRec = $firebaseObject( root.child( `users/${userId}` ) ),
        // need this to trigger a firebase update
        uUnderD = $firebaseObject( root.child( `displays/${displayId}/users/${userId}` ) );

      await $q.all( [ userRec.$loaded(), uUnderD.$loaded() ] );

      Object.assign( userRec, { name } );
      Object.assign( userRec.displays[ displayId ], { role } );
      Object.assign( uUnderD, { $value: uUnderD.$value + 1 } );
      return await $q.all( [ userRec.$save(), uUnderD.$save() ] );
    }

    return {
      inviteUserToDisplay,
      updateInvite,
      getUserForDisplay,
      getUsersForDisplay,
      disinvite,
      myRoleFor,
    };

    function _extractProfileForDisplay( { name, displays, $id }, displayId ) {
      const { role, accepted } = displays[ displayId ],
        email = decodeForFirebaseProp( $id );

      return { email, name, $id, role, accepted };
    }
  }
}


export default displayUsersService;
