class inviteSuccessController {
  constructor( $state, decodeForFirebaseProp, displayUsersService, $scope, $async ) {
    "ngInject";

    const ctrl = this;

    ctrl.$onInit = () => {
      _populateInvite();
    };

    ctrl.ok = () => {
      $state.go( "^" );
    }

    let _populateInvite = $async( async () => {
      try {
        ctrl.email = decodeForFirebaseProp( ctrl.userId );
        ctrl.mailTo = `mailto:${ctrl.userId}?subject=${encodeURIComponent( "Rise Financial Selector - I've added you as a User for Display " + ctrl.displayId )}&body=${encodeURIComponent( "You can now manage the Financial Instruments for the " + ctrl.displayId + " Display. Just sign in at https://selector.risevision.com using USERID as your username.\n\nIf USERID is a Google Account just select Log in with Google.\n\nIf USERID is not a Google Account you'll need to sign up and create your password first if you haven't already. You can do that here, https://selector.risevision.com/signup.\n\nThanks,\n\n" )}`;
        ctrl.mailTo = ctrl.mailTo.replace( /USERID/g, ctrl.userId );
      } catch ( e ) {
        ctrl.errorMessage = `failed to load invite: ${e.message}`;
        console.error( e );
      }
    } );
  }
}

export default inviteSuccessController;
