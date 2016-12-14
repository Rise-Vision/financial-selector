class displayAddUserController {
  constructor( $state, displayUsersService ) {
    "ngInject";

    const ctrl = this;

    this.name = "addUser";

    // default
    ctrl.role = "Editor";

    ctrl.sendInvitation = async () => {
      const { displayId, email, role } = ctrl;

      try {
        const userId = await displayUsersService.inviteUserToDisplay( {
          displayId, role, email,
        } );

        $state.go( "^.inviteSuccess", { userId, displayId } );
      } catch ( e ) {
        alert( "failed to invite user: " + e.message );
        console.error( e );
        $state.go( "^" );
      }
      // go to a sibling state
    };

    ctrl.cancel = () => {
      $state.go( "^" );
    }
  }
}

export default displayAddUserController;
