import _ from "lodash";

class InstrumentsController {
  constructor( displayUsersService, instrumentListService, instrumentAddService,
    instrumentRemoveService, instrumentSearchService, $state, authService, displayValidationService,
    $async, $scope ) {
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
      _validateAndPopulateDisplayInfo();
    };

    $scope.$watch( "$ctrl.instrumentListObj.instruments", ( newL ) => {
      this.instrumentList = _
        .chain( newL )
        .keys()
        .map( ( $id ) => Object.assign( { $id }, newL[ $id ] ) )
        .orderBy( "order" )
        .value();

    }, true );

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

      this.errorMessage = "";
      this.searching = true;
      promise.then( ( res ) => {
        this.instrumentSearch = res;
        this.searching = false;
      } )
      .catch( ( err ) => {
        this.errorMessage = "Failed search";
        console.error( err );
      } );
    };

    this.searchInstruments();

    this.addInstrument = () => {
      let instrumentsToAdd = this.instrumentSearch.filter( el => el.isSelected );

      this.errorMessage = "";

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

    this.removeInstrument = ( key ) => {
      this.errorMessage = "";

      instrumentRemoveService.remove( key, this.listId )
      .catch( ( err ) => {
        _outputErr( "Failed to remove instrument", err );
      } );
    };

    this.sortItem = $async( async( evt ) => {
      const { oldIndex, newIndex } = evt,
        { displayId, listId } = this,

        oldSeq = this.instrumentList.map( ( inst ) => inst.$id ),
        newSeq = _move( oldSeq, oldIndex, newIndex ),

        oldOrderMap = _orderMap( oldSeq ),
        newOrderMap = _orderMap( newSeq ),

        diffMap = _diffMap( oldOrderMap, newOrderMap );

      try {
        await instrumentListService.reorder( displayId, listId, diffMap );
      } catch ( err ) {
        _outputErr( "Failed to reorder instrument", err );
      }
    } )

    let loadMyRoleFor = $async( async( displayId, bindTo ) => {
        bindTo.myRole = await displayUsersService.myRoleFor( displayId );
        if ( ![ "DisplayAdmin", "RiseAdmin", "Editor" ].includes( this.myRole ) ) {
          $state.go( "home" );
        }
      } ),

      _validateAndPopulateDisplayInfo = $async( async() => {
        const { displayId } = this;

        try {
          this.displayInfo = await displayValidationService.validateAndGet( displayId );
        } catch ( e ) {
          _outputErr( "Failed to validate display", e );
        }
      } ),
      _outputErr = ( msg, e ) => {
        console.error( e );
        this.errorMessage = `${msg}: ${e.message}`;
      }
  }
}

function _move( arr, oldIndex, newIndex ) {
  // immutable
  let r = arr.concat( [] );

  if ( newIndex >= r.length ) {
    let k = newIndex - r.length;

    while ( ( k-- ) + 1 ) {
      r.push( undefined );
    }
  }
  r.splice( newIndex, 0, r.splice( oldIndex, 1 )[ 0 ] );
  return r;
}

function _orderMap( arrOfStrings ) {
  const indices = _.range( arrOfStrings.length );

  return _.zipObject( arrOfStrings, indices );
}

function _diffMap( fromMap, toMap ) {
  const diff = {};

  _.forIn( fromMap, ( order, id ) => {
    if ( toMap[ id ] !== order ) {
      //register new order
      diff[ id ] = toMap[ id ];
    }
  } );

  return diff;
}

export default InstrumentsController;
