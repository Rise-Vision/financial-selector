import sinon from "sinon";

describe( "auth", () => {
  let
    mockFb,
    touch,

    fbUpdateObjSpy;

  beforeEach( () => {
    fbUpdateObjSpy = sinon.spy( async () => {} );
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
      $provide.constant( "firebase", mockFb );
      $provide.constant( "$firebaseAuth", () => {} );
      $provide.service( "displayUsersService", () => (
          { ensureEditorRole: async () => {} }
      ) );
      $provide.service( "$firebaseObject", () => ( {
        $loaded: () => {},
      } ) );
      $provide.constant( "confirmDialog", () => true );

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
      } );
    } );
  } );

  beforeEach( window.module( require( "./auth" ).default ) );

  beforeEach( inject( ( $injector ) => {
    touch = $injector.get( "touch" );
  } ) );

  describe( "touch", () => {
    it( "should modify object attributes", ( done ) => {
      const lId = "aaaaa";

      touch( `lists/${lId}` ).then( () => {
        sinon.assert.calledOnce( fbUpdateObjSpy );
        done();
      } ).catch( done );

    } );
  } );
} );
