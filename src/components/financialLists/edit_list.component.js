import template from "./edit_list.html";

import controller from "./edit_list.controller";

export default {
  restrict: "E",
  bindings: {
    listId: "@",
    displayId: "@",
  },
  template,
  controller
};
