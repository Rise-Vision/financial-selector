const e2eUserPath = "users/kO4s1ZzjRIP7JVhBSjQ3Etgszpm2",
  assert = require("assert"),
  firebase = require( "firebase-admin" ),
  testDisplayId = "G6B7ET3EHGD4";

module.exports = () => {
  it( "should enable adding a display", () => {
    let expectedAddedDisplayName = "Test_E2E_Financial_Selector"

    browser.waitUntil( firebase.database().ref( e2eUserPath ).remove().then( () => true ) );

    browser.waitForVisible( "button=Add Display" )
    browser.click( "button=Add Display" );
    browser.waitForVisible( "#display-id" )
    browser.element( "#display-id" ).setValue( "1" );
    browser.waitForVisible( "#error-message", 8000 );
    browser.element( "#display-id" ).setValue( testDisplayId );
    browser.waitForVisible( "#error-message", 9000, true )
    browser.click( "#submit-display-id" );
    browser.waitForVisible( "button=Add Display", 5000 );
    browser.waitForText( "tbody td", 10000 );
    assert.equal( browser.getText( `strong=${expectedAddedDisplayName}` ), expectedAddedDisplayName );
  } );
};
