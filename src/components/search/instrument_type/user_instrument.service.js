import assert from "assert";
import Firebase from "firebase";

class UserInstrumentService {
  constructor( authService, $firebaseArray ) {
    "ngInject";

    const root = Firebase.database().ref();

    return {
      addToList,
      removeFromList,
      getUserList,
    };

    function addToList( userId, listId, item ) {
      assert( userId );
      assert( listId );
      assert( item );
      const userList = root.child( "userLists/" + userId + "/" + listId ),
        arr = $firebaseArray( userList );

      return arr.$add( item.label );
    }

    function removeFromList( arr, item ) {
      assert( arr );
      assert( item );
      return arr.$remove( item );
    }

    function getUserList( userId, listId ) {
      const userList = root.child( "userLists/" + userId + "/" + listId );

      return $firebaseArray( userList );
    }
  }
}

export default UserInstrumentService;
