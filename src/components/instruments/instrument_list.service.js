import _ from "lodash";

class instrumentListService {
  constructor( $window, $firebaseObject, authService,
    financialListListService, touch ) {
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

      return await Promise.all( [
        instrumentRec.$save(),
        touch( `lists/${listId}` )
      ] );
    }

    async function reorder( displayId, listId, diffMap ) {
      await financialListListService.ensureICanEditList( displayId, listId );

      const orderPromises = _.map( diffMap, ( order, key ) =>
        root
          .child( `lists/${listId}/instruments/${key}` )
          .update( { "order": order } ) );

      await Promise.all( orderPromises, Promise.resolve( touch( `lists/${listId}` ) ) );
    }

    return {
      getInstrument,
      updateInstrument,
      reorder,
      attachListTo( target ) {
        authService.waitForAuthThen( () => {
          const listObj = $firebaseObject(
            root.child( `lists/${target.listId}` ) );

          target.instrumentListObj = listObj;
        } );
      }
    };
  }
}

export default instrumentListService
