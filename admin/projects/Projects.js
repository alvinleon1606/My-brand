const form = document.getElementById('create-project-form');

const projectSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('project-title').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('link', document.getElementById('project-link').value);
    formData.append('description', document.getElementById('project-description').value);
    formData.append('image', document.getElementById('project-image').files[0]);


       const res = Object.fromEntries(formData)
       const payload = JSON.stringify(res)

        try {
            const response = await fetch('http://localhost:8080/projects/add', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('New project added successfully!');
                window.location.href = `http://127.0.0.1:5500/admin/projects/projects.html`
                form.reset();
            } else {
                throw new Error('Failed to add project');
            }
        } catch (error) {
            console.log('Error adding project:', error);
        }
};

form.addEventListener('submit', projectSubmit);

