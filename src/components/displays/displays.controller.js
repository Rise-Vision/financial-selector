class DisplaysController {
  constructor( displayValidationService ) {
    "ngInject";

    this.displayValidations = displayValidationService.results;

    this.submitIdCheck = () => {
      if ( ![ 12, 34, 36 ].includes( this.displayId.length ) ) {
        return;
      }

      displayValidationService.validate( this.displayId );
    }
  }
}

export default DisplaysController;
