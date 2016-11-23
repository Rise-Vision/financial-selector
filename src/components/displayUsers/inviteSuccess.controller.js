class inviteSuccessController {
  constructor( $state, displayUsersService, $scope, $async ) {
    "ngInject";

    const ctrl = this;

    ctrl.$onInit = () => {
      _populateInvite();
    };

    ctrl.ok = () => {
      $state.go( "^" );
    }

    const _populateInvite = $async( async () => {
      try {
        ctrl.invite = await displayUsersService.getInvite( ctrl.inviteKey );
      } catch ( e ) {
        alert( "failed to load invite: " + e.message );
        console.error( e );
      }
    } );
  }
}

export default inviteSuccessController;
