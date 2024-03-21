"use strict";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {createSupportUkraine} from "./js/support-ukraine.js";
import {scrollUp, scrollUpZero} from "./js/scroll-up.js";
import './js/modal-window.js';
import './js/header.js';
import sprite from "./img/blocks.svg";
import imageNoBook from "./img/no-image-book.png";

const listOne = document.querySelector(".list-one");
const listCategories = document.querySelector(".list_categories");
const loadingIndicator = document.querySelector(".container-loader");
const loadingIndicatorAfter = document.querySelector(".button-loader .container-loader");
const input = document.querySelector('.input_searching');
const form = document.querySelector('.form_images');
const forButton = document.querySelector('.for-button');
const list = document.querySelector(".svg-list-orientation");
const gridOrientation = document.querySelector(".svg-square-grid-orientation");

const API_KEY = 'AIzaSyCbhd8jVjDvkoH3mR5P3m_eE4AVPzLy9_4';
const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const categories = [
    'Science Fiction','Romance','Mystery','Adventure','Thriller','Horror','Fantasy','Mysteries',
    'Drama','Historical Fiction','Poetry','Classics','Biography','Autobiography','Children\'s Literature',
    'Comics','Humor','Religion','Philosophy','Psychology','Self-Help','Travel','Cooking','Art','Music',
    'Sports','Science','Technology','Business','Finance','Education','Health','Fitness',
    'Lifestyle','Gardening','Parenting','Crafts','Hobbies','Reference','Manga'
];

const randomKeyword = categories[Math.floor(Math.random() * categories.length)];
let startIndex = 20;
let query;

window.addEventListener("load", async (e) => {
    e.preventDefault();

    mainCategories();
    createSupportUkraine();
    addColorLastWord("Best Sellers Books");
    sortGalery();
    scrollUpZero();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
        iziToast.error({
            title: "Error",
            message: "Please enter a keyword for search",      
        });
        return;
    }
    startIndex = 0;
    sortGalery();
});

listCategories.addEventListener("click", async (e) => {
    e.preventDefault();
    let selectedCategory;

    if (e.target.classList.contains('categories')) {
        setColorGaleryList(e);

        selectedCategory = e.target.textContent;
        addColorLastWord(selectedCategory);
        input.value = "";
        startIndex = 0;
        sortGalery(selectedCategory);
        scrollToElementId('list-name');
    }
});

forButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const category = e.target.dataset.category;

    startIndex += 9;
    nextGalery();
    addColorLastWord(category);
});

async function mainCategories() {
    try {
        let  contentCategories = ``;

        for (let category of categories) {
            contentCategories += `<li id="${category}" class="categories">${category}</li>`;
        }
        listCategories.innerHTML = contentCategories;

    } catch(error) {
        console.log('Ошибка при выполнении запроса: ' + error);
    }
}

async function searchBooks(search) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: search,
                printType: 'books',
                startIndex: startIndex,
                maxResults: 9,
                key: API_KEY
            }
        });
        return response.data.items;

    } catch (error) {
        console.log('Ошибка при выполнении запроса: ' + error);
    }
}

