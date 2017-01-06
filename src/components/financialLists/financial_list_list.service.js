class financialListListService {
  constructor( $window, $firebaseArray, $firebaseObject ) {
    "ngInject";

    const root = $window.firebase.database().ref(),
      listData = $firebaseArray.$extend( {
        $$added( snap ) {
          return createListObject( snap.getKey() );
        }
      } );

    function createListObject( key ) {
      return root.child( `lists/${key}` ).once( "value" ).then( ( snap ) => {
        return snap.val().modifiedBy;
      } )
      .then( ( modBy ) => {
        let listObject = $firebaseObject.$extend( {
          $$defaults: {
            modifiedByName: $firebaseObject( root.child( `users/${modBy}/name` ) )
          }
        } );

        return new listObject( root.child( `lists/${key}` ) );
      } )
      .catch( ( err ) => {
        console.error( err );
      } );
    }

    return {
      list( displayId ) {
        return new listData( root.child( `displays/${displayId}/lists` ) );
      }
    };
  }
}

export default financialListListService
