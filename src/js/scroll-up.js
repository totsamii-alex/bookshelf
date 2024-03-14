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