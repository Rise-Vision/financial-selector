
class displayUsersService {
  constructor( $firebaseArray, $firebaseObject, firebase, $firebaseAuth ) {
    "ngInject";
    const root = firebase.database().ref();
    const authMethods = $firebaseAuth( );

    return {
      addInvite,
      getInvite,
      getInvites,
      removeInvite,
      saveInvite,
      myRoleFor,
    };

    async function myEmail() {
      await authMethods.$waitForSignIn();
      const { email } = authMethods.$getAuth();

      return email;
    }

    async function myRoleFor( displayId ) {
      const email = await myEmail();
      const myInvite = await getInviteByDisplayIdAndEmail( displayId, email );

      if ( myInvite ) {
        return myInvite.role;
      } else {
        return null;
      }
    }

    async function addInvite( inviteObj ) {
      const { displayId } = inviteObj;

      ensureAdminRole( displayId );
      const
        inviteArray = $firebaseArray( root.child( "invites" ) ),
        rec = await inviteArray.$add( inviteObj );

      return rec;
    }

    async function getInvite( key ) {
      const rec = $firebaseObject( root.child( `invites/${key}` ) );

      await rec.$loaded();

      return rec;
    }

    async function getInviteByDisplayIdAndEmail( displayId, email ) {
      const invites = $firebaseArray(
        root.child( "invites" )
            .orderByChild( "email" )
            .equalTo( email ) );

      await invites.$loaded();
      var results = invites.filter( ( inv ) => inv.displayId === displayId && inv.email === email );

      return results[ 0 ] || null;
    }

    async function ensureAdminRole( displayId ) {
      const myRole = await myRoleFor( displayId );

      if ( myRole !== "Administrator" ) {
        throw new Error( `You are not an admin for this display (${displayId}).` );
      }
    }

    async function getInvites( displayId ) {
      const invites = $firebaseArray(
        root.child( "invites" )
            .orderByChild( "displayId" )
            .equalTo( displayId ) );

      await invites.$loaded();

      const myRole = await myRoleFor( displayId );
      let myInvites;

      //TODO: not secure
      if ( myRole !== "Administrator" ) {
        const email = await ( myEmail() );

        myInvites = invites.filter( ( inv ) => email === inv.email )
      } else {
        myInvites = invites;
      }
      return myInvites;
    }

    async function removeInvite( key ) {
      await ensureAdminRole( displayId );

      const rec = $firebaseObject( root.child( `invites/${key}` ) );

      return await rec.$remove();
    }

    async function saveInvite( key, invite ) {
      const rec = $firebaseObject( root.child( `invites/${key}` ) );

      Object.assign( rec, invite );
      return await rec.$save();

    }
  }

}

export default displayUsersService;
