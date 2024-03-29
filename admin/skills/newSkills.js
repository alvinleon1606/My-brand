document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('my-form');

    // Add event listener to form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Retrieve input values from form fields
        const title = document.getElementById('title').value;
        const description = document.getElementById('desc').value;
        const icon = document.getElementById('icon').files[0]; 
        const percent = document.getElementById('percent').value;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('icon', icon);
        formData.append('percent', percent);


        try {
            const response = await fetch('http://localhost:8080/skills/new', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to add skill');
            }

            const data = await response.json();

            alert("New Skill added")
            window.location.href = './Skills.html'

        } catch (error) {
            console.error('Error adding skill:', error);
            alert("Error adding skill")
        }
    });
});
