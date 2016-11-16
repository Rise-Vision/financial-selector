import angular from 'angular';
import AngularFire from 'angularfire';
import Firebase from 'firebase';

const m = angular.module('app-firebase', [AngularFire])

  .config(($windowProvider) => {
    'ngInject';

    const $window = $windowProvider.$get();
    const config = require('./config/firebase_config');

    $window.firebase = Firebase;

    Firebase.initializeApp(config);
  })

  .name;

export default m;
