const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  e2eDisplayPath = "/displays/G6B7ET3EHGD4";

module.exports = function() {
  describe( "Add List", function() {
    this.timeout( 50000 );

    it( "should enable adding a list", () => {
      browser.waitUntil( firebase.database().ref( e2eDisplayPath ).remove().then( () => true ) );
      browser.url( e2eDisplayPath + "/financial-lists" );

      browser.waitForVisible( "#add-list-button" )
      browser.click( "#add-list-button" );
      browser.waitForVisible( "#add-list-input" )
      browser.element( "#add-list-input" ).setValue( "e2e-test-list" );
      browser.click( "#submit-add-list" );
      browser.waitForVisible( "#add-list-button", 5000 );
      browser.waitUntil( firebase.database().ref( e2eDisplayPath ).once( "value" ).then( ( snap ) => snap.hasChild( "lists" ) ) );
    } );
  } );
};
