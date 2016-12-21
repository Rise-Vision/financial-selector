import assert from "assert";

class displayListService {
  constructor( $window, $firebaseObject, $firebaseArray,
    $firebaseAuth, authService ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    function _DisplaysForUser( ref, userId ) {
      this.userId = userId;
      return $firebaseArray.call( this, ref );
    }

    _DisplaysForUser.prototype.$$added = async function $$added( snap ) {
      const displayId = snap.getKey();

      return await getDisplay( displayId );
    }

    _DisplaysForUser.prototype.$$updated = async function $$updated( snap ) {
      const displayId = snap.getKey(),
        rec = this.$getRecord( displayId );

      Object.assign( rec, await getDisplay( displayId ) );
      return true;
    }

    async function getDisplay( displayId ) {
      const display = new $firebaseObject(
        root.child( `displays/${displayId}` )
      );

      await display.$loaded();

      return display;
    }

    let DisplaysForUser = $firebaseArray.$extend( _DisplaysForUser );

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

    async function getAllDisplays() {
      const displayRecs = new $firebaseArray(
        root.child( "displays" )
      );

      await displayRecs.$loaded();
      return displayRecs;
    }

    return {
      getMyDisplays,

      async removeDisplay( displayId ) {
        assert( displayId );
        alert( "TODO: remove is not yet fully implemented." );
        const displayRec = new $firebaseObject(
          root.child( `displays/${displayId}` )
        );

        return await displayRec.$remove();
      }
    };
  }
}

export default displayListService
