const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  e2eDisplayPath = "/displays/G6B7ET3EHGD4",
  e2eUserPath = "users/kO4s1ZzjRIP7JVhBSjQ3Etgszpm2",
  exampleUserPath = "users/e2e-editor-user%40example%2Eorg",
  exampleDisplayUserPath = "displays/G6B7ET3EHGD4/users/e2e-editor-user%40example%2Eorg";

module.exports = function() {
  describe( "Add User For Display", function() {
    this.timeout( 50000 );
    beforeEach( () => {
      browser.waitUntil( firebase.database().ref( exampleUserPath ).remove().then( () => true ) );
      browser.waitUntil( firebase.database().ref( exampleDisplayUserPath ).remove().then( () => true ) );
      browser.waitUntil( firebase.database().ref( e2eDisplayPath ).set( {
        displayName: "E2E_Test_Display"
      } ).then( () => true ) );
    } );

    it( "should add user to display", () => {
      let expectedAddedUserEmail = "e2e-editor-user@example.org";

      browser.url( e2eDisplayPath + "/users" );
      browser.waitForVisible( "#add-user-button" )
      browser.click( "#add-user-button" );
      browser.waitForVisible( "#user-email" )
      browser.element( "#user-email" ).setValue( expectedAddedUserEmail );
      browser.element( "#user-role" ).selectByValue( "Editor" );
      browser.pause( 500 );
      browser.click( "#submit-add-user" );
      browser.waitForVisible( "#invite-success-ok-button" );
      browser.click( "#invite-success-ok-button" );

      browser.waitForText( "tbody td", 10000 );
      assert.equal( browser.getText( "tbody :last-child td .e2e-user-email" ), expectedAddedUserEmail );
    } );
  } );
};
