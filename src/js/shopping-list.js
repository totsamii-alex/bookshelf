"use strict";
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getMapFromLocalStorage, updateLocalStorage, updateArrayMap} from "./local-storage.js";
import {createSupportUkraine} from "./support-ukraine.js";
import {scrollUp} from "./scroll-up.js";
import sprite from "../img/blocks.svg";

const listBooks = document.querySelector(".list-books");
const ulPagination = document.querySelector('.pagination');
const loadingIndicator = document.querySelector(".container-loader");

// local storage
let arrayBooksShop = getMapFromLocalStorage();
//

window.addEventListener("load", async (e) => {
    e.preventDefault();

    createSupportUkraine();
    addColorLastWord("Shopping List");

    await createSubArray(0, getPerPage());
    showPagination();
});

listBooks.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.matches('.icon-shop-list')) {
        arrayBooksShop.delete(e.target.getAttribute('data-book'));

        updateLocalStorage(arrayBooksShop); 
        updateArrayMap(arrayBooksShop);

        await createSubArray(0, getPerPage());
        showPagination();
    }
});

ulPagination.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.classList.contains('svg-li-pagination-l') || e.target.classList.contains('svg-li-pagination-r') || e.target.classList.contains('page-li-pagination')) {
        
        let perPage = getPerPage();
        let startIndex, pageActive;
        const pageOne = document.querySelector('.page-one');
        const pageText = parseInt(pageOne.textContent);
        const sizeMap = arrayBooksShop.size;
        const page = Math.floor(sizeMap / perPage);
        const totalElements = document.querySelectorAll('.page-li-pagination').length;

        try {
            switch (e.target.id) {
                case "start":
                    startIndex = 0;
                    pageActive = 1;
                    break;
                case "prev":
                    startIndex = (pageText - 1) * perPage - perPage;
                    pageActive = pageText - 1;
                    break;
                case "last":
                    if (sizeMap % perPage === 0) {
                        startIndex = (page -1) * perPage;
                    } else {
                        startIndex = sizeMap - (sizeMap - (page * perPage));
                    }
                    pageActive = totalElements;
                    break;
                case "next":
                    startIndex = pageText * perPage;
                    pageActive = pageText + 1;
                    break;
                default:
                    startIndex = (parseInt(e.target.textContent) -1) * perPage;
                    pageActive = parseInt(e.target.textContent);
            }
            if (pageActive <= 0) throw new Error("This is the first page.");
            else if (pageText === pageActive)  throw new Error("Action repeated.");
            else if (pageActive > totalElements)  throw new Error("This is the last page.");

            pageOne.classList.toggle('page-one');
            document.getElementById(pageActive.toString()).classList.add('page-one');
            let endIndex = startIndex + perPage;
            
            scrollUp();

            createSubArray(startIndex, endIndex);
            hiddenLiPagination(pageActive-1);
        } catch (error) {
            iziToast.error({
                title: "Error",
                message: error.message,
            });
        }
    }
});

async function createSubArray(startIndex, endIndex) {
    
    loadingIndicator.style.display = "block";
    const arraySubset = Array.from(arrayBooksShop.values()).slice(startIndex, endIndex);
    let booksCard = ``;
    
    for (let value of arraySubset) {
        booksCard += await showBooksInShoppingList(value);
    }
    
    listBooks.innerHTML = booksCard;
    loadingIndicator.style.display = "none";
}

