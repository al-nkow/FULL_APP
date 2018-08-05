import $ from 'jquery';
import Validation from './validation';

const Payment = () => {
  let payFormValidation = new Validation();
  payFormValidation.init();

  const ipay = new IPAY({ api_token: process.env.SBER_TOKEN });

  let price = 0;
  let program = '';
  let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  $('.priceBtn').on('click', function (e) {
    price = e.target.getAttribute('data-price');
    program = e.target.getAttribute('data-option');
    $('#priceModalLabel').text(program);
    $('#priceModal').modal('show');
    if (iOS) document.body.style.position = 'fixed';
  });
  if (iOS) {
    $('#priceModal').on('hidden.bs.modal', function () {
      document.body.style.position = 'inherit';
    })
  }

  $('#submitPriceForm').on('click', () => {
    if (!payFormValidation.orderForm.valid) return;

    let fname = $('#pieFirstName').val();
    let lname = $('#pieLastName').val();
    let phone = $('#piePhone').val();
    let email = $('#pieEmail').val();
    let promo = $('#piePromo').val();

    if (!fname || !lname || !phone) {
      alert('Все поля должны быть заполнены!');
      return false;
    }

    let description = 'Программа "' + program + '" ' + price + 'руб. 11 сезон. ' +
      'Участница: ' + fname + ' ' + lname + ', тел.' + phone + ', email: ' + email;
    if (promo) description = description + ', промокод: ' + promo;

    let payControls = {
      amount: price,
      currency: 'RUB',
      order_number: '',
      description: description
    };

    $('#priceModal').modal('hide');
    let cbSuccess = function (order) {
      console.log('Оплата прошла успешно: ', order);
    };
    let cbError = function (order) {
      console.log('ERROR: ', order);
    };
    ipayCheckout(payControls, cbSuccess, cbError);
  });
};

export default Payment;