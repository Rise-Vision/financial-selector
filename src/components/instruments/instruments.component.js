import template from "./instruments.html";
import controller from "./instruments.controller";

const instrumentsComponent = {
  restrict: "E",
  bindings: { displayId: "@", listId: "@" },
  template,
  controller,
};

export default instrumentsComponent;
