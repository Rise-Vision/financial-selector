import sinon, { spy } from "sinon";

describe( "instruments", () => {
  let
    mockFb,

    fbUpdateObjSpy;

  beforeEach( () => {
    fbUpdateObjSpy = spy( async () => {} );
    mockFb = {
      database: () => ( { ref: () => ( {
        child: () => ( {
          update: fbUpdateObjSpy
        } )
      } ) } )
    };
    mockFb.database.ServerValue = {
      TIMESTAMP: new Date().getTime()
    };
    window.module( ( $provide ) => {
      $provide.constant( "authService", {
        firebaseAuthObject: {
          $onAuthStateChanged: () => {}
        },
        getMyUserId: () => "exampleUser"
      } );
      $provide.service( "financialListListService", () => ( {
        ensureICanEditList: async () => true,
      } ) );
      $provide.constant( "firebase", mockFb );
      $provide.constant( "$firebaseAuth", () => {} );

      $provide.service( "$firebaseObject", () => ( {
        $loaded: () => {},
      } ) );

      $provide.service( "$firebaseArray", () => ( {
        $extend: () => {},
      } ) );
      $provide.service( "$firebaseObject", () => ( {
        $extend: () => {},
      } ) );
      $provide.service( "$firebaseAuth", () => {} );
      $provide.constant( "$window", {
        firebase: mockFb,
        // ngChange needs this
        document: window.document,
        angular: {
          callbacks: window.angular.callbacks
        }
      } );
    } );
  } );

  beforeEach( window.module( require( "./instruments" ).default ) );

  describe( "instrumentListService", () => {
    let instrumentListService;

    beforeEach( inject( ( $injector ) => {
      instrumentListService = $injector.get( "instrumentListService" );
    } ) );
    describe( "reorder", () => {
      it( "should call proper firebase functions", async ( ) => {

        await instrumentListService.reorder( "displayA", "listB", {
          "item1": 2,
          "item3": 5
        } );

        sinon.assert.calledWith( fbUpdateObjSpy, { order: 2 } );
        sinon.assert.calledWith( fbUpdateObjSpy, { order: 5 } );
      } );
    } );
  } );
} );
