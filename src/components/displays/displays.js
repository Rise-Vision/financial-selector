import angular from "angular";
import uiRouter from "angular-ui-router";
import displaysComponent from "./displays.component";

const displaysModule = angular.module( "displays", [ uiRouter, ] )
  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "displays", {
      url: "/displays",
      component: "displays",
    } );
  } )
  .component( "displays", displaysComponent )
  .name;

export default displaysModule;
