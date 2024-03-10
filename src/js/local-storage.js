// local storage //
let arrayBooksShop = getMapFromLocalStorage();

export function getMapFromLocalStorage() {
    const serializedData = localStorage.getItem('arrayBooksShop');
    if (serializedData) {
        const dataArray = JSON.parse(serializedData);
        return new Map(dataArray);
    }
    return new Map();
}

export function updateLocalStorage() {
    const serializedData = JSON.stringify([...arrayBooksShop]);
    localStorage.setItem('arrayBooksShop', serializedData);
}

export function updateArrayMap() {
    arrayBooksShop = getMapFromLocalStorage();
}