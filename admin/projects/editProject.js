
document.addEventListener('DOMContentLoaded', function() {
    function getProjectIdFromUrl() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('id');
    }

    function getProjectDetails(projectId) {
        const projects = JSON.parse(localStorage.getItem('Projects')) || [];
        return projects.find(project => project.projectId === projectId);
    }

    function populateFormFields(project) {
        document.getElementById('edit-project-title').value = project.title;
        document.getElementById('edit-project-category').value = project.category;
        document.getElementById('project-link').value = project.link;
        document.getElementById('edit-project-description').value = project.description;
    }

    const projectId = getProjectIdFromUrl();

    const project = getProjectDetails(projectId);

    populateFormFields(project);

    document.getElementById('edit-project-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve updated values from form fields
        const updatedProject = {
            projectId: projectId,
            title: document.getElementById('edit-project-title').value,
            category: document.getElementById('edit-project-category').value,
            link: document.getElementById('edit-project-link').value,
            tags: document.getElementById('edit-project-tags').value,
            description: document.getElementById('edit-project-description').value
        };
    });
});
