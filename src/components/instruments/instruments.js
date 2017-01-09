import angular from "angular";
import uiRouter from "angular-ui-router";
import instrumentsComponent from "./instruments.component";
import instrumentAddService from "./instrument_add.service";
import instrumentRemoveService from "./instrument_remove.service";
import instrumentListService from "./instrument_list.service";
import instrumentSearchService from "./instrument_search.service";
import editInstrumentComponent from "./edit_instrument.component";
import authModule from "../auth/auth";

const instrumentsModule = angular.module( "instruments", [
  uiRouter, authModule ] )

  .config( ( $stateProvider ) => {
    "ngInject";
    $stateProvider.state( "instruments", {
      url: "/displays/:displayId/financial-lists/:listId",
      component: "instruments",
      resolve: {
        displayId: ( $stateParams ) => {
          "ngInject";
          return $stateParams.displayId
        },
        listId: ( $stateParams ) => {
          "ngInject";
          return $stateParams.listId
        }
      }
    } ).state( "instruments.edit", {
      url: "/instruments/:instrumentId/edit",
      component: "editInstrument",
      onEnter: ( $stateParams, $state, $uibModal, $controller ) => {
        "ngInject";

        const { listId, displayId, instrumentId } = $stateParams;

        $controller.modalInstance = $uibModal.open( {
          template: `
            <edit-instrument
              list-id="${listId}"
              display-id="${displayId}"
              instrument-id="${instrumentId}"
              >
            </edit-instrument>`,
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
  .component( "instruments", instrumentsComponent )
  .component( "editInstrument", editInstrumentComponent )
  .service( "instrumentAddService", instrumentAddService )
  .service( "instrumentRemoveService", instrumentRemoveService )
  .service( "instrumentListService", instrumentListService )
  .service( "instrumentSearchService", instrumentSearchService )

  .name;

export default instrumentsModule;
