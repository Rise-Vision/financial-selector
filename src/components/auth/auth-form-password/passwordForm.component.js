import controller from "./passwordForm.controller";
import template from "./passwordForm.template.html";

const component = {
  restrict: "E",
  template,
  controller,
  bindings: {
    onSubmit: "&",
    submitButtonText: "@"
  },
};

export default component;
