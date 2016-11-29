import angular from "angular";
import navBarComponent from "./navbar.component";

const layoutModule = angular.module( "layout", [] )

  .component( "fsNavbar", navBarComponent )

  .name;

export default layoutModule;