async function showPagination() {
    const sizeMap = arrayBooksShop.size;
    let perPage = getPerPage();
    const page = sizeMap / perPage;
    
    let booksCard = `
        <ul class="svg-li-pagination-container">
            <li class="svg-li-pagination-l" id="start">
                <svg class="icon-pagination" fill="none">
                    <use href="${sprite}#double-arrow"></use>
                </svg>
            </li>
            <li class="svg-li-pagination-l" id="prev">
                <svg class="icon-pagination" fill="none">
                    <use href="${sprite}#arr"></use>
                </svg>
            </li>
        </ul> 
        
        <ul class="li-pagination-container">`;

            if (sizeMap > perPage) {
                booksCard += `<li id="1" class="page-li-pagination page-one">1</li>`;
                if (sizeMap % perPage === 0) {
                    for(let i = 2; i <= page; i++) {
                        booksCard += `<li id="${i}" class="page-li-pagination">${i}</li>`;
                    };
                } else {
                    for(let i = 2; i <= page+1; i++) {
                        booksCard += `<li id="${i}" class="page-li-pagination">${i}</li>`;
                    };
                }
                
            } else {
                booksCard += `<li id="1" class="page-li-pagination page-one">1</li>`;
            }

    booksCard += `
            <li class="page-li-pagination-hidden-el-r"></li>
        </ul>
        
        <ul class="svg-li-pagination-container">
            <li class="svg-li-pagination-r" id="next">
                <svg class="icon-pagination" fill="none">
                    <svg class="icon-pagination" fill="none">
                        <use href="${sprite}#arr"></use>
                    </svg>
                </svg>
            </li>
            <li class="svg-li-pagination-r last" id="last">
                <svg class="icon-pagination" fill="none">
                    <use href="${sprite}#double-arrow"></use>
                </svg>
            </li>
        </ul>`;
        ulPagination.innerHTML = booksCard;
        hiddenLiPagination(0);
        ulPagination.style.display = "flex";
}

async function hiddenLiPagination(startElement) {
    const distance = getWidthWindow();
    document.querySelectorAll('.page-li-pagination').forEach((element, index) => {

        if (index < startElement - distance || index > startElement + distance) {
            element.style.display = "none";
        } else {
            element.style.display = "flex";
        }
    });

    const totalElements = document.querySelectorAll('.page-li-pagination').length - 1;
    
    if (startElement < totalElements - distance) {
        document.querySelector('.page-li-pagination-hidden-el-r').style.display = "flex";
        document.querySelector('.page-li-pagination-hidden-el-r').innerHTML = "...";
    } else {
        document.querySelector('.page-li-pagination-hidden-el-r').style.display = "none";
    }
}

async function showBooksInShoppingList(book_id) {
    try {
        const response = await axios.get(`https://books-backend.p.goit.global/books/${book_id}`);
        const data = response.data;

        let booksCard = `
            <li class="list-books-shop-list">
                <div>
                    <img class="image-shop-list" src="${data.book_image}" alt="${data.title}">
                </div>

                <div class="main-container-shop-list">
                    <div class="text-content-shop-list">
                        <div class="top-content-shop-list">
                            <div class="text-book-container">
                                <p class="title">${data.title}</p>
                                <p class="list-name">${data.list_name}</p>
                            </div>

                                <svg class="icon-shop-list" fill="none">
                                    <use data-book="${data.title}" class="icon-shop-list" href="${sprite}#block"></use>
                                </svg>
                        </div>

                        <p class="description-shop-list">${data.description}</p>
                    </div>

                    <div class="author-links-shop-list">
                        <p class="author">${data.author}</p>
                        <div class="link-container-shop-list">
                            <a href="${data.buy_links[0].url}" target="_blank">
                                <img class="amazon" src="../img/amazon.png" srcset="../img/amazon.png 1x, ../img/amazon2x.png 2x" alt="amazon"></img>
                            </a>
                            <a href="${data.buy_links[1].url}" target="_blank">
                                <img class="book" src="../img/book.png" srcset="../img/book.png 1x, ../img/book2x.png 2x" alt="book"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </li>`;
        return booksCard;
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: error.message,
        });
    }
}

async function addColorLastWord (word) {
    const lastSpaceIndex = word.lastIndexOf(' ');
    const nameCategory = document.querySelector(".name-page");
    nameCategory.innerHTML = `${word.substring(0, lastSpaceIndex)} <span class="blue-color">${word.substring(lastSpaceIndex + 1)}</span>`;
}

function getWidthWindow() {
    const width = window.innerWidth;
    if (width <= 767) return 1;
    else return 2;
}

function getPerPage() {
    if (getWidthWindow() === 2) {
        return 5;
    } else {
        return 3;
    }
}