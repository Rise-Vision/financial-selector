class editListController {
  constructor( $async, financialListListService, $state ) {
    "ngInject";

    this.name = "editFinantialList";

    this.$onInit = () => {
      _populateFinancialList();
    };

    this.ok = async () => {
      const { listId, displayId } = this;

      try {
        await financialListListService.updateList( displayId, listId, this.theList );
      } catch ( e ) {
        console.error( e );
        this.errorMessage = `Failed to update list: ${e.message}`;
      }

      $state.go( "^" );
    };

    this.cancel = async () => {
      $state.go( "^" );
    };

    let _populateFinancialList = $async( async () => {
      const { listId } = this;

      try {
        this.theList = await financialListListService.getList( listId );

      } catch ( e ) {
        this.errorMessage = `Failed: ${e.message}`;
        console.error( e );
      }
    } );
  }
}

export default editListController;
