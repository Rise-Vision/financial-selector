import angular from "angular";
import searchComponent from "./search.component";
import stockListsComponent from
  "./instrument_type/instrument_type_list.component";
import searchResultsComponent from "./search-results/search-results.component";
import instrumentTypePickerComponent from
  "./instrument_type/instrument_type_picker.component";
import instrumentTypeService from "./instrument_type/instrument_type.service";
import userInstrumentService from "./instrument_type/user_instrument.service";

const searchModule = angular.module("search", [])

  .config(($stateProvider) => {
    "ngInject";
    $stateProvider.state("lists", {
      url: "/lists",
      component: "search",
    }).state("lists.search", {
      url: "/?q",
    }).state("instrument-type-picker", {
      url: "/lists/:id",
      component: "instrumentTypePicker",
    });
  })
  .component("search", searchComponent).component("instrumentTypeList", stockListsComponent).component("searchResults", searchResultsComponent).component("instrumentTypePicker", instrumentTypePickerComponent).service("instrumentTypeService", instrumentTypeService).service("userInstrumentService", userInstrumentService)

  .name;

export default searchModule;
