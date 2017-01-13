import angular from "angular";
import uiRouter from "angular-ui-router";

// Note: order here is important: Rise CSS must be loaded first for some
// of the CSS override below to work.
import "rv-common-style/dist/css/rise.css";
import "normalize.css";

import Components from "./components/components";
import Firebase from "./firebase";
import AppComponent from "./app.component";
import UIBootstrap from "angular-ui-bootstrap";
import "angular-spinner";
import "angular-async-await";


angular.module( "app", [
  "angular-async-await",
  "angularSpinner",
  uiRouter,
  Components,
  Firebase,
  UIBootstrap,
] ).config( ( $locationProvider ) => {
  "ngInject";

    // @see:
    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode( true ).hashPrefix( "!" );
} ).component( "app", AppComponent );

import "./constants";
