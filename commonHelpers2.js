import{g as L,c as E,u as T,a as z,d as q,s as l}from"./assets/header-BRfzvn9P.js";import{i as v,a as M}from"./assets/vendor-DSv6nxR9.js";window.addEventListener("resize",e=>{e.preventDefault();const a=window.innerWidth;(a===1440||a===768)&&location.reload()});const b="/bookshelf/assets/isEmpty-zqgIGaxr.png",k="/bookshelf/assets/isEmpty2x-DbW8UP_T.png",p=document.querySelector(".list-books"),r=document.querySelector(".pagination"),f=document.querySelector(".container-loader"),C=document.querySelectorAll(".span-counter");let n=L();H();window.addEventListener("load",async e=>{e.preventDefault(),E(),A("Shopping List"),S()?(await u(0,g()),w()):(p.innerHTML=`
        <div class="empty-shop-list">
            <p class="commentary-shop-list">This page is empty, add some books and proceed to order.</p>
            <img src="${b}" srcset="${k}" alt="Empty booklist">
        </div>`,r.innerHTML="")});p.addEventListener("click",async e=>{e.target.matches(".icon-shop-list")&&(n.delete(e.target.getAttribute("data-book")),T(n),z(),S()?(await u(0,g()),w()):(p.innerHTML=`
            <div class="empty-shop-list">
                <p class="commentary-shop-list">This page is empty, add some books and proceed to order.</p>
                <img src="${b}" srcset="${k}" alt="Empty booklist">
            </div>`,r.innerHTML=""))});r.addEventListener("click",async e=>{e.preventDefault();const a=e.target.closest(".ul-li-container");if(a){let t=g(),i,s;const m=document.querySelector(".page-one"),o=parseInt(m.textContent),c=n.size,h=Math.floor(c/t),y=document.querySelectorAll(".page-li-pagination").length;try{switch(a.id){case"start":i=0,s=1;break;case"prev":i=(o-1)*t-t,s=o-1;break;case"last":c%t===0?i=(h-1)*t:i=c-(c-h*t),s=y;break;case"next":i=o*t,s=o+1;break;default:i=(parseInt(e.target.textContent)-1)*t,s=parseInt(e.target.textContent)}if(s<=0)throw new Error("This is the first page.");if(o===s)throw new Error("Action repeated.");if(s>y)throw new Error("This is the last page.");m.classList.toggle("page-one"),document.getElementById(s.toString()).classList.add("page-one");let d=i+t;q(),u(i,d),x(s-1)}catch(d){v.error({title:"Error",message:d.message})}}});async function u(e,a){f.style.display="block";const t=Array.from(n.values()).slice(e,a);let i="";for(let s of t)i+=await I(s);p.innerHTML=i,f.style.display="none"}async function w(){const e=n.size;let a=g();const t=e/a;let i=`
        <ul class="svg-li-pagination-container">
            <li class="svg-li-pagination-l ul-li-container" id="start">
                <svg class="icon-pagination" fill="none">
                    <use href="${l}#double-arrow"></use>
                </svg>
            </li>
            <li class="svg-li-pagination-l ul-li-container" id="prev">
                <svg class="icon-pagination" fill="none">
                    <use href="${l}#arr"></use>
                </svg>
            </li>
        </ul> 
        
        <ul class="li-pagination-container ul-li-container">`;if(e>a)if(i+='<li id="1" class="page-li-pagination page-one">1</li>',e%a===0)for(let s=2;s<=t;s++)i+=`<li id="${s}" class="page-li-pagination">${s}</li>`;else for(let s=2;s<=t+1;s++)i+=`<li id="${s}" class="page-li-pagination">${s}</li>`;else i+='<li id="1" class="page-li-pagination page-one">1</li>';i+=`
            <li id="next" class="page-li-pagination-hidden-el-r ul-li-container"></li>
        </ul>
        
        <ul class="svg-li-pagination-container">
            <li class="svg-li-pagination-r ul-li-container" id="next">
                <svg class="icon-pagination" fill="none">
                    <svg class="icon-pagination" fill="none">
                        <use href="${l}#arr"></use>
                    </svg>
                </svg>
            </li>
            <li class="svg-li-pagination-r last ul-li-container" id="last">
                <svg class="icon-pagination" fill="none">
                    <use href="${l}#double-arrow"></use>
                </svg>
            </li>
        </ul>`,r.innerHTML=i,x(0),r.style.display="flex"}async function x(e){const a=$();document.querySelectorAll(".page-li-pagination").forEach((i,s)=>{s<e-a||s>e+a?i.style.display="none":i.style.display="flex"});const t=document.querySelectorAll(".page-li-pagination").length-1;e<t-a?(document.querySelector(".page-li-pagination-hidden-el-r").style.display="flex",document.querySelector(".page-li-pagination-hidden-el-r").innerHTML="..."):document.querySelector(".page-li-pagination-hidden-el-r").style.display="none"}async function I(e){try{const t=(await M.get(`https://books-backend.p.goit.global/books/${e}`)).data;return`
            <li class="list-books-shop-list">
                <div>
                    <img class="image-shop-list" src="${t.book_image}" alt="${t.title}">
                </div>

                <div class="main-container-shop-list">
                    <div class="text-content-shop-list">
                        <div class="top-content-shop-list">
                            <div class="text-book-container">
                                <p class="title">${t.title}</p>
                                <p class="list-name">${t.list_name}</p>
                            </div>

                                <svg class="icon-shop-list" fill="none">
                                    <use data-book="${t.title}" class="icon-shop-list" href="${l}#block"></use>
                                </svg>
                        </div>

                        <p class="description-shop-list">${t.description}</p>
                    </div>

                    <div class="author-links-shop-list">
                        <p class="author">${t.author}</p>
                        <div class="link-container-shop-list">
                            <a href="${t.buy_links[0].url}" target="_blank">
                                <img src="./img/amazon.png" srcset="./img/amazon.png 1x, ./img/amazon2x.png 2x" alt="amazon"></img>
                            </a>
                            <a href="${t.buy_links[1].url}" target="_blank">
                                <img src="./img/book.png" srcset="./img/book.png 1x, ./img/book2x.png 2x" alt="book"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </li>`}catch(a){v.error({title:"Error",message:a.message})}}async function A(e){const a=e.lastIndexOf(" "),t=document.querySelector(".name-page");t.innerHTML=`${e.substring(0,a)} <span class="blue-color">${e.substring(a+1)}</span>`}function $(){return window.innerWidth<=767?1:2}function g(){return $()===2?5:3}function S(){return n.size!==0}async function H(){C.forEach(async e=>{e.textContent=n.size,n.size||(e.style.display="none")})}
//# sourceMappingURL=commonHelpers2.js.map
