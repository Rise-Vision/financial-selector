import controller from "./forgetPassword.controller";
import template from "./forgetPassword.template.html";

const component = {
  restrict: "E",
  template,
  controller,
  bindings: {
    sent: "="
  },
};

export default component;
