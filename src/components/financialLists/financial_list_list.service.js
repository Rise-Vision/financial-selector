class financialListListService {
  constructor( $window, displayListService, $firebaseObject, displayUsersService, encodeForFirebaseProp ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    async function getList( listId ) {
      const list = new $firebaseObject(
        root.child( `lists/${listId}` )
    );

      await list.$loaded();

      return list;
    }

    return {
      async list( displayId ) {
        let lists = new Array(),
          display = await displayListService.getDisplay( displayId );

        for ( let key in display.lists ) {
          let listObject = await getList( key ),
            user = await displayUsersService.getUser( encodeForFirebaseProp( listObject.modifiedBy ) );

          listObject.modifiedByName = user.name;
          lists.push( listObject );
        }

        return lists
      }
    };
  }
}

export default financialListListService
