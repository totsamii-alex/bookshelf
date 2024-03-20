import{g as w,s as p,u as $,a as _,c as x,b as L,d as y}from"./assets/header-CUv6V0eE.js";import{a as d,i as l,S}from"./assets/vendor-X-nWYsMu.js";const C=document.querySelectorAll(".span-counter"),g=document.querySelector(".modal-window-shop"),E=document.querySelector(".list-one");let n=w();u();E.addEventListener("click",async t=>{if(t.preventDefault(),t.target.classList.contains("textUpHover")){document.body.classList.add("modal-open");const e=t.target.parentNode.dataset.category,a=(await d.get(`https://books-backend.p.goit.global/books/${e}`)).data;console.log(typeof a);let o=`
            <svg class="close-window" fill="none">
                <use id="close-window" href="${p}#close"></use>
            </svg>
        <div class="">
            <div class="main-modal-window-content">
                <div class="modal-image-container"><img class="modal-image" src="${a.book_image}" alt="${a.title}"></div>
        
                <div class="modal-main-content-text">
                    <h2 class="">${a.title}</h2>
                    <p class="book-author">${a.author}</p>
                    `;a.description&&(o+=`
                        <p class="modal-book-description">${a.description}</p>`),o+=`
                    <div class="link-container-modal-window">
                        <a href="${a.buy_links[0].url}" target="_blank">
                            <img src="./img/amazon.png" srcset="./img/amazon.png 1x, ./img/amazon2x.png 2x" alt="amazon"></img>
                        </a>
                        <a href="${a.buy_links[1].url}" target="_blank">
                            <img src="./img/book.png" srcset="./img/book.png 1x, ./img/book2x.png 2x" alt="book"></img>
                        </a>
                    </div>

                </div>
            </div>
        </div>`,n.has(a.title)?o+=`
        <div>
            <button class="button-modal-window" type="button" data-id="${a._id}" data-title="${a.title}">Remove from the shopping list</button>
            <p id="congratulations" style="display: block;">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
        </div>`:o+=`
            <div>
                <button class="button-modal-window" type="button" data-id="${a._id}" data-title="${a.title}">Add to shopping list</button>
                <p id="congratulations" style="display: none;">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
            </div>`,document.querySelector(".modal-content").innerHTML=o,document.querySelector(".modal-window-shop").style.display="block"}});g.addEventListener("click",async t=>{console.log("ok1"),t.target.closest(".close-window")?(console.log("ok2"),g.style.display="none",document.body.classList.remove("modal-open")):t.target.classList.contains("modal-window-shop")?(console.log("ok3"),g.style.display="none",document.body.classList.remove("modal-open")):t.target.classList.contains("button-modal-window")&&q(t.target)});async function q(t){try{if(t.textContent==="Add to shopping list"){if(n.has(t.dataset.title))throw new Error("This book has added");n.set(t.dataset.title,t.dataset.id),t.textContent="Remove from the shopping list";const e=document.getElementById("congratulations");e.style.display="block"}else{n.delete(t.dataset.title),t.textContent="Add to shopping list";const e=document.getElementById("congratulations");e.style.display="none"}}catch(e){l.error({title:"Error",message:e.message})}finally{$(n),_(),u()}}async function u(){C.forEach(async t=>{t.textContent=n.size,n.size||(t.style.display="none")})}const m=document.querySelector(".list-one"),b=document.querySelector(".list_categories"),r=document.querySelector(".container-loader");window.addEventListener("load",async t=>{t.preventDefault(),B(),x(),c("Best Sellers Books"),await k(),L()});b.addEventListener("click",async t=>{t.preventDefault();let e;t.target.classList.contains("categories")&&(h(t),e=t.target.textContent,e==="All categories"?(c("Best Sellers Books"),k()):(c(e),f(e)))});m.addEventListener("click",async t=>{if(t.preventDefault(),t.target.classList.contains("card-books-category-button")){const s=t.target.dataset.category;h(s),f(s),c(s)}});async function B(){try{let t='<li class="categories selected">All categories</li>';const s=(await d.get("https://books-backend.p.goit.global/books/category-list")).data;for(let a in s)t+=`<li id="${s[a].list_name}" class="categories">${s[a].list_name}</li>`;b.innerHTML=t}catch(t){l.error({title:"Error",message:t.message})}finally{}}async function k(){try{r.style.display="flex";const e=(await d.get("https://books-backend.p.goit.global/books/top-books")).data;let s="";const a=T();for(let o in e){s+=`
                    <li class="list-all-cards-category"><div class="content-card-one-categ"><h2 class="category-books">${e[o].list_name}</h2>
                        <ul id="${e[o].list_name}" class="list-cards-category">`;for(let i in e[o].books)if(s+=`
                    <li data-category="${e[o].books[i]._id}" class="card-book">
                        <a id="${e[o].books[i]._id}" class="gallery-link" href="${e[o].books[i].book_image}"><img class="img-example" src="${e[o].books[i].book_image}" alt="${e[o].books[i].title}. Category: ${e[o].list_name}"></img></a>
                        <div class="textUpHover">Quick view</div>
                        <div class="card-book-container">
                            <p>${e[o].books[i].title}</p>
                            <p>${e[o].books[i].author}</p>
                            <div class="rank-book-container">
                                <svg fill="none">
                                    <use id="star" href="${p}#star"></use>
                                </svg>
                                <span>${e[o].books[i].rank_last_week}</span>
                            </div>
                        </div>
                    </li>
                `,a==i)break;s+=`</ul></div>
                        <button class="card-books-category-button" type="button" data-category="${e[o].list_name}">See more</button>
                    </li>`}m.innerHTML=s}catch(t){l.error({title:"Error",message:t.message})}finally{v(),y(),r.style.display="none"}}async function f(t){try{r.style.display="block";const s=(await d.get(`https://books-backend.p.goit.global/books/category?category=${t}`)).data;let a="";a+=`
                    <li class="list-all-cards-category" style="align-items: flex-start;">
                        <ul class="list-cards-category">`;for(let o in s)a+=`
                                    <li data-category="${s[o]._id}" class="card-book">
                                        <a class="gallery-link" href="${s[o].book_image}"><img class="img-example" src="${s[o].book_image}" alt="${s[o].title}"></img></a>
                                        <div class="textUpHover">Quick view</div>
                                        <div class="card-book-container">
                                            <p>${s[o].title}</p>
                                            <p>${s[o].author}</p>
                                            <div class="rank-book-container">
                                                <svg fill="none">
                                                    <use id="star" href="${p}#star"></use>
                                                </svg>
                                                <span>${s[o].rank_last_week}</span>
                                            </div>
                                        </div>
                                    </li>
                                `;a+=`</ul>
                    </li>`,m.innerHTML=a}catch(e){l.error({title:"Error",message:e.message})}finally{v(),y(),r.style.display="none"}}async function c(t){const e=t.lastIndexOf(" "),s=document.querySelector(".name-category");s.innerHTML=`${t.substring(0,e)} <span class="blue-color">${t.substring(e+1)}</span>`}function T(){const t=window.innerWidth;return t>=1440?4:t>=768?2:0}async function v(){try{new S(".gallery-link",{captionsData:"alt",captionDelay:350,uniqueImages:!1})}catch(t){l.error({title:"Error",message:t.message})}}async function h(t){const e=document.querySelector(".categories.selected");e&&e.classList.remove("selected"),typeof t=="string"?document.getElementById(t).classList.add("selected"):t.target.classList.add("selected")}
//# sourceMappingURL=commonHelpers.js.map
