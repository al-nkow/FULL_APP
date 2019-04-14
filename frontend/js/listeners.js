import $ from 'jquery';
import RegValidate from './regValidate';
import Toast from './toaster';

const Listeners = () => {

  const toast = new Toast();

  const scrollToElement = (id, duration) => {
    $('html, body').animate({
      scrollTop: id ? $(id).offset().top : 0
    }, duration || 2000);
  };

  $('.scrollToTeachers').on('click', () => scrollToElement('#teachers', 1000));
  $('.scrollToFaq').on('click', () => scrollToElement('#faq', 1000));
  $('.scrollToFooter').on('click', () => scrollToElement('#footer', 1000));
  $('.scrollToPay').on('click', () => scrollToElement('#pay', 1000));
  $('.scrollToActions').on('click', () => scrollToElement('#actions', 1000));
  $('.totop').on('click', () => scrollToElement(null, 'slow'));

  $('#show-results').on('click', () => {
    $('#letterModal').modal('hide');
    scrollToElement('#fame', 1000);
  });

  // stop youtube iframe video
  $('.videoModalClose').on('click', () => {
    $('.youtube_player_iframe').each(function() {
      this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    });
  });

  $('.show-more').on('click', function() {
    $('.rest-of-faq').addClass('visible');
    $(this).addClass('hidden');
  });

  $('.jsMobMenuItem').on('click', () => $('#mobMenu').toggleClass('visible'));


  let regFormValidation = new RegValidate();
  regFormValidation.init();

  $('#submitRegistrationForm').on('click', () => {
    if (!regFormValidation.form.valid) return;
    let firstName = $('#rfFirstName').val();
    let lastName = $('#rfLastName').val();
    let phone = $('#rfPhone').val();
    let email = $('#rfEmail').val();

    const data = { firstName, lastName, phone, email };

    addMember(data);

    function addMember(data) {
      const url = '/member';
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
        .then((resp) => {
          const { status } = resp;
          if (status === 409) {
            toast.error('Пользователь с таким email уже зарегистрирован');
          } else if (status === 201) {
            $('#registerModal').modal('hide');
            toast.success('Регистрация успешно завершена');
          }
          // return resp.json();
        })
        // .then((data) => {})
        .catch((error) => {
          console.log('ADD MEMBER ERROR:', error);
          toast.error('Ошибка сервера');
        });
    }
  });

};

export default Listeners;