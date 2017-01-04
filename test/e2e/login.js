const path = require("path"),
  jenkinsCreds = require( path.join( __dirname, "private-keys", "financial-selector", "jenkins-creds.json" ) ),
  e2eHelper = require( "rv-common-e2e" ).helper;

module.exports = () => {
  browser.url( "/" );
  browser.element( "#google-signin" ).click();
  e2eHelper.googleSignIn( jenkinsCreds.email, jenkinsCreds.pass, "toronto" );
};
