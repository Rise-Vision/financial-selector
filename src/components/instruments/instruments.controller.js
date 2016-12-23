class InstrumentsController {
  constructor( displayUsersService, instrumentListService, instrumentAddService, instrumentSearchService, $state, authService, $async ) {
    "ngInject";

    authService.redirectIfNotLoggedIn();

    this.categories = [
      "Stocks",
      "Market Statistics",
      "World Indexes",
      "Bonds",
      "Commodities",
      "Currencies"
    ];

    this.selectedCategory = this.categories[ 0 ];

    this.$onInit = () => {
      loadMyRoleFor( this.displayId, this );
    };

    instrumentListService.attachListTo( this );

    this.selectInstrument = ( key ) => {
      if ( this.searching ) {
        return;
      }
      this.instrumentSearch[ key ].isSelected = !this.instrumentSearch[ key ].isSelected;
    };

    this.searchInstruments = () => {
      let promise = this.searchKeyword ?
      instrumentSearchService.keywordSearch( this.selectedCategory, this.searchKeyword ) :
      instrumentSearchService.popularSearch( this.selectedCategory );

      this.searching = true;
      promise.then( ( res ) => {
        this.instrumentSearch = res;
        this.searching = false;
      } );
    };

    this.searchInstruments();

    this.addInstrument = () => {
      let instrumentsToAdd = this.instrumentSearch.filter( el => el.isSelected );

      if ( !instrumentsToAdd.length ) {
        return;
      }

      this.addingInstrument = true;

      instrumentAddService.add( instrumentsToAdd, this.listId )
      .then( () => {
        this.addingInstrument = false;
        this.cancel();
      } )
      .catch( ( err ) => {
        this.errorMessage = "Failed to add " + this.newInstrumentName;
        console.error( err );
      } );
    }

    this.cancel = () => {
      this.showAddInstrument = false;
      this.searchKeyword = "";
      this.searchInstruments();
    };

    let loadMyRoleFor = $async( async( displayId, bindTo ) => {
      bindTo.myRole = await displayUsersService.myRoleFor( displayId );
      if ( ![ "DisplayAdmin", "RiseAdmin" ].includes( this.myRole ) ) {
        $state.go( "home" );
      }
    } );
  }
}

export default InstrumentsController;
