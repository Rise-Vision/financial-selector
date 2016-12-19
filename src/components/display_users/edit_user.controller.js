class displayEditUserController {
  constructor( $state, displayUsersService, $async ) {
    "ngInject";

    const ctrl = this;

    ctrl.name = "editUser";

    ctrl.$onInit = () => {
      _populateInvite();
    };

    ctrl.ok = async() => {
      const { userId, displayId, invite } = ctrl;

      try {
        await displayUsersService.updateInvite( userId, displayId, invite );
      } catch ( e ) {
        ctrl.errorMessage = "failed to save: " + e.message;
        console.error( e );
      }

      $state.go( "^" );
    };

    ctrl.cancel = () => {
      $state.go( "^" );
    }

    let _populateInvite = $async( async () => {
      const { userId, displayId } = ctrl;

      try {
        ctrl.invite = await displayUsersService.getUserForDisplay( userId, displayId );
      } catch ( e ) {
        alert( "failed to load user" );
        console.error( e );
      }
    } );
  }
}

export default displayEditUserController;
