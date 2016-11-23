import angular from "angular";
import uiRouter from "angular-ui-router";
import financialListsComponent from "./financialLists.component";

const financialListsModule = angular.module( "financialLists", [
  uiRouter, ] )

  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "financialLists", {
      url: "/financialLists",
      component: "financialLists",
    } );
  } )
  .component( "financialLists", financialListsComponent )

  .name;

export default financialListsModule;
