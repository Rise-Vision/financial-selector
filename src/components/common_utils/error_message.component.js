import template from "./error_message.html";

const errorMessageComponent = {
  restrict: "E",
  bindings: { message: "=" },
  template,
  controller: function ErrorMessageController() {
  }
};

export default errorMessageComponent;
