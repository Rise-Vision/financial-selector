class displayEditUserController {
  constructor( $state, displayUsersService, $async ) {
    "ngInject";

    const ctrl = this;

    ctrl.name = "editUser";

    ctrl.$onInit = () => {
      _populateInvite();
    };

    ctrl.ok = async() => {
      const { key, invite } = ctrl;

      try {
        await displayUsersService.saveInvite( key, invite );
      } catch ( e ) {
        alert( "failed to save: " + e.message );
        console.error( e );
      }

      $state.go( "^" );
    };

    ctrl.cancel = () => {
      $state.go( "^" );
    }

    const _populateInvite = $async( async () => {
      try {
        ctrl.invite = await displayUsersService.getInvite( ctrl.inviteKey );
      } catch ( e ) {
        alert( "failed to load user" );
        console.error( e );
      }
    } );
  }
}

export default displayEditUserController;
