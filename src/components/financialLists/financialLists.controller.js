class FinancialListsController {
  constructor( financialListAddService, $state,
    authService, displayValidationService, displaySaveService, $async,
  financialListRemoveService, displayUsersService, financialListListService, confirmDialog, timeZone ) {
    "ngInject";

    this.financialLists = [];
    this.timeZone = timeZone;

    this.$onInit = () => {
      _validateAndPopulateDisplayInfo();
    };

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
        $state.go( "instruments", { displayId: this.displayId, listId: this.financialLists[ this.financialLists.length - 1 ].$id } );
      } )
      .catch( ( err ) => {
        this.errorMessage = "Failed to add " + this.newListName;
        console.error( err );
      } );
    };

    this.removeList = $async( async ( listId, listName ) => {
      try {
        // will return false if the user cancels the dialog
        let result = await confirmDialog( {
          title: "Delete Financial List",
          content: `Are you sure you want to remove financial list "${listName}" ?`,
        } );

        if ( result ) {
          financialListRemoveService.remove( listId, this.displayId );
        }

      } catch ( e ) {
        _outputErr( "Failed to remove " + this.financialLists.find( ( el ) => el.id === listId ).id, e );
      }
    } );

    this.cancel = () => {
      this.showAddList = false;
      this.newListName = "";
    };

    let _validateAndPopulateDisplayInfo = $async( async() => {
        const { displayId } = this;

        try {
          this.myRole = await displayUsersService.myRoleFor( displayId );
          if ( this.myRole === "RiseAdmin" ) {
            await displaySaveService.save( displayId );
          }
          this.displayInfo = await displayValidationService.validateAndGet( displayId );
          this.financialLists = await financialListListService.list( this.displayId );
        } catch ( e ) {
          _outputErr( "Failed to validate display", e );
        }
      } ),

      _outputErr = ( msg, e ) => {
        console.error( e );
        this.errorMessage = `${msg}: ${e.message}`;
      }
  }
}

export default FinancialListsController;
