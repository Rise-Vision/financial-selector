class FinancialListsController {
  constructor( financialListAddService, $state,
    authService, displayValidationService, $async,
  financialListRemoveService, displayUsersService ) {
    "ngInject";

    const ctrl = this;

    ctrl.$onInit = () => {
      _validateAndPopulateDisplayInfo();
    };

    authService.redirectIfNotLoggedIn();

    this.financialLists = [
      //{id: "-KZTGvwzvwI_CkTi2vil", name: "testname", lastModified: Date.now(), modifiedBy: "Someone"}
    ];

    this.$onInit = () => {
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
        const { displayId } = ctrl;

        try {
          ctrl.displayInfo = await displayValidationService.validateAndGet( displayId );
          ctrl.displayId = displayId;
        } catch ( e ) {
          _outputErr( "Failed to validate display", e );
        }
      } );

    function _outputErr( msg, e ) {
      console.error( e );
      alert( `${e.message}` );
    }
  }
}

export default FinancialListsController;
