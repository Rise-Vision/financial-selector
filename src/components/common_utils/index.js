import errorMessageComponent from "./error_message.component";

const commonUtils = angular.module( "common-utils", [] )
  .component( "errorMessage", errorMessageComponent )
  .constant( "encodeForFirebaseProp", encodeForFirebaseProp )
  .constant( "decodeForFirebaseProp", decodeForFirebaseProp )
  .name;

function encodeForFirebaseProp( email ) {
  return encodeURIComponent( email ).replace( /\./g, "%2E" );
}

function decodeForFirebaseProp( path ) {
  return decodeURIComponent( path );
}

export default commonUtils;
