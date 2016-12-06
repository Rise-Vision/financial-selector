class displayManageUsersController {
  constructor( $state, displayUsersService, $scope, $async ) {
    "ngInject";

    const
      ctrl = this,
      { displayId } = ctrl;

    ctrl.$onInit = async () => {
      _populateUsers();
      _loadMyRole();
    };

    ctrl.addUser = () => {
      $state.go( "manageDisplayUsers.addUser" );
    }

    ctrl.editUser = ( user ) => {
      $state.go( "manageDisplayUsers.editUser", { inviteKey: user.$id } );
    }

    ctrl.removeUser = $async( async ( user ) => {
      try {
        await displayUsersService.removeInvite( user.$id );
      } catch ( e ) {
        alert( "Failed to remove user: " + e.message );
        console.error( e );
      }
    } );

    const _loadMyRole = $async( async() => {
      ctrl.myRole = await displayUsersService.myRoleFor( displayId );
    } );

    const _populateUsers = $async( async () => {
      try {
        ctrl.users = await displayUsersService.getInvites( displayId );
      } catch ( e ) {
        alert( "Failed to load users: " + e.message );
        console.error( e );
      }
    } );

    ctrl.name = "displayManageUsers";
  }
}

export default displayManageUsersController;
