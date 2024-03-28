document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:8080/blogs/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch blog');
        }

        const blog = await response.json();

        // Populate form fields with the blog data
        document.getElementById('title').value = blog?.userInfo.title;
        document.getElementById('category').value = blog?.userInfo.category;
        document.getElementById('tag').value = blog?.userInfo.tag;
        document.getElementById('description').value = blog?.userInfo.desc;

        // Handle form submission
        document.getElementById('my-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append('title', document.getElementById('title').value);
            formData.append('category', document.getElementById('category').value);
            formData.append('tag', document.getElementById('tag').value);
            formData.append('description', document.getElementById('description').value);
            formData.append('image', document.getElementById('image').files[0]);

            const updateResponse = await fetch(`http://localhost:8080/blogs/update/${id}`, {
                method: 'PUT',
                body: formData
            });

            alert("Update is successfully")

            if (!updateResponse.ok) {
                throw new Error('Failed to update blog');
            }
            window.location.href = './Blogs.html';
        });

    } catch (error) {
        console.log('Error:', error);
    }
});
