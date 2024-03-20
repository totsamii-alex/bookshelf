(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function m(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(r){if(r.ep)return;r.ep=!0;const o=m(r);fetch(r.href,o)}})();const u=document.querySelector(".container-image-support-ukraine"),l=document.querySelector(".button-supp-uk"),i=[{title:"Save the Children",url:"https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis",src:"./img/image-1.png",srcset:"./img/image-1.png 1x, ./img/image-1-2x.png 2x"},{title:"Project HOPE",url:"https://www.projecthope.org/country/ukraine/",src:"./img/image-2.png",srcset:"./img/image-2.png 1x, ./img/image-2-2x.png 2x"},{title:"UNITED24",url:"https://u24.gov.ua/uk",src:"./img/image-3.png",srcset:"./img/image-3.png 1x, ./img/image-3-2x.png 2x"},{title:"International Medical Corps",url:"https://internationalmedicalcorps.org/country/ukraine/",src:"./img/image-4.png",srcset:"./img/image-4.png 1x, ./img/image-4-2x.png 2x"},{title:"Medicins Sans Frontieres",url:"https://www.msf.org/ukraine",src:"./img/image-5.png",srcset:"./img/image-5.png 1x, ./img/image-5-2x.png 2x"},{title:"RAZOM",url:"https://www.razomforukraine.org/",src:"./img/image-6.png",srcset:"./img/image-6.png 1x, ./img/image-6-2x.png 2x"},{title:"Action against hunger",url:"https://www.actionagainsthunger.org/location/europe/ukraine/",src:"./img/image-7.png",srcset:"./img/image-7.png 1x, ./img/image-7-2x.png 2x"},{title:"World vision",url:"https://www.wvi.org/emergencies/ukraine",src:"./img/image-8.png",srcset:"./img/image-8.png 1x, ./img/image-8-2x.png 2x"},{title:"Serhiy Prytula Charity Foundation",url:"https://prytulafoundation.org/en",src:"./img/image-9.png",srcset:"./img/image-9.png 1x, ./img/image-9-2x.png 2x"}];l.addEventListener("click",async e=>{e.preventDefault(),document.querySelector(".container-image-support-ukraine").classList.toggle("scroll"),l.classList.toggle("arrow-rotate")});async function f(){let e="";for(let t in i)e+=`
          <li class="list-image-support-ukraine">
            <p>0${parseInt(t)+1}</p>
            <div>
              <a href="${i[t].url}" target="_blank">
                <img class="img-support-ukraine" src="${i[t].src}" srcset="${i[t].srcset}" alt="${i[t].title}">
              </a>
            </div>
          </li>`;u.innerHTML=e}const a=document.getElementById("scroll-div");async function h(){window.scroll({top:60,behavior:"smooth"})}async function d(){window.scroll({top:0,behavior:"smooth"})}window.addEventListener("scroll",function(){var e=window.scrollY;e>=1e3?a.style.display="flex":a.style.display="none"});a.addEventListener("click",e=>{d()});function p(){const e=localStorage.getItem("arrayBooksShop");if(e){const t=JSON.parse(e);return new Map(t)}return new Map}function w(e){const t=JSON.stringify([...e]);localStorage.setItem("arrayBooksShop",t)}function S(e){p()}const x="/bookshelf/assets/blocks-yA2JK35p.svg",g=document.querySelector(".check"),y=document.querySelector(".svg-menu-mobail");let n=JSON.parse(localStorage.getItem("darkLight"));window.addEventListener("load",function(e){e.preventDefault(),n&&(document.documentElement.classList.toggle("dark"),g.checked=!0)});g.addEventListener("change",function(){document.documentElement.classList.toggle("dark"),localStorage.setItem("darkLight",!n),n=!n});y.addEventListener("click",function(){const e=document.getElementById("close");window.getComputedStyle(e).getPropertyValue("display")==="none"?(document.getElementById("burger").style.display="none",document.getElementById("close").style.display="block",document.querySelector(".menu").classList.add("active-menu"),document.querySelector("body").classList.add("modal-open"),window.scroll({top:0,behavior:"smooth"})):(document.getElementById("burger").style.display="block",document.getElementById("close").style.display="none",document.querySelector(".menu").classList.remove("active-menu"),document.querySelector("body").classList.remove("modal-open"))});export{S as a,d as b,f as c,h as d,p as g,x as s,w as u};
//# sourceMappingURL=header-C3E0nsaJ.js.map