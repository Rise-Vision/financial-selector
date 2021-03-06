import template from "./displays.html";
import controller from "./displays.controller";

const displaysComponent = {
  restrict: "E",
  bindings: {
    displayId: "@"
  },
  template,
  controller,
};

export default displaysComponent;
