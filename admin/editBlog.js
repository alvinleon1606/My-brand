document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    let blogData = JSON.parse(localStorage.getItem('Blogs'));

    // Find the index of the blog to update
    const updateIndex = blogData.findIndex((blog) => {
        return blog.id === id;
    });

    if (updateIndex !== -1) {
        const update = blogData[updateIndex];

        // Populate form fields with the data
        document.getElementById('title').value = update.title;
        document.getElementById('category').value = update.category;
        document.getElementById('tag').value = update.tag;
        document.getElementById('description').value = update.description;
    

        // Handle form submission
        document.getElementById('my-form').addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Update properties of the found blog
            update.title = document.getElementById('title').value;
            update.category = document.getElementById('category').value;
            update.tag = document.getElementById('tag').value;
            update.description = document.getElementById('description').value;
            update.image = document.getElementById('image').value;

            blogData[updateIndex] = update;
            localStorage.setItem('Blogs', JSON.stringify(blogData))
            window.location.href = './Blogs.html';
        });

    }
});

