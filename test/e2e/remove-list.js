const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  e2eDisplayPath = "/displays/G6B7ET3EHGD4",
  e2eHelper = require( "rv-common-e2e" ).helper;

module.exports = function() {
  xdescribe( "Remove List is disabled until the show list functionality is working", function() {
    this.timeout( 50000 );

    it( "should enable list removal", () => {
      browser.waitUntil( firebase.database().ref( e2eDisplayPath ).remove().then( () => true ) );
      browser.url( e2eDisplayPath + "/financial-lists" );

      browser.waitForVisible( "a=Add List" )
      browser.click( "a=Add List" );
      browser.waitForVisible( "#add-list-input" )
      browser.element( "#add-list-input" ).setValue( "e2e-test-list" );
      browser.click( "#submit-add-list" );
      browser.waitForVisible( "a=Add List", 5000 );
      browser.waitUntil( firebase.database().ref( e2eDisplayPath ).once( "value" ).then( ( snap ) => snap.hasChild( "lists" ) ) );
    } );
  } );
};
