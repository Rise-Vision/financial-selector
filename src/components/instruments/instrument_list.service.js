class instrumentListService {
  constructor( $window, $firebaseObject, authService,
    financialListListService, $q ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    async function getInstrument( listId, instrumentId ) {
      const instrumentRec = new $firebaseObject(
        root.child( `lists/${listId}/instruments/${instrumentId}` )
      );

      await instrumentRec.$loaded();
      return instrumentRec;
    }

    async function updateInstrument( displayId, listId, instrumentId, { name } ) {
      await financialListListService.ensureICanEditList( displayId, listId );

      const instrumentRec = await getInstrument( listId, instrumentId );

      Object.assign( instrumentRec, { name } );

      return await $q.all( [
        instrumentRec.$save(),
        financialListListService.touchList( displayId, listId )
      ] );
    }

    return {
      getInstrument,
      updateInstrument,
      attachListTo( target ) {
        authService.waitForAuthThen( () => {
          target.instrumentList = $firebaseObject(
            root.child( `lists/${target.listId}` ) );
        } );
      }
    };
  }
}

export default instrumentListService
