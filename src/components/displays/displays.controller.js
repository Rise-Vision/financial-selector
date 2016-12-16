class DisplaysController {
  constructor( displayUsersService, displayValidationService,
     displaySaveService, displayListService, $async, $scope ) {
    "ngInject";
    const ctrl = this;

    this.displayValidations = displayValidationService.results;
    this.errorMessage = "";
    this.$onInit = () => {
      _loadMyRole();
    };

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
      this.errorMessage = "";
      $scope.$apply();
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

    this.removeDisplay = $async( async ( displayId ) => {
      try {
        displayListService.removeDisplay( displayId );
      } catch ( e ) {
        _outputErr( "Failed to remove display", e );
      }
    } );

    let _loadMyRole = $async( async() => {
      const { displayId } = ctrl;

      ctrl.myRole = await displayUsersService.myRoleFor( displayId );
    } );

    function _outputErr( msg, e ) {
      ctrl.errorMessage = `${msg}:${e.message}`;
    }
  }
}

export default DisplaysController;
