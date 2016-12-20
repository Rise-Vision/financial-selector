import template from "./add_user.html";

import controller from "./add_user.controller";

export default {
  restrict: "E",
  bindings: {
    displayId: "@"
  },
  template,
  controller,
};
