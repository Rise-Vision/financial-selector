class FinancialListsController {
  constructor( financialListAddService, financialListRemoveService, $state, authService, displayUsersService, $async ) {
    "ngInject";

    authService.redirectIfNotLoggedIn();

    this.financialLists = [
      //{id: "-KZSdjLT_gc-ezDbT1j2", name: "testname", lastModified: Date.now(), modifiedBy: "Someone"}
    ];

    this.$onInit = $async( async() => {
      await loadMyRoleFor( this.displayId, this );
    } );

    this.addList = () => {
      if ( !this.newListName ) {
        return;
      }

      this.submittingList = true;

      financialListAddService.add( this.newListName, this.displayId )
      .then( () => {
        this.submittingList = false;
        this.newListName = "";
        this.showAddList = false;
      } )
      .catch( ( err ) => {
        this.errorMessage = "Failed to add " + this.newListName;
        console.error( err );
      } );
    }

    this.removeList = ( listId ) => {
      financialListRemoveService.remove( listId, this.displayId )
      .catch( ( err ) => {
        this.errorMessage = "Failed to remove " + this.financialLists.find( ( el ) => el.id === listId ).id;
        console.error( err );
      } );
    }

    this.cancel = () => {
      this.showAddList = false;
      this.newListName = "";
    };

    let loadMyRoleFor = $async( async( displayId, bindTo ) => {
      bindTo.myRole = await displayUsersService.myRoleFor( displayId );
    } );
  }
}

export default FinancialListsController;
