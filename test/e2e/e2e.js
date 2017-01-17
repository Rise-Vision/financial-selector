const assert = require( "assert" ),
  path = require( "path" ),
  testsPath = "tests",
  firebase = require( "firebase-admin" ),
  databaseURL = "https://fir-stage.firebaseio.com",
  serviceAccount = require( path.join( __dirname, "private-keys", "financial-selector", "financial-selector-stage-ee22d821c41a-service-account-e2e-tests.json" ) );

firebase.initializeApp( {
  credential: firebase.credential.cert( serviceAccount ),
  databaseURL
} );

let tests = require("fs").readdirSync(path.join(__dirname, testsPath));

before("log in before all other tests", function() {
  require("./login")();
});

describe( "E2E Tests", function() {
  this.timeout( 90000 );

  tests.filter((el)=>!el.includes(".swp")).forEach((test)=>require(path.join(__dirname, testsPath, test))());
} );
