class FinancialListsController {
  constructor( financialListAddService, $state, authService ) {
    "ngInject";

    authService.redirectIfNotLoggedIn();

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

    this.cancel = () => {
      this.showAddList = false;
      this.newListName = "";
    }
  }
}

export default FinancialListsController;
