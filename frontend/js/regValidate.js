import $ from 'jquery';

const reLetters = /^[a-zA-Zа-яА-Я\s]+$/;
const reNumbers = /^[0-9| ()+-]*$/;
const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class RegValidation {

  constructor() {
    this.form = {
      fname: {valid: false},
      lname: {valid: false},
      phone: {valid: false},
      email: {valid: false}
    };
  }

  checkFormValidity() {
    this.form.valid = this.form.fname.valid && this.form.lname.valid
      && this.form.phone.valid && this.form.email.valid;
    if (this.form.valid) {
      $('#submitRegistrationForm').removeClass('disabled');
    } else {
      $('#submitRegistrationForm').addClass('disabled');
    }
  };

  changeInputHandler(e, regexp, name) {
    const value = e.target.value;
    this.form[name].valid = regexp.test(value);
    if (this.form[name].valid) {
      $(e.target).removeClass('error');
    } else {
      $(e.target).addClass('error');
    }
    this.checkFormValidity();
  };

  init() {
    $('#rfFirstName').on('change keyup', (e) => {
      this.changeInputHandler.call(this, e, reLetters, 'fname');
    });

    $('#rfLastName').on('change keyup', (e) => {
      this.changeInputHandler.call(this, e, reLetters, 'lname');
    });

    $('#rfPhone').on('change keyup', (e) => {
      this.changeInputHandler.call(this, e, reNumbers, 'phone');
    });

    $('#rfEmail').on('change keyup', (e) => {
      this.changeInputHandler.call(this, e, reEmail, 'email');
    });
  };

};


