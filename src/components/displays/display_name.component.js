const displayNamecomponent = {
  restrict: "AE",
  bindings: {
    displayId: "@",
    template: "<span>{{$ctrl.displayName}}</span>",
    controller: function DisplayNameController( displayValidationService ) {
      "ngInject";
    }
  }
}
