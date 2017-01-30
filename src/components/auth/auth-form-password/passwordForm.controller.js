class PasswordFormController {
  constructor( $async ) {
    "ngInject";

    this.user = {
      email: "",
      password: "",
    };

    this.submitForm = $async( async () => {
      this.sending = true;
      await this.onSubmit( { user: this.user } );
      this.sending = false;
    } );
  }
}

export default PasswordFormController;
