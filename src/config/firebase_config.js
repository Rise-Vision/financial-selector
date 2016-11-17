/*global require WEBPACK_IS_DEVELOPMENT:true*/

let firebaseConfig;

if ( WEBPACK_IS_DEVELOPMENT ) {
  firebaseConfig = require( "./firebase_config_stage" );
} else {
  firebaseConfig = require( "./firebase_config_prod" );
}

export default firebaseConfig
