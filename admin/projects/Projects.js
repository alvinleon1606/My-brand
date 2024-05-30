const form = document.getElementById('create-project-form');

// Token ..............
const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
const token = userLog?.token

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
            const response = await fetch('https://leonx-ldu1-vvuz.onrender.com/projects/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                alert('New project added successfully!');
                window.location.href = `./projects.html`
                form.reset();
            } else {
                throw new Error('Failed to add project');
            }
        } catch (error) {
            console.log('Error adding project:', error);
        }
};

form.addEventListener('submit', projectSubmit);

