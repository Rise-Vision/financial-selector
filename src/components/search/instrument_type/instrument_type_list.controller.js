class InstrumentTypeListController {
  constructor( instrumentTypeService ) {
    "ngInject";

    const ctrl = this;

    instrumentTypeService.initialize();

    ctrl.stockLists = instrumentTypeService.getInstrumentGroups();
  }
}

export default InstrumentTypeListController;
