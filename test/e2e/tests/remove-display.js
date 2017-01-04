const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  e2eUserPath = "users/kO4s1ZzjRIP7JVhBSjQ3Etgszpm2",
  testDisplayId = "87MMJ7XUXMDR",
  testDisplayName = "Test_E2E_Financial_Selector_Remove_Display";

module.exports = function() {
  describe( "Remove Display", function() {
    this.timeout( 50000 );

    beforeEach( ( ) => {
      browser.waitUntil( firebase.database().ref( e2eUserPath ).remove().then( () => true ) );
      browser.waitUntil( firebase.database().ref( `displays/${testDisplayId}` ).set( {
        displayName: testDisplayName,
        companyId: "f114ad26-949d-44b4-87e9-8528afc76ce4",
      } ).then( () => true ) );
    } );

    afterEach( () => {
      browser.waitUntil( firebase.database().ref( `displays/${testDisplayId}` ).remove( ).then( () => true ) );
    } );

    it( "should remove a display", () => {
      browser.url( "/displays" );
      browser.waitForText( "tbody td", 10000 );
      browser.element( `tr*=${testDisplayName}` ).click( "button=Actions" );
      browser.element( `tr*=${testDisplayName}` ).click( "span=Remove Display" );

      browser.waitForVisible( "button=OK" );
      browser.waitForVisible( "button=Cancel" );

      browser.click( "button=OK" );

      browser.waitUntil( () => !browser.element( "tbody td" ).isVisible( `tr*=${testDisplayName}` ) );
    } );
  } );
};
