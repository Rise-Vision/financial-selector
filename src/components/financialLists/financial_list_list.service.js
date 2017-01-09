class financialListListService {

  constructor( $window, displayListService, displayUsersService,
    $firebaseArray, $firebaseObject, $q, authService ) {
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

    async function getList( listId ) {
      const list = new $firebaseObject(
        root.child( `lists/${listId}` )
    )

      await list.$loaded();

      return list;
    }

    async function ensureListUnderDisiplay( displayId, listId ) {
      const lUnderD = $firebaseObject( root.child( `displays/${displayId}/lists/${listId}` ) );

      await lUnderD.$loaded();

      if ( !lUnderD.$value ) {
        throw new Error( `The ${listId} list does not belong to display ${displayId}` );
      }
    }

    async function ensureICanEditList( displayId, listId ) {
      await $q.all( [
        displayUsersService.ensureEditorRole( displayId ),
        ensureListUnderDisiplay( displayId, listId )
      ] );
    }

    async function updateList( displayId, listId, { listName } ) {
      await ensureICanEditList( displayId, listId );
      const listRec = $firebaseObject( root.child( `lists/${listId}` ) );

      await listRec.$loaded();

      Object.assign( listRec, { listName } );

      await $q.all( [ listRec.$save(), touchList( displayId, listId ) ] );

      return true;
    }

    async function touchList( displayId, listId ) {
      await ensureICanEditList( displayId, listId );
      const listRec = $firebaseObject( root.child( `lists/${listId}` ) );

      await listRec.$loaded();

      Object.assign( listRec, {
        changeDate: $window.firebase.database.ServerValue.TIMESTAMP,
        modifiedBy: await authService.getMyUserId(), } );

      await listRec.$save();

      return true;
    }

    return {
      getList,
      updateList,
      touchList,
      ensureICanEditList,
      list( displayId ) {
        return new listData( root.child( `displays/${displayId}/lists` ) );
      }
    };
  }
}

export default financialListListService;
