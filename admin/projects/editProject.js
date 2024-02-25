
document.addEventListener('DOMContentLoaded', function() {
    // Function to extract project ID from URL
    function getProjectIdFromUrl() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('id');
    }

    // Function to retrieve project details from localStorage
    function getProjectDetails(projectId) {
        const projects = JSON.parse(localStorage.getItem('Projects')) || [];
        return projects.find(project => project.projectId === projectId);
    }

    // Function to populate form fields with project details
    function populateFormFields(project) {
        document.getElementById('edit-project-title').value = project.title;
        document.getElementById('edit-project-category').value = project.category;
        document.getElementById('project-link').value = project.link;
        document.getElementById('edit-project-description').value = project.description;
    }

    // Get project ID from URL
    const projectId = getProjectIdFromUrl();

    // Retrieve project details from localStorage
    const project = getProjectDetails(projectId);

    // Populate form fields with project details
    populateFormFields(project);

    // Event listener for form submission (for editing project)
    document.getElementById('edit-project-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve updated values from form fields
        const updatedProject = {
            projectId: projectId, // Retain the original project ID
            title: document.getElementById('edit-project-title').value,
            category: document.getElementById('edit-project-category').value,
            link: document.getElementById('edit-project-link').value,
            tags: document.getElementById('edit-project-tags').value,
            description: document.getElementById('edit-project-description').value
        };

        // After updating the project details, you can redirect the user or show a success message
        console.log('Project updated:', updatedProject);
    });
});
