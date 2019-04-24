import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/style.scss';
import 'ubuntu-fontface/_ubuntu.scss'
import $ from 'jquery';
import Payment from './payment';
import Sliders from './sliders';
import Listeners from './listeners';
import Reviews from './reviews';
import Instagram from './instagram';

$(function() {

  $('.full-wrap').removeClass('hidden');
  $('.preloader').addClass('hidden');

  Sliders();
  Listeners();
  Payment();
  Reviews();
  Instagram();

  $('#currentYear').text(new Date().getFullYear());

  function openPayWin() {
    let url = window.location.href;
    let urlArr = url.split('?');
    if (!urlArr[1]) return;
    let params = {};
    let arrParams = urlArr[1].slice(0).split('&');
    arrParams.forEach(function (item) {
      let arrItem = item.split('=');
      params[arrItem[0]] = arrItem[1]
    });
    if (params.pay === '1') {
      $('#program1').click();
    } else if (params.pay === '2') {
      $('#program2').click();
    } else if (params.pay === '3') {
      $('#program3').click();
    } else if (params.pay === '4') {
      $('#program4').click();
    } else if (params.pay === '5') {
      $('#program5').click();
    }
  }

  openPayWin();

});