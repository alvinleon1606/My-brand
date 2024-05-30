document.addEventListener('DOMContentLoaded', function() {
    const projectsList = document.querySelector('.projects-list');

    // token
    const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    const token = userLog?.token

    const displayProjects = async() => {
        projectsList.innerHTML = '';

        // Fetch projects from localStorage
        try {
            const response = await fetch('https://leonx-ldu1-vvuz.onrender.com/projects/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const projects = await response.json();
            
        
            projects?.data.forEach(project => {
            // Create elements
            const singleProject = document.createElement('div');
            singleProject.classList.add('single-project', 'card');
            singleProject.dataset.id = project._id;

            const img = document.createElement('img');
            img.src = `https://leonx-ldu1-vvuz.onrender.com/${project.image}`
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
                deleteProject(project._id); 
            });

            // Create edit link for edit functionality
            const editLink = document.createElement('a');
            editLink.href = `./editProject.html?id=${project._id}`;
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
        })
    } catch (error) {
        console.log('Error fetching projects:', error);
    }
    }

    displayProjects();

    function deleteProject(id) {
        fetch(`https://leonx-ldu1-vvuz.onrender.com/projects/remove/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            return response.json();
        })
        .then(() => {
            alert('Project deleted successfully');
            const projectElement = document.querySelector(`.single-project[data-id="${id}"]`);
            if (projectElement) {
                projectElement.remove();
            }
        })
        .catch(error => {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        });
    }
    
});
