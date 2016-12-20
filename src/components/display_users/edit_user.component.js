import template from "./edit_user.html";

import controller from "./edit_user.controller";

export default {
  restrict: "E",
  bindings: {
    userId: "@",
    displayId: "@",
  },
  template,
  controller,
};
