document.addEventListener('DOMContentLoaded', function() {
    const projectsList = document.querySelector('.projects-list');

    const displayProjects = () => {
        projectsList.innerHTML = '';

        // Fetch projects from localStorage
        let projects = JSON.parse(localStorage.getItem('Projects')) || [];
        projects.forEach(project => {
            // Create elements
            const singleProject = document.createElement('div');
            singleProject.classList.add('single-project', 'card');
            singleProject.dataset.id = project.projectId;

            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.title;
            img.classList.add('project-img');

            const projectTitleDescriptionLikesComment = document.createElement('div');
            projectTitleDescriptionLikesComment.classList.add('project-title-description-likesComment');

            const h2 = document.createElement('h2');
            h2.textContent = project.title;

            const projectDescLikes = document.createElement('div');
            projectDescLikes.classList.add('project-desc-likes');

            const p = document.createElement('p');
            p.textContent = project.description;

            const projectActions = document.createElement('div');
            projectActions.classList.add('project-actions');

            const actions = document.createElement('div');
            actions.classList.add('actions');

            // Create trash can icon for delete functionality
            const trashCanIcon = document.createElement('i');
            trashCanIcon.classList.add('fa-regular', 'fa-trash-can');
            trashCanIcon.addEventListener('click', function() {
                deleteProject(project.projectId); // Call deleteProject function
            });

            // Create edit link for edit functionality
            const editLink = document.createElement('a');
            editLink.href = `./editProject.html?id=${project.projectId}`;
            const penToSquareIcon = document.createElement('i');
            penToSquareIcon.classList.add('fa-regular', 'fa-pen-to-square');
            editLink.appendChild(penToSquareIcon);

            // Append elements to their parents
            actions.appendChild(trashCanIcon);
            actions.appendChild(editLink);
            projectActions.appendChild(actions);

            projectDescLikes.appendChild(p);
            projectDescLikes.appendChild(projectActions);

            projectTitleDescriptionLikesComment.appendChild(h2);
            projectTitleDescriptionLikesComment.appendChild(projectDescLikes);

            singleProject.appendChild(img);
            singleProject.appendChild(projectTitleDescriptionLikesComment);

            projectsList.appendChild(singleProject);
        });
    }

    displayProjects();

    function deleteProject(projectId) {
        let projects = JSON.parse(localStorage.getItem('Projects')) || [];
        const updatedProjects = projects.filter(project => project.projectId !== projectId);
        localStorage.setItem('Projects', JSON.stringify(updatedProjects));

        const projectElement = document.querySelector(`.single-project[data-id="${projectId}"]`);
        if (projectElement) {
            projectElement.remove();
        }
    }
});
