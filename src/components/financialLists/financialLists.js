import angular from "angular";
import uiRouter from "angular-ui-router";
import financialListsComponent from "./financialLists.component";
import financialListAddService from "./financial_list_add.service";
import financialListRemoveService from "./financial_list_remove.service";
import financialListListService from "./financial_list_list.service.js";
import displayUsersService from "../display_users/display_users.service";
import editListComponent from "./edit_list.component";

import displaysModule from "../displays/displays";
import authModule from "../auth/auth";

const financialListsModule = angular.module( "financialLists", [
  uiRouter, displaysModule, authModule ] )

  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "financialLists", {
      url: "/displays/:displayId/financial-lists",
      component: "financialLists",
      abstract: false,
      resolve: {
        displayId: ( $stateParams ) => {
          "ngInject";
          return $stateParams.displayId
        }
      }
    } ).state( "financialLists.edit", {
      url: "/:listId/edit",
      component: "editFinancialList",
      onEnter: ( $stateParams, $state, $uibModal, $controller ) => {
        "ngInject";

        const { listId, displayId } = $stateParams;

        $controller.modalInstance = $uibModal.open( {
          template: `
            <edit-financial-list
              list-id="${listId}"
              display-id="${displayId}"
              >
            </edit-financial-list>`,
          // cannot dismiss dialog without clicking "cancel"
          backdrop: "static",
        } );
      },
      onExit: ( $controller ) => {
        "ngInject";
        $controller.modalInstance.close();
      }
    } );
  } )
  .component( "financialLists", financialListsComponent )
  .component( "editFinancialList", editListComponent )
  .service( "financialListAddService", financialListAddService )
  .service( "financialListRemoveService", financialListRemoveService )
  .service( "financialListListService", financialListListService )
  .service( "displayUsersService ", displayUsersService )
  .name;

export default financialListsModule;
