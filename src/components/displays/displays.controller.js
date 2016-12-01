class DisplaysController {
  constructor( displayValidationService, displaySaveService, displayListService ) {
    "ngInject";

    this.displayValidations = displayValidationService.results;
    this.errorMessage = "";

    displayListService.attachListTo( this );

    this.submitIdCheck = () => {
      if ( ![ 12, 34, 36 ].includes( this.displayId.length ) ) {
        this.validationFailed( Error( "Invalid display id length." ) );
        return;
      }

      displayValidationService.validate( this.displayId )
      .then( this.validationPassed ).catch( this.validationFailed );
    };

    this.saveDisplay = () => {
      this.disableAddButon = true;
      displaySaveService.save( this.displayId )
      .then( this.postSave ).catch( this.saveError );
    };

    this.postSave = () => {
      this.displayId = ""
      this.disableAddButon = false;
      this.addDisplay = false;
      this.errorMessage = ""
    };

    this.saveError = ( err ) => {
      this.errorMessage = err.message;
    };

    this.validationFailed = ( err ) => {
      this.errorMessage = err.message;
    };

    this.validationPassed = () => {
      this.errorMessage = "";
    }
  }
}

export default DisplaysController;
