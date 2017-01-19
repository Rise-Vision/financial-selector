function encodeForFirebaseProp( email ) {
  return encodeURIComponent( email ).replace( /\./g, "%2E" );
}

function decodeForFirebaseProp( path ) {
  return decodeURIComponent( path );
}

module.exports = {
  decodeForFirebaseProp, encodeForFirebaseProp
};
