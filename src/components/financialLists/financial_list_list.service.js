class financialListListService {
  constructor( $window, $firebaseArray ) {
    "ngInject";

    const root = $window.firebase.database().ref(),
      listData = $firebaseArray.$extend( {
        $$added( snap ) {
          return createEntryForKey( snap.getKey() );
        }
      } );

    function createEntryForKey( key ) {
      return getListDetails()
      .then( ( details ) => {
        return getUserName( details );
      } );

      function getListDetails() {
        return root.child( `lists/${key}` ).once( "value" ).then( ( snap ) => {
          return Object.assign( {}, { $id: key }, snap.val() );
        } );
      }

      function getUserName( details ) {
        return root.child( `users/${details.modifiedBy}` ).once( "value" ).then( ( snap ) => {
          return Object.assign( details, { modifiedByName: snap.val().name } );
        } );
      }
    }

    return {
      list( displayId ) {
        return new listData( root.child( `displays/${displayId}/lists` ) );
      }
    };
  }
}

export default financialListListService
