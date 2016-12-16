import angular from "angular";
import uiRouter from "angular-ui-router";
import financialListsComponent from "./financialLists.component";
import financialListAddService from "./financial_list_add.service";

const financialListsModule = angular.module( "financialLists", [
  uiRouter, ] )

  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "financialLists", {
      url: "/displays/:displayId/financialLists",
      component: "financialLists",
      resolve: {
        displayId: ( $stateParams ) => {
          "ngInject";
          return $stateParams.displayId
        }
      }
    } );
  } )
  .component( "financialLists", financialListsComponent )
  .service( "financialListAddService", financialListAddService )

  .name;

export default financialListsModule;
