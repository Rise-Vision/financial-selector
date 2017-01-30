import controller from "./needVerification.controller";
import template from "./needVerification.template.html";

const component = {
  restrict: "E",
  template,
  controller,
  bindings: {
    sent: "="
  },
};

export default component;
