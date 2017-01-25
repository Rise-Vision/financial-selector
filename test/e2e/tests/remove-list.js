const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  e2eDisplayPath = "/displays/G6B7ET3EHGD4";

module.exports = function() {
  describe( "Remove List", function() {
    this.timeout( 50000 );

    it( "should enable list removal", () => {
      let listRef;
      browser.waitUntil( firebase.database().ref( e2eDisplayPath + "/lists" ).remove().then(()=>true));
      listRef = firebase.database().ref( "lists" ).push( {listName: "e2e-test-list"} );
      browser.waitUntil( firebase.database().ref( e2eDisplayPath + "/lists" ).child(listRef.key).set( true ).then(()=>true));
      browser.url( e2eDisplayPath + "/financial-lists" );

      browser.waitForExist( "td=e2e-test-list" )
      browser.waitForVisible( "td div button" )
      browser.click( "td div button" );
      browser.click( "span=Remove List" );

      browser.waitForVisible( "button=OK" );
      browser.waitForVisible( "button=Cancel" );

      browser.click( "button=OK" );

      browser.waitForExist( "td=e2e-test-list", 3000, true )
      browser.waitUntil( firebase.database().ref( e2eDisplayPath + "/lists" ).once( "value" ).then( ( snap ) => !snap.hasChild( listRef.key ) ) );
    } );
  } );
};
