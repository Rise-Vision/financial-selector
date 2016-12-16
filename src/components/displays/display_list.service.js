import assert from "assert";

class displayListService {
  constructor( $window, $firebaseObject ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      attachListTo( target ) {
        target.displayList = $firebaseObject(
          root.child( "displays" )
         );
      },

      async removeDisplay( displayId ) {
        assert( displayId );
        const displayRec = new $firebaseObject(
          root.child( `displays/${displayId}` )
        );

        return await displayRec.$remove();
      }
    };
  }
}

export default displayListService
