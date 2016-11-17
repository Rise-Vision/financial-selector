import template from "./search-results.html";
import controller from "./search-results.controller";

const component = {
  restrict: "E",
  bindings: {
    query: "<",
  },
  template,
  controller,
};

export default
component;
