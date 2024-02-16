// ++++++++++++++++++++++ Projects ++++++++++++++++++++++++

const all = document.querySelector('.all');
const web = document.querySelector('.web');
const mobile = document.querySelector('.mobile');
const ux = document.querySelector('.ux');

// proects containters  projects-cards
const allProjects = document.querySelector('.projects-cards');
const webProjects = document.querySelector('.web-projects');
const mobileProjects = document.querySelector('.mobile-projects');
const uxProjects = document.querySelector('.ux-projects');

// on page load
window.addEventListener("load", () =>{
    allProjects.style.display = "grid"
    all.classList.toggle('active');
    [webProjects, mobileProjects, uxProjects].forEach(menu => menu.style.display=('none'));
    [web, mobile, ux].forEach(menu => menu.classList.remove('active'));
});

all.addEventListener("click", () =>{
    allProjects.style.display = "grid"
    all.classList.toggle('active');
    [webProjects, mobileProjects, uxProjects].forEach(menu => menu.style.display=('none'));
    [web, mobile, ux].forEach(menu => menu.classList.remove('active'));
});

web.addEventListener('click', () =>{
    webProjects.style.display = "grid"
    web.classList.toggle('active');
    [allProjects, mobileProjects, uxProjects].forEach(menu => menu.style.display=('none'));
    [all, mobile, ux].forEach(menu => menu.classList.remove('active'));
});

mobile.addEventListener("click", () =>{
    mobileProjects.style.display = "grid"
    mobile.classList.toggle('active');
    [webProjects, mobileProjects, uxProjects].forEach(menu => menu.style.display=('none'));
    [web, all, ux].forEach(menu => menu.classList.remove('active'));
});

ux.addEventListener('click', () =>{
    uxProjects.style.display = "grid"
    ux.classList.toggle('active');
    [webProjects, mobileProjects, allProjects].forEach(menu => menu.style.display=('none'));
    [web, mobile, all].forEach(menu => menu.classList.remove('active'));
});


// Project Modal
 const projectModal = document.querySelector('.project-modal');
 const projectModalContent = document.querySelector('.project-modal-content');
 const closeBtn = document.querySelector('.close');
 const card = document.querySelectorAll('.card');

//  on page load
window.addEventListener('load', ()=>{
    projectModal.style.display = "none";
})

// all projects cards
card.forEach(eacgCard => eacgCard.addEventListener('click', ()=>{
    projectModal.style.display = "flex";
}))

// close 
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    projectModal.style.display = "none";
  }

window.onclick = function(e) {
    if (e.target == projectModal) {
        projectModal.style.display = "none";
    }
  }
