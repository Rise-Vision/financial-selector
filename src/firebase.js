import angular from "angular";
import AngularFire from "angularfire";
import Firebase from "firebase";
import config from "./config/firebase-config";

const m = angular.module("app-firebase", [ AngularFire ])

  .config(($windowProvider) => {
    "ngInject";

    const $window = $windowProvider.$get();

    $window.firebase = Firebase;

    Firebase.initializeApp(config);
  })

  .name;

export default m;
