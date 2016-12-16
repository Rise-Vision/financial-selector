const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  databaseURL = "https://fir-stage.firebaseio.com",
  serviceAccount = require( path.join( __dirname, "private-keys", "financial-selector", "financial-selector-stage-ee22d821c41a-service-account-e2e-tests.json" ) ),
  jenkinsCreds = require( path.join( __dirname, "private-keys", "financial-selector", "jenkins-creds.json" ) ),
  e2eUserPath = "users/kO4s1ZzjRIP7JVhBSjQ3Etgszpm2",
  e2eHelper = require( "rv-common-e2e" ).helper;

firebase.initializeApp( {
  credential: firebase.credential.cert( serviceAccount ),
  databaseURL
} );

describe( "Add Display", function() {
  this.timeout( 50000 );

  it( "should enable adding a display", () => {
    let expectedAddedDisplayName = "Test_E2E_Financial_Selector"

    browser.url( "/" );

    browser.waitUntil( firebase.database().ref( e2eUserPath ).remove().then( () => true ) );

    browser.element( "#google-signin" ).click();

    e2eHelper.googleSignIn( jenkinsCreds.email, jenkinsCreds.pass, "toronto" );

    browser.waitForVisible( "button=Add Display" )
    browser.click( "button=Add Display" );
    browser.waitForVisible( "#display-id" )
    browser.element( "#display-id" ).setValue( "1" );
    browser.waitForVisible( "#error-message", 8000 );
    browser.element( "#display-id" ).setValue( "G6B7ET3EHGD4" );
    browser.waitForVisible( "#error-message", 9000, "inverse" )
    browser.pause( 500 );
    browser.click( "#submit-display-id" );
    browser.waitForVisible( "button=Add Display", 5000 );
    browser.waitForText( "tbody td", 10000 );
    assert.equal( browser.getText( "tbody :last-child td strong" ), expectedAddedDisplayName );
  } );
} );
