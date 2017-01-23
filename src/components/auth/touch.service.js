
function touchFactory( $firebaseObject, authService, $window ) {
  "ngInject";

  return async function touch( path ) {
    const root = $window.firebase.database().ref();

    await root.child( path ).update( {
      changeDate: $window.firebase.database.ServerValue.TIMESTAMP,
      modifiedBy: await authService.getMyEmail()
    } );

    return true;
  }
}

export default touchFactory;
