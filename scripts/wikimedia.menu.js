'use strict';


var tid = setInterval( function () {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );
  var querySelector = document.querySelector.bind(document);

  var nav = document.querySelector('.navbar_top');
  var wrapper = document.querySelector('.wrapper');
  var menu = document.getElementById("menu-list");

  // Toggle menu click
  querySelector('.toggle_menu').onclick = function () {
    nav.classList.toggle('navbar_top__opened');
    wrapper.classList.toggle('toggle-content');
  };

}, 100 );
