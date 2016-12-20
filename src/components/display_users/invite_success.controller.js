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

    let _populateInvite = $async( async () => {
      try {
        ctrl.invite = await displayUsersService.getUserForDisplay( ctrl.userId, ctrl.displayId );
      } catch ( e ) {
        ctrl.errorMessage = `failed to load invite: ${e.message}`;
        console.error( e );
      }
    } );
  }
}

export default inviteSuccessController;
