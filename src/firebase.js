import angular from "angular";
import AngularFire from "angularfire";
import Firebase from "firebase";
import config from "./config/firebase-config";

const m = angular.module( "app-firebase", [ AngularFire ] )
  .constant( "firebase", Firebase )
  .config( ( $windowProvider, firebase ) => {
    "ngInject";

    const $window = $windowProvider.$get();

    $window.firebase = firebase;

    Firebase.initializeApp( config );
  } )

  .name;

export default m;
