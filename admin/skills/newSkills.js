document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('my-form');

    // Add event listener to form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve input values from form fields
        const title = document.getElementById('title').value;
        const desc = document.getElementById('desc').value;
        const icon = document.getElementById('icon').files[0]; // Assuming the input type is file
        const percent = document.getElementById('percent').value;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('icon', icon);
        formData.append('percent', percent);

        // Store the skill data in local storage
        let skills = JSON.parse(localStorage.getItem('skills')) || [];
        const skill = {
            id: Date.now(),
            title: title,
            desc: desc,
            icon: icon ? URL.createObjectURL(icon) : '', // Store the file URL if an icon is uploaded
            percent: percent
        };
        skills.push(skill);
        localStorage.setItem('skills', JSON.stringify(skills));
        alert("New Skill added")
        window.location.href = './Skills.html'

        // Reset the form after adding the skill
        form.reset();

        // Display a success message or perform any other actions
        console.log('Skill added:', skill);
    });
});
