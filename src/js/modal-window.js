"use strict";
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getMapFromLocalStorage, updateLocalStorage, updateArrayMap} from "./local-storage.js";
const modalWindow = document.querySelector(".modal-window-shop");
const listOne = document.querySelector(".list-one");

// local storage //
let arrayBooksShop = getMapFromLocalStorage();
updateLocalStorage();
// local storage //

listOne.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.classList.contains('textUpHover')) {
        document.body.classList.add('modal-open');
        const _id = e.target.parentNode.dataset.category;
        const response = await axios.get(`https://books-backend.p.goit.global/books/${_id}`);
        const book = response.data;
        let shopBook = `
            <span>
                Х
            </span>
            <div class="main-modal-window-content">
                <div class="modal-image-container"><img class="modal-image" src="${book.book_image}" alt="${book.title}"></div>
        
                <div class="modal-main-content-text">
                    <h2 class="">${book.title}</h2>
                    <p class="book-author">${book.author}</p>
                    <p class="modal-book-description">${book.description}</p>
                    <div class=" ">
                        <a class=" " href="${book.amazon_product_url} rel="amazon ${book.title}" target="_blank"">amazon_product_url</a>
                    </div>
                </div>
            </div>`;

        if (arrayBooksShop.has(book.title)) {
            shopBook += `<button class="card-books-category-button margin-add" type="button" data-id="${book._id}" data-title="${book.title}">Remove from the shopping list</button>
            <p id="congratulations" class="add-list-book">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>`;   
        } else {
            shopBook += `<button class="card-books-category-button margin-add" type="button" data-id="${book._id}" data-title="${book.title}">Add to shopping list</button>
            <p id="congratulations">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>`;
        }
        
        document.querySelector(".modal-content").innerHTML = shopBook;
        document.querySelector(".modal-window-shop").style.display = "block";
    }
});

modalWindow.addEventListener("click", async (e) => {
    if (e.target.classList.contains('close-window')) {
        document.querySelector(".modal-window-shop").style.display = "none";
        document.body.classList.remove('modal-open');
    }
    else if (e.target.classList.contains('modal-window-shop')) {
        document.querySelector(".modal-window-shop").style.display = "none";
        document.body.classList.remove('modal-open');
    }
    else if (e.target.classList.contains('card-books-category-button')) {
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
            paragraf.classList.add('add-list-book');
        }
        else {
            arrayBooksShop.delete(buttonShL.dataset.title);

            buttonShL.textContent = "Add to shopping list";
            const paragraf = document.getElementById('congratulations');
            paragraf.classList.remove('add-list-book');  
        }

    } catch (error) {
        iziToast.error({
            title: "Error",
            message: error.message,
        });
    } finally {
        updateLocalStorage(); 
        updateArrayMap();
    }
}

