import template from "./inviteSuccess.html";

import controller from "./inviteSuccess.controller";

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
