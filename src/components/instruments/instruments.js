import angular from "angular";
import uiRouter from "angular-ui-router";
import instrumentsComponent from "./instruments.component";
import instrumentAddService from "./instrument_add.service";
import instrumentListService from "./instrument_list.service";
import instrumentSearchService from "./instrument_search.service";

const instrumentsModule = angular.module( "instruments", [
  uiRouter, ] )

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
    } );
  } )
  .component( "instruments", instrumentsComponent )
  .service( "instrumentAddService", instrumentAddService )
  .service( "instrumentListService", instrumentListService )
  .service( "instrumentSearchService", instrumentSearchService )

  .name;

export default instrumentsModule;
