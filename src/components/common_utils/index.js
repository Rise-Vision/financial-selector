import errorMessageComponent from "./error_message.component";

const commonUtils = angular.module( "common-utils", [] )
  .component( "errorMessage", errorMessageComponent )
  .name;

export default commonUtils;
