import template from "./instrument_type_picker.html";
import controller from "./instrument_type_picker.controller";

const component = {
  restrict: "E",
  bindings: {
    query: "<",
  },
  template,
  controller,
};

export default component;
