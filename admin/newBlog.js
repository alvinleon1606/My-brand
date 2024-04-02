const titleField = document.getElementById('title');
const categoryField = document.getElementById('category');
const imageField = document.getElementById('blog-image');
const tagField = document.getElementById('tags');
const descriptionField = document.getElementById('description');

// Error elements 
const titleError = document.querySelector('.title-error');
const categoryError = document.querySelector('.category-error');
const tagError = document.querySelector('.tag-error');
const imageError = document.querySelector('.file-error');
const descriptionError = document.querySelector('.description-error');

let Blogs = [];

const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
const token = userLog?.token

const goToEditBlog = (id) => {
    window.location.href = `editBlog.html?id=${id}`;
};

// delete blog function
const deleteBlog = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/blogs/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        alert("Blog deleted successfully");
        window.location.href = './Blogs.html';

        displayBlogs();
        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }

    } catch (error) {
        console.error('Error deleting blog:', error);
    }
};


// display blogs
const displayBlogs = async () => {
    const blogList = document.querySelector('.blogs-list');
    try {
        const response = await fetch('http://localhost:8080/blogs/all');
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        const blogs = await response.json();

        if (blogs.length === 0) {
            blogList.innerHTML = 'You do not have blogs';
            return;
        }
        blogList.innerHTML = "";
        blogs?.data.forEach((blog) => {
            const blogsDiv = document.createElement('div');
            blogsDiv.classList.add('single-bloggg');
            blogsDiv.innerHTML = `
                <div class="single-blog card">
                <img src="http://localhost:8080/${blog.image}" alt="" class="blog-img">
                <div class="blog-title-description-likesComment">
                        <h2>${blog.title}</h2>
                        <div class="blog-desc-likes">
                            <p>${blog.desc}</p>
                            <div class="likes-actions">
                                <div class="likes">
                                    <div class="comment-like">
                                        <i class="fa-regular fa-heart"></i>
                                        <p>200+</p>
                                    </div>
                                    <div class="comment-like">
                                        <i class="fa-regular fa-comments"></i>
                                        <p>200+</p>
                                    </div>
                                </div>
                                <div class="actions">
                                <i class="fa-regular fa-pen-to-square edit-blog" data-blog-id="${blog._id}"></i>
                                <i class="fa-regular fa-trash-can delete-blog" data-blog-id="${blog._id}"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            const editIcon = blogsDiv.querySelector('.edit-blog');
            const deleteIcon = blogsDiv.querySelector('.delete-blog');
        
            editIcon.addEventListener('click', () => {
                goToEditBlog(blog._id);
            });
        
            deleteIcon.addEventListener('click', () => {
                deleteBlog(blog._id);
            });
            blogList.appendChild(blogsDiv);
        });
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        blogList.innerHTML = 'Failed to fetch blogs';
    }
};

// Initial document load
document.addEventListener('DOMContentLoaded', async () => {
    await displayBlogs();
});


// Initial document load
document.addEventListener('DOMContentLoaded', () => {
    const storedBlogs = JSON.parse(localStorage.getItem('Blogs'));
    if (Array.isArray(storedBlogs)) {
        Blogs = storedBlogs;
    }
    displayBlogs();
});

// Create a blog
document.getElementById('new-blog-form-creation').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleField.value.trim();
    const category = categoryField.value.trim();
    const image = imageField.files[0]; 
    const tag = tagField.value.trim();
    const description = descriptionField.value.trim();

    // Form Validations
    let isValid = true;

    if (title === '') {
        titleError.textContent = 'Title cannot be empty';
        titleError.style.color = 'red';
        isValid = false;
    } else {
        titleError.textContent = '';
    }

    if (category === '') {
        categoryError.textContent = 'Category cannot be empty';
        categoryError.style.color = 'red';
        isValid = false;
    } else {
        categoryError.textContent = '';
    }

    if (tag === '') {
        tagError.textContent = 'Tag cannot be empty';
        tagError.style.color = 'red';
        isValid = false;
    } else {
        tagError.textContent = '';
    }

    if (description === '') {
        descriptionError.textContent = 'Description cannot be empty';
        descriptionError.style.color = 'red';
        isValid = false;
    } else if (!descriptionRegex.test(description)) {
        descriptionError.textContent = 'Description must be between 10 and 300 characters';
        descriptionError.style.color = 'red';
        isValid = false;
    } else {
        descriptionError.textContent = '';
    }

    if (isValid) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", description);
        formData.append("category", category);
        formData.append("tag", tag);
        formData.append("image", image);


        // const res = Object.fromEntries(formData)
        // const payload = JSON.stringify(res)

        CreateBlogs(formData);
    }
});

// Live validations as typing
const descriptionRegex = /^.{10,300}$/;
descriptionField.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    if (value === '') {
        descriptionError.textContent = 'Description cannot be empty';
        descriptionError.style.color = 'red';
    } else if (!descriptionRegex.test(value)) {
        descriptionError.textContent = 'Description must be between 10 and 300 characters';
        descriptionError.style.color = 'red';
    } else {
        descriptionError.textContent = '';
    }
});

// Create a blog
const CreateBlogs = async (formData) => {
    try {
        const response = await fetch('http://localhost:8080/blogs/new', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        if (data) {
            alert("Blog is successfully created");
            window.location.href = './Blogs.html';
            displayBlogs();
        }
    } catch (error) {
        console.log(error);
    }
};

