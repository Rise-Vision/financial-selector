class displaySaveService {
  constructor( $window, $firebaseObject, displayValidationService ) {
    "ngInject";

    const root = $window.firebase.database().ref();

    return {
      async save( displayId ) {
        let displayRec = $firebaseObject(
          root.child( `displays/${displayId}` )
          );

        await displayRec.$loaded();
        const displayInfo = await displayValidationService.validateAndGet( displayId ),
          { companyId, displayName } = displayInfo;

        Object.assign( displayRec, { companyId, displayName } );

        return await displayRec.$save();
      }
    };
  }
}

export default displaySaveService;
