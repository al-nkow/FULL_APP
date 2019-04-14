import $ from 'jquery';
import PayValidate from './payValidate';

const Payment = () => {
  let payFormValidation = new PayValidate();
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

    fetch('/member/check', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
    }).then((resp) => {
      const { status } = resp;
      if (status === 200) {
        callPay(fname, lname, phone, email, promo, true);
      } else {
        callPay(fname, lname, phone, email, promo);
      }
    })
    .catch((error) => { console.log('GET MEMBER BY EMAIL ERROR:', error); });
  });

  function callPay(fname, lname, phone, email, promo, discount) {

    const cost = discount ? price * 0.85 : price;

    let description = 'Программа "' + program + '" ' + cost + 'руб. 13 сезон. ' +
      'Участница: ' + fname + ' ' + lname + ', тел.' + phone + ', email: ' + email;
    if (promo) description = description + ', промокод: ' + promo;

    let payControls = {
      amount: cost,
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
  }
};

export default Payment;