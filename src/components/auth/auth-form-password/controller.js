class Controller {
  constructor() {
    'ngInject';

    const ctrl = this;

    ctrl.user = {
      email: '',
      password: '',
    };
  }
}

export default Controller;
