"use strict";
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getMapFromLocalStorage, updateLocalStorage, updateArrayMap} from "./local-storage.js";
import {scrollUp} from "./scroll-up.js";

const listOne = document.querySelector(".list-books");
const ulPagination = document.querySelector('.pagination');
const loadingIndicator = document.querySelector(".container-loader");

// local storage
let arrayBooksShop = getMapFromLocalStorage();
updateLocalStorage();
//

window.addEventListener("load", async (e) => {
    e.preventDefault();

    createSubArray(0, 3);
    showPagination();
});

ulPagination.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.classList.contains('svg-li-pagination-l') || e.target.classList.contains('svg-li-pagination-r') || e.target.classList.contains('page-li-pagination')) {
        const perPage = 3;
        let startIndex;
        let pageActive;
        
        try {
            switch (e.target.getAttribute('data-id')) {
                case "start":
                    startIndex = 0;
                    pageActive = 1;


                    if (document.querySelector('.page-one').id === '1') throw new Error("This is the first page");
                    document.querySelector('.page-one').classList.remove('page-one');
                    document.getElementById('1').classList.add('page-one');
                    break;
                case "next":
                    startIndex = parseInt(document.querySelector('.page-one').textContent) * perPage;
                    if (startIndex >= arrayBooksShop.size) throw new Error("This is the last page");


                    let id = document.querySelector('.page-one').textContent;
                    document.getElementById(id).classList.remove('page-one');
                    id = (parseInt(id) + 1).toString();
                    document.getElementById(id).classList.add('page-one');
                    
                    pageActive = parseInt(document.getElementById(id).id);
                    break;
                case "last":
                    const sizeMap = arrayBooksShop.size;
                    const page = Math.floor(sizeMap / perPage);
                    if (sizeMap % perPage === 0) {
                        startIndex = (page -1) * perPage;
                        pageActive = page;
                    } else {
                        startIndex = sizeMap - (sizeMap - (page * perPage));
                        pageActive = page + 1;
                    }

                    if (startIndex >= sizeMap)throw new Error("This is the last page");
                    else if (document.querySelector('.page-one').id === Math.ceil(sizeMap / perPage).toString()) {
                        throw new Error("Last page");
                    }
                    
                    document.querySelector('.page-one').classList.remove('page-one');
                    let countLi = (document.querySelectorAll('.page-li-pagination').length).toString();
                    document.getElementById(countLi).classList.add('page-one');
                    break;
                case "prev":
                    startIndex = (parseInt(document.querySelector('.page-one').textContent) - 1) * (perPage) - 3;
                    if (startIndex < 0) throw new Error("This is the first page");


                    let idPrev = document.querySelector('.page-one').textContent;
                    document.getElementById(idPrev).classList.remove('page-one');
                    idPrev = (parseInt(idPrev) - 1).toString();
                    document.getElementById(idPrev).classList.add('page-one');
                    
                    pageActive = parseInt(document.getElementById(idPrev).id);
                    break;
                default:
                    startIndex = (parseInt(e.target.getAttribute('data-id')) -1) * perPage;
                    document.querySelector('.page-one').classList.remove('page-one'); 
                    e.target.classList.add('page-one');

                    pageActive = parseInt(e.target.getAttribute('data-id'));
            }
            let endIndex = startIndex + 3;

            createSubArray(startIndex, endIndex);
            hiddenLiPagination(pageActive-1);
        } catch (error) {
            iziToast.error({
                title: "Error",
                message: error.message,
            });
        } finally {
            scrollUp();
        }
    }
});

async function createSubArray(startIndex, endIndex) {
    const arraySubset = Array.from(arrayBooksShop.values()).slice(startIndex, endIndex);
    let booksCard = ``;

    for (let value of arraySubset) {
        booksCard += await showBooksInShoppingList(value);
    }
    
    listOne.innerHTML = booksCard;
}

async function showPagination() {
    const sizeMap = arrayBooksShop.size;
    const page = sizeMap / 3;
    
    let booksCard = `
        <div class="svg-li-pagination-container">
            <li class="svg-li-pagination-l" data-id="start"><<</li>
            <li class="svg-li-pagination-l" data-id="prev"><</li>
        </div> 
        
        <div class="li-pagination-container">
            <li class="page-li-pagination-hidden-el-l"></li>`;

            if (sizeMap > 3) {
                booksCard += `<li id="1" class="page-li-pagination page-one" data-id="1">1</li>`;
                if (sizeMap % 3 === 0) {
                    for(let i = 2; i <= page; i++) {
                        booksCard += `<li id="${i}" class="page-li-pagination" data-id="${i}">${i}</li>`;
                    };
                } else {
                    for(let i = 2; i <= page+1; i++) {
                        booksCard += `<li id="${i}" class="page-li-pagination" data-id="${i}">${i}</li>`;
                    };
                }
                
            } else {
                booksCard += `<li id="1" class="page-li-pagination page-one" data-id="1">1</li>`;
            }

    booksCard += `
            <li class="page-li-pagination-hidden-el-r"></li>
        </div>
        
        <div class="svg-li-pagination-container">
            <li class="svg-li-pagination-r" data-id="next">></li>
            <li class="svg-li-pagination-r" data-id="last">>></li>
        </div>`;
        ulPagination.innerHTML = booksCard;
        hiddenLiPagination(0);
        ulPagination.style.display = "flex";
}

async function hiddenLiPagination(startElement) {
    const distance = 2;
    document.querySelectorAll('.page-li-pagination').forEach((element, index) => {

        if (index < startElement - distance || index > startElement + distance) {
            element.style.display = "none";
        } else {
            element.style.display = "flex";
        }
    });

    const totalElements = document.querySelectorAll('.page-li-pagination').length - 1;
    if (startElement > distance) {
        document.querySelector('.page-li-pagination-hidden-el-l').style.display = "flex";
        document.querySelector('.page-li-pagination-hidden-el-l').innerHTML = "...";
    } else {
        document.querySelector('.page-li-pagination-hidden-el-l').style.display = "none";
    }
    
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
                                <p>${data.title}</p>
                                <p>${data.list_name}</p>
                            </div>

                            <div class="svg-delete-shop-list">
                                X
                            </div>
                        </div>

                        <p class="description-shop-list">${data.description}</p>
                    </div>

                    <div class="author-links-shop-list">
                        <p>${data.author}</p>
                        <a href="${data.buy_links[0].url}" target="_blank">amazon</a>
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