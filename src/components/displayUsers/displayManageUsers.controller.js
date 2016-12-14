class displayManageUsersController {
  constructor( $state, displayUsersService, $scope, $async ) {
    "ngInject";

    const ctrl = this;

    ctrl.$onInit = async () => {
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
        alert( "Failed to remove user: " + e.message );
        console.error( e );
        throw e;
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
          alert( "Failed to load users: " + e.message );
          console.error( e );
        }
      } );

    ctrl.name = "displayManageUsers";
  }
}

export default displayManageUsersController;
