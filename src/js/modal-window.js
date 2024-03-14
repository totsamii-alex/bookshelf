"use strict";
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getMapFromLocalStorage, updateLocalStorage, updateArrayMap} from "./local-storage.js";
import sprite from "../img/blocks.svg";

const modalWindow = document.querySelector(".modal-window-shop");
const listOne = document.querySelector(".list-one");

// local storage //
let arrayBooksShop = getMapFromLocalStorage();
// local storage //

listOne.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.classList.contains('textUpHover')) {
        document.body.classList.add('modal-open');
        const _id = e.target.parentNode.dataset.category;
        const response = await axios.get(`https://books-backend.p.goit.global/books/${_id}`);
        const book = response.data;
        console.log(typeof book);
        let shopBook = `
            <svg class="close-window" fill="none">
                <use href="${sprite}#close"></use>
            </svg>
        <div class="">
            <div class="main-modal-window-content">
                <div class="modal-image-container"><img class="modal-image" src="${book.book_image}" alt="${book.title}"></div>
        
                <div class="modal-main-content-text">
                    <h2 class="">${book.title}</h2>
                    <p class="book-author">${book.author}</p>
                    `;
                    if (book.description) {
                        shopBook += `
                        <p class="modal-book-description">${book.description}</p>`;
                    }
                    shopBook += `
                    <div class="link-container-modal-window">
                        <a href="${book.buy_links[0].url}" target="_blank">
                            <img src="../img/amazon.png" srcset="../img/amazon.png 1x, ../img/amazon2x.png 2x" alt="amazon"></img>
                        </a>
                        <a href="${book.buy_links[1].url}" target="_blank">
                            <img src="../img/book.png" srcset="../img/book.png 1x, ../img/book2x.png 2x" alt="book"></img>
                        </a>
                    </div>

                </div>
            </div>
        </div>`;
        if (arrayBooksShop.has(book.title)) {
            shopBook += `
        <div>
            <button class="button-modal-window" type="button" data-id="${book._id}" data-title="${book.title}">Remove from the shopping list</button>
            <p id="congratulations" style="display: block;">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
        </div>`;
        } else {
            shopBook += `
            <div>
                <button class="button-modal-window" type="button" data-id="${book._id}" data-title="${book.title}">Add to shopping list</button>
                <p id="congratulations" style="display: none;">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
            </div>`;
        }
        
        document.querySelector(".modal-content").innerHTML = shopBook;
        document.querySelector(".modal-window-shop").style.display = "block";
    }
});

modalWindow.addEventListener("click", async (e) => {
    console.log("ok1");
    if (e.target.closest('.close-window')) {
        
        console.log("ok2");
        modalWindow.style.display = "none";
        document.body.classList.remove('modal-open');
    }
    else if (e.target.classList.contains('modal-window-shop')) {
        console.log("ok3");
        modalWindow.style.display = "none";
        document.body.classList.remove('modal-open');
    }
    else if (e.target.classList.contains('button-modal-window')) {
        bookSaveInShop(e.target);
    }
});

async function bookSaveInShop(buttonShL) {
    try {
        if (buttonShL.textContent === "Add to shopping list") {
            if (arrayBooksShop.has(buttonShL.dataset.title)) {
                throw new Error('This book has added');
            }

            arrayBooksShop.set(buttonShL.dataset.title, buttonShL.dataset.id);
            buttonShL.textContent = "Remove from the shopping list";
            const paragraf = document.getElementById('congratulations');
            paragraf.style.display = "block";
        }
        else { 
            arrayBooksShop.delete(buttonShL.dataset.title);

            buttonShL.textContent = "Add to shopping list";
            const paragraf = document.getElementById('congratulations');
            paragraf.style.display = "none"; 
        }

    } catch (error) {
        iziToast.error({
            title: "Error",
            message: error.message,
        });
    } finally {
        updateLocalStorage(arrayBooksShop); 
        updateArrayMap(arrayBooksShop);
    }
}

