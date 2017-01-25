import angular from "angular";
import uiRouter from "angular-ui-router";
import homeComponent from "./home.component";
import unauthorizedLayoutTemplate from "./unauthorized.layout.html";

const homeModule = angular.module( "home", [
  uiRouter, ] )

  .config( ( $stateProvider, $urlRouterProvider ) => {
    "ngInject";

    $urlRouterProvider.otherwise( "/" );

    $stateProvider
    .state( "unauthorized", {
      url: "",
      abstract: true,
      template: unauthorizedLayoutTemplate,
    } )
    .state( "unauthorized.home", {
      url: "/",
      component: "home",
      onEnter: ( authService, $state ) => {
        "ngInject";

        authService.getAuth().then( ( auth ) => {
          if ( auth ) {
            $state.go( "displays" );
          }
        } );
      }
    } );
  } )

  .component( "home", homeComponent )

  .name;

export default homeModule;
