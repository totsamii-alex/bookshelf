"use strict";
const themeSwitch = document.querySelector('.check');
const menu = document.querySelector('.svg-menu-mobail');
let darkLight = JSON.parse(localStorage.getItem('darkLight'));

window.addEventListener("load", function(e) {
    e.preventDefault();
    if (darkLight) {
        document.documentElement.classList.toggle('dark');
        themeSwitch.checked = true;
    }
});

themeSwitch.addEventListener('change', function() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkLight', !darkLight);
    darkLight = !darkLight;
});

menu.addEventListener('click', function() {
    const closeElement = document.getElementById('close');
    const displayStyle = window.getComputedStyle(closeElement).getPropertyValue('display');

    if (displayStyle === 'none') {
        document.getElementById('burger').style.display = "none";
        document.getElementById('close').style.display = "block";
        document.querySelector('.menu').classList.add('active-menu');
        document.querySelector('body').classList.add('modal-open');
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        document.getElementById('burger').style.display = "block";
        document.getElementById('close').style.display = "none";
        document.querySelector('.menu').classList.remove('active-menu');
        document.querySelector('body').classList.remove('modal-open');
    }
});