async function sortGalery(category) {
    try {
        loadingIndicator.style.display = 'block';
        
        const data = !input.value.trim() ? randomKeyword : input.value.trim();
        query = !category ? data : category;
        const books = await searchBooks(query);
        console.log(books);
        console.log(query);

        let booksCard = `
                    <li class="list-all-cards-category" style="align-items: flex-start;">
                        <ul class="list-cards-category">`;
                        for (let book of books) {
                            booksCard += `
                                    <li data-category="${book.id}" class="card-book">
                                        <a class="gallery-link" href="${book.volumeInfo.canonicalVolumeLink}">
                                            <img class="img-example" src="${!(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ? imageNoBook : book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
                                        </a>
                                        <div class="card-book-container">
                                            <div>
                                                <p>${book.volumeInfo.title}</p>
                                                <p>${!(book.volumeInfo.authors) ? "" : book.volumeInfo.authors}</p>
                                                <p class="book-desc">${!(book.volumeInfo.description) ? "" : book.volumeInfo.description}</p>
                                            </div>

                                            <div class="rank-book-container">
                                                <svg fill="none">
                                                    <use id="star" href="${sprite}#star"></use>
                                                </svg>
                                                <span>${!(book.volumeInfo.pageCount) ? 0 : book.volumeInfo.pageCount}</span>
                                            </div>
                                        </div>
                                    </li>
                            `;
                        }
            booksCard += `</ul>
                    </li>`;
        listOne.innerHTML = booksCard;
        forButton.innerHTML = `<button class="card-books-category-button" type="button" data-category="${query}">See more</button>`;
        
    } catch(error) {
        console.log('Ошибка при выполнении запроса: ' + error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

async function nextGalery() {
    try {
        loadingIndicatorAfter.style.display = 'block';
        forButton.style.display = 'none';
        
        const books = await searchBooks(query);
        console.log(books);
        console.log(query);

        let booksCard = `
                    <li class="list-all-cards-category" style="align-items: flex-start;">
                        <ul class="list-cards-category">`;
                        for (let book of books) {
                            booksCard += `
                                    <li data-category="${book.id}" class="card-book">
                                        <a class="gallery-link" href="${book.volumeInfo.canonicalVolumeLink}">
                                            <img class="img-example" src="${!(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ? imageNoBook : book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
                                        </a>
                                        <div class="card-book-container">
                                            <div>
                                                <p>${book.volumeInfo.title}</p>
                                                <p>${!(book.volumeInfo.authors) ? "" : book.volumeInfo.authors}</p>
                                                <p class="book-desc">${!(book.volumeInfo.description) ? "" : book.volumeInfo.description}</p>
                                            </div>
                                            <div class="rank-book-container">
                                                <svg fill="none">
                                                    <use id="star" href="${sprite}#star"></use>
                                                </svg>
                                                <span>${!(book.volumeInfo.pageCount) ? 0 : book.volumeInfo.pageCount}</span>
                                            </div>
                                        </div>
                                    </li>
                            `;
                        }
            booksCard += `</ul>
                    </li>`;

        listOne.insertAdjacentHTML('beforeend', booksCard);
        
    } catch(error) {
        console.log('Ошибка при выполнении запроса: ' + error);
    } finally {
        scrollToElement(450);
        loadingIndicatorAfter.style.display = 'none';
        forButton.style.display = 'flex';
    }
}

async function addColorLastWord( word ) {
    const lastSpaceIndex = word.lastIndexOf(' ');
    const nameCategory = document.querySelector(".name-category");
    nameCategory.innerHTML = `${word.substring(0, lastSpaceIndex)} <span class="blue-color">${word.substring(lastSpaceIndex + 1)}</span>`;
}

function getWidthWindow() {
    const width = window.innerWidth;
    if (width >= 1440) return 4;
    else if (width >= 768) return 2;
    else return 0;
}

// simplelightbox //
async function simpleLightbox() {
    try {
        new SimpleLightbox(('.gallery-link'), {
            captionsData: 'alt',
            captionDelay: 350,
            uniqueImages: false,
          });
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: error.message,
        });
    }
}

async function setColorGaleryList(e) {
    const previousSelected = document.querySelector('.categories.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    if (typeof e === "string") {
        const elementList = document.getElementById(e);
        elementList.classList.add('selected');
    }
    else {
        e.target.classList.add('selected');
    }
}

// async function mainGalery() {
//     try {
//         loadingIndicator.style.display = 'flex';
//         const response = await axios.get(`https://books-backend.p.goit.global/books/top-books`);
//         const data = response.data;
//         let booksCard = ``;
        
//         const widthWindow = getWidthWindow();
//         for (let i in data) {
//             booksCard += `
//                     <li class="list-all-cards-category"><div class="content-card-one-categ"><h2 class="category-books">${data[i].list_name}</h2>
//                         <ul id="${data[i].list_name}" class="list-cards-category">`;
            
//             for (let j in data[i].books) {
//                 booksCard += `
//                     <li data-category="${data[i].books[j]._id}" class="card-book">
//                         <a id="${data[i].books[j]._id}" class="gallery-link" href="${data[i].books[j].book_image}"><img class="img-example" src="${data[i].books[j].book_image}" alt="${data[i].books[j].title}. Category: ${data[i].list_name}"></img></a>
//                         <div class="textUpHover">Quick view</div>
//                         <div class="card-book-container">
//                             <p>${data[i].books[j].title}</p>
//                             <p>${data[i].books[j].author}</p>
//                             <div class="rank-book-container">
//                                 <svg fill="none">
//                                     <use id="star" href="${sprite}#star"></use>
//                                 </svg>
//                                 <span>${data[i].books[j].rank_last_week}</span>
//                             </div>
//                         </div>
//                     </li>
//                 `;
//                 if (widthWindow == j) break;
//             }
//             booksCard += `</ul></div>
//                         <button class="card-books-category-button" type="button" data-category="${data[i].list_name}">See more</button>
//                     </li>`;
//         }
//         listOne.innerHTML = booksCard;
        
//     } catch(error) {
//         iziToast.error({
//             title: "Error",
//             message: error.message,
//         });
//     } finally {
//         simpleLightbox();
//         scrollUp();
//         loadingIndicator.style.display = 'none';
//     }
// }

list.addEventListener('click', async (e) => {
    e.preventDefault();

    console.log('list');
    
    document.querySelector('.list-one').classList.remove('grid-position');
});
gridOrientation.addEventListener('click', async (e) => {
    e.preventDefault();

    document.querySelector('.list-one').classList.add('grid-position');
});

function scrollToElement(px) {
    window.scrollBy({
        top: px,
        behavior: "smooth",
    });
}
function scrollToElementId(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({
        behavior: 'smooth'
    });
}