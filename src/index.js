import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from './components/components';
import Firebase from './firebase';
import AppComponent from './app.component';
import UIBootstrap from 'angular-ui-bootstrap';
import 'rv-common-style/dist/css/rise.css';
import 'normalize.css';

angular.module('app', [
  uiRouter,
  Components,
  Firebase,
  UIBootstrap,
])
  .config(($locationProvider) => {
    'ngInject';

    // @see:
    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);

require('./constants');
