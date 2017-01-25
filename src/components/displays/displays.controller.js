class DisplaysController {
  constructor( displayUsersService, displayValidationService,
     companyIdOrOldDisplayIdLength, recentDisplayIdLength, displaySaveService, displayListService, $async, $scope, $window, confirmDialog ) {
    "ngInject";
    const ctrl = this;

    this.name = "displays";

    this.displayValidations = displayValidationService.results;
    this.errorMessage = "";
    this.$onInit = () => {
      this.loading = true;
      _loadMyRole();
      _populateDisplays();
    };

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

    this.searchDisplays = $async( async ( ) => {
      let displayIdResult,
        companyResult,
        nameResult;

      switch ( this.displaySearchText.length ) {
      case 0:
        _populateDisplays();
        break;
      case companyIdOrOldDisplayIdLength:
        displayIdResult = await displayListService.getDisplayNameObjById( this.displaySearchText );
        companyResult = await displayListService.getDisplaysForCompany( this.displaySearchText );

        this.displayList = [].concat( displayIdResult || companyResult );
        break;
      case recentDisplayIdLength:
        displayIdResult = await displayListService.getDisplayNameObjById( this.displaySearchText );
        nameResult = await displayListService.getDisplayByName( this.displaySearchText );

        this.displayList = [].concat( displayIdResult || nameResult )
        break;
      default:
        this.displayList = await displayListService.getDisplayByName( this.displaySearchText );
        break;
      }
    } );

    this.removeDisplay = $async( async ( displayId ) => {

      try {
        // will return false if the user cancels the dialog
        let result = await confirmDialog( {
          title: "Delete Display",
          content: `"Are you sure you want to remove display ${displayId}?"`,
        } );

        if ( result ) {
          displayListService.removeDisplay( displayId );
        }

      } catch ( e ) {
        _outputErr( "Failed to remove display", e );
      }
    } );

    let _loadMyRole = $async( async() => {
        const { displayId } = ctrl;

        ctrl.myRole = await displayUsersService.myRoleFor( displayId );

      } ),

      _populateDisplays = $async( async() => {
        this.displayList = await displayListService.getMyDisplays( );
        this.loading = false;
      } );

    function _outputErr( msg, e ) {
      ctrl.errorMessage = `${msg}:${e.message}`;
    }
  }
}

export default DisplaysController;
