import DisplayModule from "./displays";

describe( "Displays", () => {
  let $rootScope,
    $state,
    $location,
    $componentController,
    $compile;

  beforeEach( () => {
    window.module( ( $provide ) => {
      $provide.service( "authService", () => {} );
      $provide.service( "displayUsersService", () => {} );
      $provide.service( "$firebaseObject", () => {} );
      $provide.constant( "$async", () => async () => {} );
      $provide.constant( "confirmDialog", () => true );

      $provide.service( "$firebaseArray", () => ( {
        $extend: () => {},
      } ) );
      $provide.service( "$firebaseAuth", () => {} );
      $provide.constant( "$window", {
        firebase: {
          database: () => ( { ref: () => {} } )
        },
        // ngChange needs this
        document: window.document,
      } );
    } );
  } );

  beforeEach( window.module( DisplayModule ) );

  beforeEach( inject( ( $injector ) => {
    $rootScope = $injector.get( "$rootScope" );
    $componentController = $injector.get( "$componentController" );
    $state = $injector.get( "$state" );
    $location = $injector.get( "$location" );
    $compile = $injector.get( "$compile" );
  } ) );

  describe( "Module", () => {
    // top-level specs: i.e., routes, injection, naming
    it( "default component should be home", () => {
      $location.url( "/displays" );
      $rootScope.$digest();
      expect( $state.current.component ).to.eq( "displays" );
    } );
  } );

  describe( "Controller", () => {
    // controller specs
    let controller;

    beforeEach( () => {
      controller = $componentController( "displays", {
        $scope: $rootScope.$new()
      } );
    } );

    it( "has a name property", () => {
      // erase if removing this.name from the controller
      expect( controller ).to.have.property( "name" );
    } );
  } );

  describe( "View", () => {
    // view layer specs.
    let scope,
      template;

    beforeEach( () => {
      scope = $rootScope.$new();
      template = $compile( "<displays></displays>" )( scope );
      scope.$apply();
    } );

    it( "has add display button", () => {
      expect( template[ 0 ].querySelector( "#add-display-button" ).innerHTML ).to.include( "Add Display" );
    } );
  } );
} );
