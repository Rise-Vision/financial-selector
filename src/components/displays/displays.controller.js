class DisplaysController {
  constructor( displayValidationService, displaySaveService ) {
    "ngInject";

    this.displayValidations = displayValidationService.results;

    this.submitIdCheck = () => {
      if ( ![ 12, 34, 36 ].includes( this.displayId.length ) ) {
        return;
      }

      displayValidationService.validate( this.displayId );
    };

    this.saveDisplay = () => {
      this.saving = true;
      displaySaveService.save( this.displayId ).then( this.postSave ).catch( this.saveError );
    };

    this.postSave = () => {
      this.displayId = ""
      this.saving = false;
      this.addDisplay = false;
    };

    this.saveError = (err) => {
      console.log(err);
    };
  }
}

export default DisplaysController;
