import template from "./addUser.html";

import controller from "./addUser.controller";

export default {
  restrict: "E",
  bindings: {
    displayId: "@"
  },
  template,
  controller,
};
