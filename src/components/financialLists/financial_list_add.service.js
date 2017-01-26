class financialListAddService {
  constructor( $window, authService ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      async add( name, displayId = "tempDisplayId" ) {
        let key = root.child( "lists" ).push().key,
          email = await authService.getMyEmail(),
          addData = {};

        addData[ "/lists/" + key ] = {
          listName: name,
          displayId: displayId,
          instruments: {},
          creationDate: $window.firebase.database.ServerValue.TIMESTAMP,
          changeDate: $window.firebase.database.ServerValue.TIMESTAMP,
          modifiedBy: email,
        };

        addData[ "/displays/" + displayId + "/lists/" + key ] = true;

        await root.update( addData )

      }
    };
  }
}

export default financialListAddService
