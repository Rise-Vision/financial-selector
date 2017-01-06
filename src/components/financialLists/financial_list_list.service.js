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
        return $firebaseObject( root.child( `users/${modBy}/name` ) ).$loaded();
      } )
      .then( ( userNameObject ) => {
        let listObject = $firebaseObject.$extend( {
          $$defaults: {
            modifiedByName: userNameObject.$value
          }
        } );

        return new listObject( root.child( `lists/${key}` ) );
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
