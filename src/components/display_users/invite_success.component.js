import template from "./invite_success.html";

import controller from "./invite_success.controller";

const component = {
  restrict: "E",
  bindings: {
    displayId: "@",
    userId: "@",
  },
  template,
  controller,
}

export default component;
