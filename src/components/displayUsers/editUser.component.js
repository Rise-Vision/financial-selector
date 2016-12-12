import template from "./editUser.html";

import controller from "./editUser.controller";

export default {
  restrict: "E",
  bindings: {
    userId: "@",
    displayId: "@",
  },
  template,
  controller,
};
