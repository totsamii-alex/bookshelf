"use strict";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {createSupportUkraine} from "./js/support-ukraine.js";
import {scrollUp, scrollUpZero} from "./js/scroll-up.js";
import './js/modal-window.js';

const listOne = document.querySelector(".list-one");
const listCategories = document.querySelector(".list_categories");
const loadingIndicator = document.querySelector(".container-loader");

window.addEventListener("load", async (e) => {
    e.preventDefault();

    mainCategories();
    createSupportUkraine();
    addColorLastWord("Best Sellers Books");
    await mainGalery();
    scrollUpZero();
});

listCategories.addEventListener("click", async (e) => {
    e.preventDefault();
    let selectedCategory;

    if (e.target.classList.contains('categories')) {
        setColorGaleryList(e);

        selectedCategory = e.target.textContent;
        if (selectedCategory === "All categories") {
            addColorLastWord("Best Sellers Books");
            mainGalery();
        }
        else {
            addColorLastWord(selectedCategory);
            sortGalery(selectedCategory);
        }
    }
});

listOne.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.classList.contains('card-books-category-button')) {
        const buttonElement = e.target;
        const dataset = buttonElement.dataset.category;

        setColorGaleryList(dataset);
        sortGalery(dataset);
        addColorLastWord(dataset);
    }
});

async function mainCategories() {
    try {
        let  contentCategories = `<li class="categories selected">All categories</li>`;
        const response = await axios.get(`https://books-backend.p.goit.global/books/category-list`);
        const data = response.data;

        for (let i in data) {
            contentCategories += `<li id="${data[i].list_name}" class="categories">${data[i].list_name}</li>`;
        }
        listCategories.innerHTML = contentCategories;

    } catch(error) {
        iziToast.error({
            title: "Error",
            message: error.message,
        });
    } finally {
    }
}

async function mainGalery() {
    try {
        loadingIndicator.style.display = 'flex';
        const response = await axios.get(`https://books-backend.p.goit.global/books/top-books`);
        const data = response.data;
        let booksCard = ``;
        
        const widthWindow = getWidthWindow();
        for (let i in data) {
            booksCard += `
                    <li class="list-all-cards-category"><div class="content-card-one-categ"><h2 class="category-books">${data[i].list_name}</h2>
                        <ul id="${data[i].list_name}" class="list-cards-category">`;
            
            for (let j in data[i].books) {
                booksCard += `
                    <li data-category="${data[i].books[j]._id}" class="card-book">
                        <a id="${data[i].books[j]._id}" class="gallery-link" href="${data[i].books[j].book_image}"><img class="img-example" src="${data[i].books[j].book_image}" alt="${data[i].books[j].title}. Category: ${data[i].list_name}"></img></a>
                        <div class="textUpHover">Quick view</div>
                        <div class="card-book-container">
                            <p>${data[i].books[j].title}</p>
                            <p>${data[i].books[j].author}</p>
                        </div>
                    </li>
                `;
                if (widthWindow == j) break;
            }
            booksCard += `</ul></div>
                        <button class="card-books-category-button" type="button" data-category="${data[i].list_name}">See more</button>
                    </li>`;
        }
        listOne.innerHTML = booksCard;
        
    } catch(error) {
        iziToast.error({
            title: "Error",
            message: error.message,
        });
    } finally {
        simpleLightbox();
        scrollUp();
        loadingIndicator.style.display = 'none';
    }
}

async function sortGalery(searchProperty) {
    try {
        loadingIndicator.style.display = 'block';
        const response = await axios.get(`https://books-backend.p.goit.global/books/category?category=${searchProperty}`);
            const data = response.data;
            let booksCard = ``;
            booksCard += `
                    <li class="list-all-cards-category" style="align-items: flex-start;">
                        <ul class="list-cards-category">`;
            
                        for (let i in data) {
                            booksCard += `
                                    <li data-category="${data[i]._id}" class="card-book">
                                        <a class="gallery-link" href="${data[i].book_image}"><img class="img-example" src="${data[i].book_image}" alt="${data[i].title}"></img></a>
                                        <div class="textUpHover">Quick view</div>
                                        <div class="card-book-container">
                                            <p>${data[i].title}</p>
                                            <p>${data[i].author}</p>
                                        </div>
                                    </li>
                                `;
                            }
            booksCard += `</ul>
                    </li>`;
        listOne.innerHTML = booksCard;
        
    } catch(error) {
        iziToast.error({
            title: "Error",
            message: error.message,
        });
    } finally {
        simpleLightbox();
        scrollUp();
        loadingIndicator.style.display = 'none';
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