class displayUsersService {
  constructor( $firebaseArray, $firebaseObject, firebase,
    $firebaseAuth, $q, encodeForFirebaseProp, decodeForFirebaseProp, authService, assert ) {
    "ngInject";
    const root = firebase.database().ref();

    async function myRoleFor( displayId ) {
      const myUid = await authService.getMyUserId(),
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
        [ displayWithinUserFBObj, displayFBObj ] = await $q.all( [ getDisplayWithinUser( userId, displayId ), getDisplay( displayId ) ] );

      await associateUserToDisplay( displayWithinUserFBObj, displayFBObj, role, email );
      return userId;
    }

    async function associateUserToDisplay( displayWithinUserFBObj, displayFBObj, role, email ) {
      const displayId = displayFBObj.$id,
        userId = encodeForFirebaseProp( email );

      if ( displayWithinUserFBObj.role ) {
        throw new Error( `An invitation is already sent to ${userId} for display ${displayId}` );
      } else {
        Object.assign( displayWithinUserFBObj, { accepted: false, role } );

        if ( !displayFBObj.users ) {
          Object.assign( displayFBObj, { users: { [ userId ]: true } } );
        } else if ( !displayFBObj.users[ userId ] ) {
          displayFBObj.users[ userId ] = true;
        }

        await $q.all( [ displayWithinUserFBObj.$save(), displayFBObj.$save() ] );
      }
    }

    async function getDisplay( displayId ) {
      assert( displayId );

      const dObj = $firebaseObject( root.child( `displays/${displayId}` ) );

      await dObj.$loaded();
      return dObj;
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
      assert( displayId );
      const myRole = await myRoleFor( displayId );

      if ( ![ "DisplayAdmin", "RiseAdmin" ].includes( myRole ) ) {
        throw new Error( `You are not an admin for this display (${displayId}).` );
      }
    }

    async function ensureEditorRole( displayId ) {
      assert( displayId );
      const myRole = await myRoleFor( displayId );

      if ( ![ "DisplayAdmin", "RiseAdmin", "Editor" ].includes( myRole ) ) {
        throw new Error( `You are not an editor for this display (${displayId}).` );
      }
    }

    function _UsersWithDisplay( displayId ) {
      assert( displayId );
      this.displayId = displayId;
      return $firebaseArray.call( this, root.child( `displays/${displayId}/users` ) );
    }

    _UsersWithDisplay.prototype.$$added = async function $$added( snap ) {
      const userId = snap.getKey();

      return await getUserDisplayRoleStatus( userId, this.displayId );
    }

    _UsersWithDisplay.prototype.$$updated = async function $$updated( snap ) {
      const userId = snap.getKey(),
        rec = this.$getRecord( userId );

      Object.assign( rec, await getUserDisplayRoleStatus( userId, this.displayId ) );
      return true;
    };

    let UsersWithDisplay = $firebaseArray.$extend( _UsersWithDisplay );

    async function getUserDisplayRoleStatus( userId, displayId ) {
      assert( userId && displayId );
      const userDisplayObj = $firebaseObject( root.child( `users/${userId}/displays/${displayId}` ) );

      await userDisplayObj.$loaded();

      return Object.assign( {}, userDisplayObj, { email: decodeForFirebaseProp( userId ), $id: userId } );
    }

    async function getDisplayWithinUser( userId, displayId ) {
      const display = new $firebaseObject(
        root.child( `users/${userId}/displays/${displayId}` ) );

      await display.$loaded();

      return display;
    }

    async function getUsersForDisplay( displayId ) {
      const userArr = new UsersWithDisplay( displayId );

      await userArr.$loaded();
      return userArr;
    }

    async function disinvite( userId, displayId ) {

      const dUnderU = $firebaseObject( root.child( `users/${userId}/displays/${displayId}` ) ),
        uUnderD = $firebaseObject( root.child( `displays/${displayId}/users/${userId}` ) )

      await ensureAdminRole( displayId );

      return await $q.all( [ dUnderU.$remove(), uUnderD.$remove() ] );
    }

    async function updateInvite( userId, displayId, { role } ) {
      await ensureAdminRole( displayId );

      const userDisplayRec = $firebaseObject( root.child( `users/${userId}/displays/${displayId}` ) ),
        // need this to trigger a firebase update
        uUnderD = $firebaseObject( root.child( `displays/${displayId}/users/${userId}` ) );

      await $q.all( [ userDisplayRec.$loaded(), uUnderD.$loaded() ] );

      Object.assign( userDisplayRec, { role } );
      Object.assign( uUnderD, { $value: uUnderD.$value + 1 } );
      return await $q.all( [ userDisplayRec.$save(), uUnderD.$save() ] );
    }

    return {
      inviteUserToDisplay,
      updateInvite,
      getUserDisplayRoleStatus,
      getUsersForDisplay,
      disinvite,
      myRoleFor,
      ensureEditorRole,
      ensureAdminRole,
    };

  }
}


export default displayUsersService;
