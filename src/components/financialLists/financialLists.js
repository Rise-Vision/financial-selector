import angular from "angular";
import uiRouter from "angular-ui-router";
import financialListsComponent from "./financialLists.component";
import financialListAddService from "./financial_list_add.service";
import financialListRemoveService from "./financial_list_remove.service";
import displayUsersService from "../display_users/display_users.service";

const financialListsModule = angular.module( "financialLists", [
  uiRouter, ] )

  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "financialLists", {
      url: "/displays/:displayId/financial-lists",
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
  .service( "financialListRemoveService", financialListRemoveService )
  .service( "displayUsersService ", displayUsersService )

  .name;

export default financialListsModule;
