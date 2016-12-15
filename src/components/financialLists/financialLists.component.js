import template from "./financialLists.html";
import controller from "./financialLists.controller";

const financialListsComponent = {
  restrict: "E",
  bindings: { displayId: "@" },
  template,
  controller,
};

export default financialListsComponent;
