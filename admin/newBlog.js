const form = document.querySelector('.new-blog-form');
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

const goToEditBlog = (id) => {
    window.location.href = `editBlog.html?id=${id}`;
};

// delete blog function
const deleteBlog = (id) => {
    Blogs = Blogs.filter((blog) => blog.id !== id);
    localStorage.setItem('Blogs', JSON.stringify(Blogs));
    displayBlogs();
};

// display blogs
const displayBlogs = () => {
    const blogList = document.querySelector('.blogs-list');
    if (Blogs.length === 0) {
        blogList.innerHTML = 'You do not have blogs';
        return;
    }
    blogList.innerHTML = "";
    Blogs.forEach((blog) => {
        const blogImage = (blog.image).split("\\").pop();
        const blogsDiv = document.createElement('div');
        blogsDiv.classList.add('single-bloggg');
        blogsDiv.innerHTML = `
            <div class="single-blog card">
            <img src="../assets/${blogImage}" alt="" class="blog-img">
            <div class="blog-title-description-likesComment">
                <h2>${blog.title}</h2>
                <div class="blog-desc-likes">
                    <p>${blog.description}
                    </p>
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
                            <i onclick="goToEditBlog(${blog.id})" class="fa-regular fa-pen-to-square"></i>
                            <i onclick="deleteBlog(${blog.id})" class="fa-regular fa-trash-can" ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        blogList.appendChild(blogsDiv);
    });
};

// Initial document load
document.addEventListener('DOMContentLoaded', () => {
    const storedBlogs = JSON.parse(localStorage.getItem('Blogs'));
    if (Array.isArray(storedBlogs)) {
        Blogs = storedBlogs;
    }
    displayBlogs();
});

// Create a blog
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleField.value.trim();
    const category = categoryField.value.trim();
    const image = imageField.value.trim();
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

    if (image === '') {
        imageError.textContent = 'Blog image cannot be empty';
        imageError.style.color = 'red';
        isValid = false;
    } else {
        imageError.textContent = '';
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
        const newBlog = {
            id: Date.now(),
            title: title,
            image: image,
            description: description,
            tag: tag,
            category: category
        };
        CreateBlogs(newBlog);
        window.location.href = './Blogs.html';
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
const CreateBlogs = (newBlog) => {
    Blogs.push(newBlog);
    const yes = localStorage.setItem('Blogs', JSON.stringify(Blogs));
    if(yes){
        window.location.href = './Blogs.html';
        displayBlogs();
    }
};
