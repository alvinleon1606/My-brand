// new project
const form = document.getElementById('create-project-form');
const projectTitle = document.getElementById('project-title');
const projectLink = document.getElementById('project-link');
const projectCategory = document.getElementById('category');
const projectImage = document.getElementById('project-image');
const projectFinishedDate = document.getElementById('project-finished-date');
const projectDescription = document.getElementById('project-description');


const projectSubmit = (e) =>{
    e.preventDefault()
    // project object
    const newProject = {
        projectId: Date.now(),
        title: projectTitle.value,
        link: projectLink.value,
        category: projectCategory.value,
        finisheddate: projectFinishedDate.value,
        image: projectImage.value,
        description: projectDescription.value
    };

    let Projects = JSON.parse(localStorage.getItem('Projects')) || [];

    // read image as url image
    const file = projectImage.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = (e) =>{
            newProject.image = e.target.result;
            Projects.push(newProject);
            localStorage.setItem('Projects', JSON.stringify(Projects));
            form.reset();
            alert("New projet is added!");
        }
        reader.readAsDataURL(file);
    }
}
form.addEventListener('submit', projectSubmit);