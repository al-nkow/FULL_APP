import Siema from 'siema';
import $ from 'jquery';
import data from './fameData';

const Winners = () => {
  const handler = function(e) {
    const name = e.target.dataset.name;
    if (!name) return;

    const winner = data[name];

    const fragment = document.createDocumentFragment();

    const overlay = document.createElement('div');
    overlay.className = 'cm-overlay';
    overlay.id = 'cm-overlay';

    const modal = document.createElement('div');
    modal.className = 'cm-modal';

    const header = getHeader(winner.name);
    modal.appendChild(header);

    const slider = createSlider(winner.slides);
    modal.appendChild(slider);

    if (winner.slides.length > 1) {
      const leftArrow = getLeftArrow();
      modal.appendChild(leftArrow);
      const rightArrow = getRightArrow();
      modal.appendChild(rightArrow);
    }

    const footer = getFooter(winner.result);
    modal.appendChild(footer);

    overlay.appendChild(modal);
    fragment.appendChild(overlay);
    document.getElementsByTagName('body')[0].appendChild(fragment);

    if (winner.slides.length > 1) initSlider();
  };

  $('.cm-toggle').on('click', handler);

  document.addEventListener('click',function(e){
    if (e.target && (e.target.id === 'cm-close' || e.target.id === 'cm-overlay')) {
      const elem = document.querySelector('#cm-overlay');
      if (elem) elem.parentNode.removeChild(elem);
    }
  });

  function createSlider(slides) {
    const slider = document.createElement('div');
    slider.className = 'cm-slider';
    slides.forEach(item => {
      const img = document.createElement('img');
      img.src = item;
      img.alt = '';
      slider.appendChild(img);
    })
    return slider;
  }

  function initSlider() {
    try {
      const winSiema = new Siema({
        selector: '.cm-slider',
        loop: true,
      });
      $('.winSiema-prev').on('click', () => winSiema.prev());
      $('.winSiema-next').on('click', () => winSiema.next());
    } catch(e) {
      console.log('ERROR: ', e);
    }
  }

  function getFooter(result) {
    const footer = document.createElement('div');
    footer.className = 'modal-wave';
    footer.innerHTML = `<svg x="0px" y="0px" viewBox="0 0 743 187">
        <path d="M-506.1,19.8c0,0,78.6-25.9,256-1c177.3,24.9,253.9,3.6,322.1-2  c68.1-5.6,161.2-3,257,17c95.8,20,210.8,30.3,323.1-13c112.3-43.3,178.8-8.8,253.8,11c75,19.8,82.9,19.6,98.1,18  c15.2-1.6,87.5,156.1,87.5,156.1s-1695.1-11.3-1682.9-21C-579.2,175.3-506.1,19.8-506.1,19.8z"></path>
      </svg>
    <div class="modal-wave-result">${result}</div>`;
    return footer;
  }

  function getHeader(name) {
    const header = document.createElement('div');
    header.className = 'mod-head';
    header.innerHTML = `<div class="close-but" id="cm-close">×</div>
    <h3 class="text-center">${name}</h3>
    <div class="block-head-divider"></div>`;
    return header;
  }

  function getLeftArrow() {
    const arrow = document.createElement('span');
    arrow.className = 'carousel-control-prev winSiema-prev';
    arrow.innerHTML = `<svg class="slider-arr" viewBox="0 0 129 129"><g><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"></path></g></svg>
        <span class="sr-only">Previous</span>`;
    return arrow;
  }

  function getRightArrow() {
    const arrow = document.createElement('span');
    arrow.className = 'carousel-control-next winSiema-next';
    arrow.innerHTML = `<svg class="slider-arr" viewBox="0 0 129 129"><g><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"></path></g></svg>
      <span class="sr-only">Next</span>`;
    return arrow;
  }
}

export default Winners;