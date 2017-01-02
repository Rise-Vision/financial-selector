import confirmTemplate from "./confirm_dialog.html" ;

function confirmDialog( $uibModal, $q ) {
  "ngInject";

  return function confirmDialog( {
     title, content,
     okButton = "OK",
     cancelButton = "Cancel",
     confirmValue = true,
     dismissValue = false,
     } ) {
    let deferred = $q.defer();

    $uibModal.open( {
      template: confirmTemplate,
      controller: function modalController(
        $scope, $uibModalInstance ) {
        "ngInject";

        $scope.confirmationTitle = title;
        $scope.confirmationMessage = content;
        $scope.confirmationButton = okButton;
        $scope.cancelButton = cancelButton;

        $scope.ok = () => {
          $uibModalInstance.close( );
        };

        $scope.cancel = () => {
          $uibModalInstance.dismiss( );
        };
      },
    } ).result.then( () => {
      deferred.resolve( confirmValue );
    }, () => {
      deferred.resolve( dismissValue );
    } );

    return deferred.promise;
  }
}

export default confirmDialog;
