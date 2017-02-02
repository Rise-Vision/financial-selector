import angular from "angular";
import uiRouter from "angular-ui-router";
import displaysComponent from "./displays.component";
import displayValidationService from "./display_validate.service";
import displaySaveService from "./display_save.service";
import displayListService from "./display_list.service";
import commonUtils from "../common_utils";
import confirmDialog from "../confirm_dialog";

const displayValidationURL = "https://rvaserver2.appspot.com/_ah/api" +
"/content/v0/display?fields=item(displayName,companyId)&id=DISPLAYID",

  companyIdOrOldDisplayIdLength = 36,
  recentDisplayIdLength = 12,

  displaysModule = angular.module( "displays", [ commonUtils, uiRouter, confirmDialog ] )
  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "displays", {
      url: "/displays",
      component: "displays",
    } );
  } )
  .constant( "displayValidationURL", displayValidationURL )
  .constant( "companyIdOrOldDisplayIdLength", companyIdOrOldDisplayIdLength )
  .constant( "recentDisplayIdLength", recentDisplayIdLength )
  .component( "displays", displaysComponent )
  .service( "displayValidationService", displayValidationService )
  .service( "displaySaveService", displaySaveService )
  .service( "displayListService", displayListService )
  .run( recordFullStoryDisplayId )
  .name;

function recordFullStoryDisplayId( $transitions, $window, $stateParams ) {
  "ngInject";

  $transitions.onSuccess( {
    from: "*",
    to: ( state ) => {
      //only record on routes with display id as a route parameter
      return !!state.params.displayId;
    },
  }, async () => {
    $window.FS.setUserVars( {
      displayId: $stateParams.displayId
    } );
    return true;
  } );
}

export default displaysModule;
