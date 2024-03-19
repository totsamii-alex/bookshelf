const element = document.getElementById('scroll-div');

// scroll up //
export async function scrollUp() {
    window.scroll({
        top: 60,
        behavior: 'smooth'
    });
}
export async function scrollUpZero() {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// click //
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;

    if (scrollPosition >= 1000) {
        element.style.display = 'flex';
    } else {
        element.style.display = 'none';
    }
});
element.addEventListener("click", (e) => {
    scrollUpZero();
});