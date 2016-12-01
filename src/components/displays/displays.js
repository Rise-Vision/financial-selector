import angular from "angular";
import uiRouter from "angular-ui-router";
import displaysComponent from "./displays.component";
import displayValidationService from "./display_validate.service";
import displaySaveService from "./display_save.service";
import displayListService from "./display_list.service";

const displayValidationURL = "https://rvaserver2.appspot.com/_ah/api" +
"/content/v0/display?fields=item(displayName,companyId)&id=DISPLAYID",

  displaysModule = angular.module( "displays", [ uiRouter ] )
  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "displays", {
      url: "/displays",
      component: "displays",
    } );
  } )
  .constant( "displayValidationURL", displayValidationURL )
  .component( "displays", displaysComponent )
  .service( "displayValidationService", displayValidationService )
  .service( "displaySaveService", displaySaveService )
  .service( "displayListService", displayListService )
  .name;

export default displaysModule;
