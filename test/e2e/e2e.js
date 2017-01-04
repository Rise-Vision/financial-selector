const assert = require( "assert" ),
  path = require( "path" ),
  firebase = require( "firebase-admin" ),
  databaseURL = "https://fir-stage.firebaseio.com",
  serviceAccount = require( path.join( __dirname, "private-keys", "financial-selector", "financial-selector-stage-ee22d821c41a-service-account-e2e-tests.json" ) ),
  e2eDisplayPath = "/displays/G6B7ET3EHGD4";

firebase.initializeApp( {
  credential: firebase.credential.cert( serviceAccount ),
  databaseURL
} );

let tests = [
  require("./add-display"),
  require("./add-list"),
  require("./add-user"),
  require("./remove-display"),
  require("./remove-list"),
];

before("log in before all other tests", function() {
  require("./login")();
});

describe( "E2E", function() {
  this.timeout( 90000 );

  tests.forEach((test)=>test());
} );
