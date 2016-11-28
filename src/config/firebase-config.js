/*global require WEBPACK_IS_DEVELOPMENT:true*/

let firebaseConfig;

if (WEBPACK_IS_DEVELOPMENT) {
  firebaseConfig = require("./firebase-config-stage");
} else {
  firebaseConfig = require("./firebase-config-prod");
}

export default firebaseConfig
