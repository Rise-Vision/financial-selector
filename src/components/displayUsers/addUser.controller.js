class displayAddUserController {
  constructor( $state, displayUsersService ) {
    "ngInject";

    const ctrl = this;

    this.name = "addUser";

    ctrl.sendInvitation = async () => {
      const { displayId, email, role } = ctrl;

      try {
        const rec = await displayUsersService.addInvite( {
          displayId, email, role
        } );
        const inviteKey = rec.getKey();

        $state.go( "^.inviteSuccess", { inviteKey } );
      } catch ( e ) {
        alert( "failed to add user: " + e.message );
        console.error( e );
      }
      // go to a sibling state
    };

    ctrl.cancel = () => {
      $state.go( "^" );
    }
  }
}

export default displayAddUserController;
