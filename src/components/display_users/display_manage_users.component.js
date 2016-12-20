import template from "./display_manage_users.html";
import controller from "./display_manage_users.controller"

const displayManageUsersComponent = {
  restrict: "E",
  bindings: {
    displayId: "@"
  },
  template,
  controller,
};

export default displayManageUsersComponent;
