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
        let displayObj = await displayUsersService.getDisplay( ctrl.displayId );

        ctrl.displayName = displayObj.displayName;
        ctrl.email = decodeForFirebaseProp( ctrl.userId );
        ctrl.mailTo = `mailto:${ctrl.userId}?target=_blank&subject=${encodeURIComponent( "Rise Financial Selector - I've added you as a User for Display " + ctrl.displayName )}&body=${encodeURIComponent( "I've added you as a User to Rise Vision Financial Selector. With this you can control what stocks appear on the Display, " + ctrl.displayName + ".\n\nYour username is " + ctrl.email + ". You can use Google Authentication as your password. If you don't want to use Google Authentication, or " + ctrl.email + " is not a Google Account, you can create your own password at https://selector.risevision.com/signup.\n\n" )}`;
      } catch ( e ) {
        ctrl.errorMessage = `failed to load invite: ${e.message}`;
        console.error( e );
      }
    } );
  }
}

export default inviteSuccessController;
