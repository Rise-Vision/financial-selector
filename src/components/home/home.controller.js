class HomeController {
  constructor( displayService ) {
    "ngInject";

    /*eslint-disable no-console*/
    console.log( "displayService.list", displayService.list );

    this.name = "home";
  }
}

export default HomeController;
