import Siema from 'siema';
import $ from 'jquery';

const Sliders = () => {
  try {
    const newsSiema = new Siema({
      selector: '.newsSiema',
      startIndex: 0,
      perPage: {
        400: 1,
        600: 2,
        1240: 3
      },
      loop: true
    });
    $('.news-prev').on('click', () => newsSiema.prev());
    $('.news-next').on('click', () => newsSiema.next());
  } catch(e) {
    console.log('ERROR: ', e);
  }

  try {
    const reviewSiema = new Siema({
      selector: '.reviewSiema',
      loop: true,
    });
    $('.reviewSiema-prev').on('click', () => reviewSiema.prev());
    $('.reviewSiema-next').on('click', () => reviewSiema.next());
  } catch(e) {
    console.log('ERROR: ', e);
  }

  try {
    const fameSiema = new Siema({
      selector: '.fameSiema',
      loop: true,
      duration: 500,
    });
    $('.fameSiema-prev').on('click', () => fameSiema.prev());
    $('.fameSiema-next').on('click', () => fameSiema.next());
  } catch(e) {
    console.log('ERROR: ', e);
  }

};

export default Sliders;