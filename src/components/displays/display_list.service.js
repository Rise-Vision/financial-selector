// import assert from "assert";
import _ from "lodash";

class displayListService {
  constructor( $window, $firebaseObject, $firebaseArray, $q,
    $firebaseAuth, authService, assert ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    function _DisplaysForUser( ref, userId ) {
      this.userId = userId;
      return $firebaseArray.call( this, ref );
    }

    _DisplaysForUser.prototype.$$added = async function $$added( snap ) {
      const displayId = snap.getKey();

      return { $id: displayId, nameObject: await getDisplayNameObjById( displayId ) };
    }

    _DisplaysForUser.prototype.$$updated = async function $$updated( snap ) {
      const displayId = snap.getKey(),
        rec = this.$getRecord( displayId );

      Object.assign( rec, { nameObject: await getDisplayNameObjById( displayId ) } );
      return true;
    }

    let DisplaysForUser = $firebaseArray.$extend( _DisplaysForUser );

    async function getDisplayNameObjById( displayId ) {
      const displayName = new $firebaseObject(
        root.child( `displays/${displayId}/displayName` )
      );

      await displayName.$loaded();
      if ( !displayName.$value ) {
        return null;
      }

      displayName.did = displayId;
      return displayName;
    }

    async function getMyDisplays() {

      if ( await authService.amIRiseAdmin() ) {
        return await getAllDisplays();
      } else {

        const myUserId = await authService.getMyUserId(),
          displayArr = new DisplaysForUser(
          root.child( `users/${myUserId}/displays` ), myUserId
        )

        await displayArr.$loaded();
        return displayArr;
      }

    }

    async function getDisplayByName( searchName ) {
      let displays = await getMyDisplays();

      return displays.filter( e => e.displayName ? displayNameMatchesSearch( e.displayName ) : displayNameMatchesSearch( e.nameObject.$value ) );

      function displayNameMatchesSearch( displayName ) {
        return displayName.toUpperCase().includes( searchName.toUpperCase() );
      }
    }

    async function getAllDisplays() {
      const displayRecs = new $firebaseArray(
        root.child( "displays" )
      );

      await displayRecs.$loaded();
      return displayRecs;
    }

    async function getDisplaysForCompany( id ) {
      assert( id );

      let query = root.child( "displays" ).orderByChild( "companyId" ).equalTo( id ),
        displayRecs = new $firebaseArray( query );

      await displayRecs.$loaded();
      return displayRecs;
    }

    async function removeDisplay( displayId ) {
      assert( displayId );

      // assert( displayId );
      const displayRec = new $firebaseObject(
        root.child( `displays/${displayId}` )
      );

      await displayRec.$loaded();

      let displayUsers = displayRec.users || {},
        displayUserIds = _.keys( displayUsers ),
        removeDPromises = displayUserIds.map( ( uid ) => _removeDisplayUnderUser( displayId, uid ) );

      return await $q.all( [
        displayRec.$remove()
      ].concat( removeDPromises ) );
    }

    async function _removeDisplayUnderUser( displayId, userId ) {
      assert( displayId && userId );

      // assert( displayId );
      // assert( userId );
      const dUnderU = $firebaseObject( root.child( `users/${userId}/displays/${displayId}` ) );

      return await dUnderU.$remove();
    }

    return {
      getMyDisplays,
      getDisplayNameObjById,
      removeDisplay,
      getDisplayByName,
      getDisplaysForCompany,
    };
  }
}

export default displayListService
