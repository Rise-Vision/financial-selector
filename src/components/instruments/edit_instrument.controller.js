class editInstrumentController {
  constructor( $async, financialListListService,
   instrumentListService, $state ) {
    "ngInject";

    this.name = "editInstrument";

    this.$onInit = () => {
      _populateInstrument();
    };

    this.ok = async () => {
      const { listId, displayId, instrumentId } = this;

      try {
        this.submitting = true;
        await instrumentListService.updateInstrument( displayId, listId, instrumentId, this.theInstrument );
        this.submitting = false;
        $state.go( "^" );
      } catch ( e ) {
        console.error( e );
        this.errorMessage = `Failed to update instrument: ${e.message}`;
      }
    };

    this.cancel = async () => {
      $state.go( "^" );
    };

    let _populateInstrument = $async( async () => {
      const { listId, instrumentId } = this;

      try {
        this.theInstrument = await instrumentListService.getInstrument( listId, instrumentId );

      } catch ( e ) {
        this.errorMessage = `Failed: ${e.message}`;
        console.error( e );
      }
    } );
  }
}

export default editInstrumentController;
