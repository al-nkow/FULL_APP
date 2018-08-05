import $ from 'jquery';

export default class Validation {

  constructor() {
    this.orderForm = {
      fname: {valid: false},
      lname: {valid: false},
      phone: {valid: false},
      email: {valid: false}
    };
  }

  checkFormValidity() {
    this.orderForm.valid = this.orderForm.fname.valid && this.orderForm.lname.valid
      && this.orderForm.phone.valid && this.orderForm.email.valid && $('#pieOffer')[0].checked;
    if (this.orderForm.valid) {
      $('#submitPriceForm').removeClass('disabled');
    } else {
      $('#submitPriceForm').addClass('disabled');
    }
  };

  changeInputHandler(e, regexp, name) {
    const value = e.target.value;
    this.orderForm[name].valid = regexp.test(value);
    if (this.orderForm[name].valid) {
      $(e.target).removeClass('error');
    } else {
      $(e.target).addClass('error');
    }
    this.checkFormValidity();
  };

  init() {
    $('#pieFirstName').on('change', (e) => {
      this.changeInputHandler.call(this, e, /^[a-zA-Zа-яА-Я\s]+$/, 'fname');
    });

    $('#pieLastName').on('change', (e) => {
      this.changeInputHandler.call(this, e, /^[a-zA-Zа-яА-Я\s]+$/, 'lname');
    });

    $('#piePhone').on('change', (e) => {
      this.changeInputHandler.call(this, e, /^[0-9| ()+-]*$/, 'phone');
    });

    $('#pieEmail').on('change', (e) => {
      this.changeInputHandler.call(this, e, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email');
    });

    $('#pieOffer').on('change', () => this.checkFormValidity());
  };

};


