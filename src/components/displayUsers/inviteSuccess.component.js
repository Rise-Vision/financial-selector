import template from "./inviteSuccess.html";

import controller from "./inviteSuccess.controller";

const component = {
  restrict: "E",
  bindings: {
    inviteKey: "@"
  },
  template,
  controller,
}

export default component;
