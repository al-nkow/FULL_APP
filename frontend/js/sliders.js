import Siema from 'siema';
import $ from 'jquery';

const Sliders = () => {
  const newsSiema = new Siema({
    selector: '.newsSiema',
    perPage: {
      400: 1,
      600: 2,
      1240: 3
    },
    loop: true
  });
  $('.news-prev').on('click', () => newsSiema.prev());
  $('.news-next').on('click', () => newsSiema.next());

  setTimeout(() => {
    const reviewSiema = new Siema({
      selector: '.reviewSiema',
      loop: true,
      onChange: () => {
        if ([3, 5].indexOf(reviewSiema.currentSlide) !== -1) {
          const video = document.getElementById('insta-video');
          if (video) video.pause();
        }
      },
    });
    $('.reviewSiema-prev').on('click', () => reviewSiema.prev());
    $('.reviewSiema-next').on('click', () => reviewSiema.next());
  }, 1000); // need due to SIEMA bug - cannot paste innerHTML into last slide

  const fameSiema = new Siema({
    selector: '.fameSiema',
    loop: true,
    duration: 500,
  });
  $('.fameSiema-prev').on('click', () => fameSiema.prev());
  $('.fameSiema-next').on('click', () => fameSiema.next());

};

export default Sliders;