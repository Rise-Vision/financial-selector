class financialListListService {

  constructor( $window, displayListService, displayUsersService,
    $firebaseArray, $firebaseObject, $q, authService, touch ) {
    "ngInject";

    const root = $window.firebase.database().ref(),
      listData = $firebaseArray.$extend( {
        $$added( snap ) {
          return $firebaseObject( root.child( `lists/${snap.getKey()}` ) );
        }
      } );

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
      const path = `lists/${listId}`,
        listRec = $firebaseObject( root.child( path ) );

      await listRec.$loaded();

      Object.assign( listRec, { listName } );

      await $q.all( [ listRec.$save(), touch( path ) ] );

      return true;
    }

    return {
      getList,
      updateList,
      ensureICanEditList,
      list( displayId ) {
        return new listData( root.child( `displays/${displayId}/lists` ) );
      }
    };
  }
}

export default financialListListService;
