function encodeForFirebaseProp( email ) {
  return encodeURIComponent( email ).replace( /\./g, "%2E" );
}

function decodeForFirebaseProp( path ) {
  return decodeURIComponent( path );
}

function assert( val ) {
  if ( val === null || val === undefined ) {
    throw new Error( "Value is required." );
  }
}

module.exports = {
  assert,
  encodeForFirebaseProp,
  decodeForFirebaseProp
};
