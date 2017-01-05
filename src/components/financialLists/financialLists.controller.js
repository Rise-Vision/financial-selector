class FinancialListsController {
  constructor( financialListAddService, $state,
    authService, displayValidationService, $async,
  financialListRemoveService, displayUsersService, financialListListService ) {
    "ngInject";

    authService.redirectIfNotLoggedIn();

    this.financialLists = [];

    this.$onInit = () => {
      _validateAndPopulateDisplayInfo();
      loadMyRoleFor( this.displayId, this );
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
      } ),

      _validateAndPopulateDisplayInfo = $async( async() => {
        const { displayId } = this;

        try {
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
