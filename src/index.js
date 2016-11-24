import angular from "angular";
import uiRouter from "angular-ui-router";
import Components from "./components/components";
import Firebase from "./firebase";
import AppComponent from "./app.component";
import UIBootstrap from "angular-ui-bootstrap";
import "rv-common-style/dist/css/rise.css";
import "normalize.css";

/*eslint no-undef: "error"*/
/*eslint-env node*/

require( "ng-gapi-loader/src/js/svc-gapi.js" );
require( "ng-core-api-client/src/js/svc-core-util" );
require( "ng-core-api-client/src/js/svc-cache" );
require( "ng-core-api-client/src/js/svc-display" );

angular.module( "app", [
  uiRouter, Components, Firebase, UIBootstrap, ] ).config( ( $locationProvider ) => {
    "ngInject";

    // @see:
    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode( true ).hashPrefix( "!" );
  } ).component( "app", AppComponent )
  // TODO: move this to a separate file
  .constant( "CORE_URL", "TODO" );

import "./constants";
