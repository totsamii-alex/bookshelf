"use strict";

window.addEventListener('resize', (e) => {
    e.preventDefault();
    
    const windowWidth = window.innerWidth;
    if (windowWidth === 1440) {
        location.reload();
    } else if (windowWidth === 768) {
        location.reload();
    }
});
