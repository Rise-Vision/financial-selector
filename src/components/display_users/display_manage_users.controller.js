class displayManageUsersController {
  constructor( $state, displayUsersService, displayValidationService, $scope, $async ) {
    "ngInject";

    const ctrl = this;

    ctrl.$onInit = async () => {
      await _validateAndPopulateDisplayInfo();
      _populateUsers();
      _loadMyRole();
    };

    ctrl.addUser = () => {
      $state.go( "manageDisplayUsers.addUser" );
    }

    ctrl.editUser = ( user ) => {
      $state.go( "manageDisplayUsers.editUser", { userId: user.$id } );
    }

    ctrl.removeUser = $async( async ( user ) => {
      const { displayId } = ctrl;

      try {
        await displayUsersService.disinvite( user.$id, displayId );
      } catch ( e ) {
        _outputErr( "Failed to remove user", e );
      }
    } );
    let _loadMyRole = $async( async() => {
        const { displayId } = ctrl;

        ctrl.myRole = await displayUsersService.myRoleFor( displayId );
      } ),

      _populateUsers = $async( async () => {
        const { displayId } = ctrl;

        try {
          ctrl.users = await displayUsersService.getUsersForDisplay( displayId );
        } catch ( e ) {
          _outputErr( "Failed to load users", e );
        }
      } ),

      _validateAndPopulateDisplayInfo = $async( async() => {
        const { displayId } = ctrl;

        try {
          ctrl.displayInfo = await displayValidationService.validate( displayId );
          ctrl.displayId = displayId;
        } catch ( e ) {
          _outputErr( "Failed to validate display", e );
        }
      } );

    ctrl.name = "displayManageUsers";
  }
}

function _outputErr( msg, e ) {
  alert( `${msg}: ${e.message}` );
  console.error( e );
  // throw e;
}

export default displayManageUsersController;
