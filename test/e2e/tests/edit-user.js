const { encodeForFirebaseProp } = require( "../../../src/utils" );

const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  e2eDisplayId = "G6B7ET3EHGD4",
  e2eDisplayPath = `/displays/${e2eDisplayId}`,
  e2eUserEmail = "e2e-editor-user2@example.org",
  exampleUserPath = "users/e2e-editor-user%40example%2Eorg",
  exampleDisplayUserPath = `displays/${e2eDisplayId}/users/${encodeForFirebaseProp( e2eUserEmail )}`;

module.exports = function() {
  describe( "Edit User For Display", function() {
    this.timeout( 50000 );
    beforeEach( () => {
      browser.waitUntil( firebase.database().ref( exampleUserPath ).remove().then( () => true ) );
      browser.waitUntil( firebase.database().ref( exampleDisplayUserPath ).remove().then( () => true ) );
      browser.waitUntil( firebase.database().ref( e2eDisplayPath ).set( {
        displayName: "E2E_Test_Display",
        companyId: "a6397169-ad53-4163-9e08-da3e53f3a413"
      } ).then( () => true ) );
      browser.waitUntil( firebase.database()
        .ref( `${e2eDisplayPath}/users/${encodeForFirebaseProp( e2eUserEmail )}` )
        .set( true ).then( () => true ) );
      browser.waitUntil( firebase.database()
        .ref( `users/${encodeForFirebaseProp( e2eUserEmail )}/displays/${e2eDisplayId}` )
        .set( {
          accepted: true,
          role: "DisplayAdmin"
        } ).then( () => true ) );
    } );

    it( "should edit user", () => {
      let expectedAddedUserEmail = e2eUserEmail;

      browser.url( e2eDisplayPath + "/users" );

      browser.waitForText( "tbody td", 10000 );
      browser.click( "tbody :last-child td .user-actions-dropdown" );
      browser.click( "tbody :last-child td .action-edit-user" );
      browser.waitForVisible( "#edit-user-save-button" );
      browser.element( "#user-role" ).selectByValue( "Editor" );
      browser.click( "#edit-user-save-button" );
      assert.equal( browser.getText( "tbody :last-child td.e2e-user-role" ), "Editor" );
    } );
  } );
};
