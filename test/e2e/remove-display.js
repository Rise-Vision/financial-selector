const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  databaseURL = "https://fir-stage.firebaseio.com",
  serviceAccount = require( path.join( __dirname, "private-keys", "financial-selector", "financial-selector-stage-ee22d821c41a-service-account-e2e-tests.json" ) ),
  jenkinsCreds = require( path.join( __dirname, "private-keys", "financial-selector", "jenkins-creds.json" ) ),
  e2eUserPath = "users/kO4s1ZzjRIP7JVhBSjQ3Etgszpm2",
  e2eHelper = require( "rv-common-e2e" ).helper,
  testDisplayId = "87MMJ7XUXMDR",
  testDisplayName = "Test_E2E_Financial_Selector_Remove_Display";

firebase.initializeApp( {
  credential: firebase.credential.cert( serviceAccount ),
  databaseURL
} );

describe( "Remove Display", function() {
  this.timeout( 50000 );

  beforeEach( ( ) => {
    browser.waitUntil( firebase.database().ref( e2eUserPath ).remove().then( () => true ) );
    browser.waitUntil( firebase.database().ref( `displays/${testDisplayId}` ).set( {
      displayName: testDisplayName,
      companyId: "f114ad26-949d-44b4-87e9-8528afc76ce4",
    } ).then( () => true ) );

    browser.url( "/" );

    browser.element( "#google-signin" ).click();
    e2eHelper.googleSignIn( jenkinsCreds.email, jenkinsCreds.pass, "toronto" );
  } );

  afterEach( () => {
    browser.waitUntil( firebase.database().ref( `displays/${testDisplayId}` ).remove( ).then( () => true ) );
  } );

  it( "should remove a display", () => {

    browser.waitForText( "tbody td", 10000 );
    browser.element( `tr*=${testDisplayName}` ).click( "button=Actions" );
    browser.element( `tr*=${testDisplayName}` ).click( "span=Remove Display" );

    browser.waitForVisible( "button=OK" );
    browser.waitForVisible( "button=Cancel" );

    browser.click( "button=OK" );

    browser.waitUntil( () => !browser.element( "tbody td" ).isVisible( `tr*=${testDisplayName}` ) );
  } );
} );
