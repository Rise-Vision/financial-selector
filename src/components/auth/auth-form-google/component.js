import template from "./template.html";
import controller from "./controller";
import "./styles.css";

const component = {
  restrict: "E",
  template,
  controller,
  bindings: {
    error: "=",
    formTitle: "@",
    submitAction: "&",
  },
};

export default component;
