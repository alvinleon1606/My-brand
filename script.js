// Menus 
const humbergerBtn = document.querySelector('.humburger');
const menus = document.querySelector('.nav-menu');

humbergerBtn.addEventListener("click", () => {
    humbergerBtn.classList.toggle('active');
    menus.classList.toggle('active');
})