import confirmDialog from "./confirm_dialog.service";

const confirmDialogModule = angular.module( "confirm-dialog", [] )
  .factory( "confirmDialog", confirmDialog )
  .name;

export default confirmDialogModule;
