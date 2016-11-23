import template from "./displayManageUsers.html";
import controller from "./displayManageUsers.controller"

const displayManageUsersComponent = {
  restrict: "E",
  bindings: {
    displayId: "@"
  },
  template,
  controller,
};

export default displayManageUsersComponent;
