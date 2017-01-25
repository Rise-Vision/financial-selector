import errorMessageComponent from "./error_message.component";
import sortableDirective from "./sortable.directive";
import { assert, decodeForFirebaseProp, encodeForFirebaseProp } from "../../utils";

const commonUtils = angular.module( "common-utils", [] )
  .component( "errorMessage", errorMessageComponent )
  .constant( "encodeForFirebaseProp", encodeForFirebaseProp )
  .constant( "decodeForFirebaseProp", decodeForFirebaseProp )
  .constant( "assert", assert )
  .directive( "rvSortable", sortableDirective )
  .name;

export default commonUtils;
