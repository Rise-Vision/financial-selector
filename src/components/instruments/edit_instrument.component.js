import template from "./edit_instrument.html";

import controller from "./edit_instrument.controller";

export default {
  restrict: "E",
  bindings: {
    listId: "@",
    displayId: "@",
    instrumentId: "@",
  },
  template,
  controller
};
