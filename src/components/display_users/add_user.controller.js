class displayAddUserController {
  constructor( $scope, $state, displayUsersService ) {
    "ngInject";

    const ctrl = this;

    this.name = "addUser";

    // default
    ctrl.role = "Editor";

    ctrl.sendInvitation = async () => {
      const { displayId, email, role } = ctrl;

      ctrl.sending = true;
      ctrl.sendButtonMessage = "Sending...";

      try {
        const userId = await displayUsersService.inviteUserToDisplay( {
          displayId, role, email,
        } );

        $state.go( "^.inviteSuccess", { userId, displayId } );
      } catch ( e ) {
        ctrl.errorMessage = e.message.indexOf( "already sent" ) > -1 ?
        `${email} is already a User for this Display` :
        "failed to invite user: " + e.message;
        console.error( e );
        $scope.$apply();
      }
      // go to a sibling state
    };

    ctrl.cancel = () => {
      $state.go( "^" );
    }
  }
}

export default displayAddUserController;
