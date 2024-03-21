import{g as k,s as u,u as w,a as L,c as $,b as S,d as x}from"./assets/header-CUv6V0eE.js";import{a as y,i as d,S as C}from"./assets/vendor-X-nWYsMu.js";const E=document.querySelectorAll(".span-counter"),l=document.querySelector(".modal-window-shop"),I=document.querySelector(".list-one");let n=k();f();I.addEventListener("click",async e=>{if(e.preventDefault(),e.target.classList.contains("textUpHover")){document.body.classList.add("modal-open");const t=e.target.parentNode.dataset.category,o=(await y.get(`https://books-backend.p.goit.global/books/${t}`)).data;console.log(typeof o);let s=`
            <svg class="close-window" fill="none">
                <use id="close-window" href="${u}#close"></use>
            </svg>
        <div class="">
            <div class="main-modal-window-content">
                <div class="modal-image-container"><img class="modal-image" src="${o.book_image}" alt="${o.title}"></div>
        
                <div class="modal-main-content-text">
                    <h2 class="">${o.title}</h2>
                    <p class="book-author">${o.author}</p>
                    `;o.description&&(s+=`
                        <p class="modal-book-description">${o.description}</p>`),s+=`
                    <div class="link-container-modal-window">
                        <a href="${o.buy_links[0].url}" target="_blank">
                            <img src="./img/amazon.png" srcset="./img/amazon.png 1x, ./img/amazon2x.png 2x" alt="amazon"></img>
                        </a>
                        <a href="${o.buy_links[1].url}" target="_blank">
                            <img src="./img/book.png" srcset="./img/book.png 1x, ./img/book2x.png 2x" alt="book"></img>
                        </a>
                    </div>

                </div>
            </div>
        </div>`,n.has(o.title)?s+=`
        <div>
            <button class="button-modal-window" type="button" data-id="${o._id}" data-title="${o.title}">Remove from the shopping list</button>
            <p id="congratulations" style="display: block;">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
        </div>`:s+=`
            <div>
                <button class="button-modal-window" type="button" data-id="${o._id}" data-title="${o.title}">Add to shopping list</button>
                <p id="congratulations" style="display: none;">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
            </div>`,document.querySelector(".modal-content").innerHTML=s,document.querySelector(".modal-window-shop").style.display="block"}});l.addEventListener("click",async e=>{console.log("ok1"),e.target.closest(".close-window")?(console.log("ok2"),l.style.display="none",document.body.classList.remove("modal-open")):e.target.classList.contains("modal-window-shop")?(console.log("ok3"),l.style.display="none",document.body.classList.remove("modal-open")):e.target.classList.contains("button-modal-window")&&_(e.target)});async function _(e){try{if(e.textContent==="Add to shopping list"){if(n.has(e.dataset.title))throw new Error("This book has added");n.set(e.dataset.title,e.dataset.id),e.textContent="Remove from the shopping list";const t=document.getElementById("congratulations");t.style.display="block"}else{n.delete(e.dataset.title),e.textContent="Add to shopping list";const t=document.getElementById("congratulations");t.style.display="none"}}catch(t){d.error({title:"Error",message:t.message})}finally{w(n),L(),f()}}async function f(){E.forEach(async e=>{e.textContent=n.size,n.size||(e.style.display="none")})}const v=document.querySelector(".list-one"),h=document.querySelector(".list_categories"),m=document.querySelector(".container-loader"),r=document.querySelector(".input_searching"),q=document.querySelector(".form_images"),H="AIzaSyCbhd8jVjDvkoH3mR5P3m_eE4AVPzLy9_4",A="https://www.googleapis.com/books/v1/volumes",c=["Science Fiction","Romance","Mystery","Adventure","Thriller","Horror","Fantasy","Mysteries","Drama","Historical Fiction","Poetry","Classics","Biography","Autobiography","Children's Literature","Comics","Humor","Religion","Philosophy","Psychology","Self-Help","Travel","Cooking","Art","Music","Sports","Science","Technology","Business","Finance","Education","Health","Fitness","Lifestyle","Gardening","Parenting","Crafts","Hobbies","Reference","Manga"],M=c[Math.floor(Math.random()*c.length)];window.addEventListener("load",async e=>{e.preventDefault(),T(),$(),g("Best Sellers Books"),i(),S()});q.addEventListener("submit",async e=>{if(e.preventDefault(),!r.value.trim()){d.error({title:"Error",message:"Please enter a keyword for search"});return}i()});h.addEventListener("click",async e=>{e.preventDefault();let t;e.target.classList.contains("categories")&&(b(e),t=e.target.textContent,g(t),i(t))});v.addEventListener("click",async e=>{if(e.preventDefault(),e.target.classList.contains("card-books-category-button")){const a=e.target.dataset.category;b(a),i(),g(a)}});async function T(){try{let e="";for(let t of c)e+=`<li id="${t}" class="categories">${t}</li>`;h.innerHTML=e}catch(e){console.log("Ошибка при выполнении запроса: "+e)}}async function p(e){try{return(await y.get(A,{params:{q:e,printType:"books",maxResults:20,key:H}})).data.items}catch(t){console.log("Ошибка при выполнении запроса: "+t)}}async function i(e){try{m.style.display="block";const t=r.value.trim()?r.value.trim():M,a=e?await p(e):await p(t);console.log(a);let o=`
                    <li class="list-all-cards-category" style="align-items: flex-start;">
                        <ul class="list-cards-category">`;for(let s of a)s.volumeInfo.imageLinks&&s.volumeInfo.imageLinks.thumbnail?o+=`
                                    <li data-category="${s.id}" class="card-book">
                                        <a class="gallery-link" href="${s.volumeInfo.canonicalVolumeLink}">
                                            <img class="img-example" src="${s.volumeInfo.imageLinks.thumbnail}" alt="${s.volumeInfo.title}">
                                        </a>
                                        <div class="textUpHover">Quick view</div>
                                        <div class="card-book-container">
                                            <p>${s.volumeInfo.title}</p>
                                            <p>${s.volumeInfo.authors}</p>
                                            <div class="rank-book-container">
                                                <svg fill="none">
                                                    <use id="star" href="${u}#star"></use>
                                                </svg>
                                                <span>${s.volumeInfo.pageCount}</span>
                                            </div>
                                        </div>
                                    </li>
                                `:console.log("Отсутствует изображение для книги");o+=`</ul>
                    </li>`,v.innerHTML=o}catch(t){console.log("Ошибка при выполнении запроса: "+t)}finally{B(),x(),m.style.display="none"}}async function g(e){const t=e.lastIndexOf(" "),a=document.querySelector(".name-category");a.innerHTML=`${e.substring(0,t)} <span class="blue-color">${e.substring(t+1)}</span>`}async function B(){try{new C(".gallery-link",{captionsData:"alt",captionDelay:350,uniqueImages:!1})}catch(e){d.error({title:"Error",message:e.message})}}async function b(e){const t=document.querySelector(".categories.selected");t&&t.classList.remove("selected"),typeof e=="string"?document.getElementById(e).classList.add("selected"):e.target.classList.add("selected")}
//# sourceMappingURL=commonHelpers.js.map
