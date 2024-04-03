document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // token
    const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    const token = userLog?.token

    function getProjectDetails(projectId) {
        return fetch(`https://NP Leon.onrender.com/projects/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch project');
                }
                return response.json();
            });
    }

    function populateFormFields(project) {

        document.getElementById('edit-project-title').value = project?.userInfo.title;
        document.getElementById('edit-project-category').value = project?.userInfo.category;
        document.getElementById('edit-project-link').value = project?.userInfo.link;
        document.getElementById('edit-project-description').value = project?.userInfo.description;
    }


    getProjectDetails(id)
        .then(project => {
            populateFormFields(project);
        })
        .catch(error => {
            console.error('Error fetching project:', error);
        });

    document.getElementById('edit-project-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve updated values from form fields
        const formData = new FormData();
        formData.append('title', document.getElementById('edit-project-title').value);
        formData.append('category', document.getElementById('edit-project-category').value);
        formData.append('link', document.getElementById('edit-project-link').value);
        formData.append('image', document.getElementById('edit-project-image').files[0]);
        formData.append('description', document.getElementById('edit-project-description').value);


        // Now you can send the formData to your backend API to update the project
        fetch(`https://NP Leon.onrender.com/projects/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update project');
            }
            alert('Project updated successfully');
            window.location.href = '/Projects.html';
        })
        .catch(error => {
            console.error('Error updating project:', error);
            alert('Failed to update project');
        });
    });
});
