const API_URL = "http://localhost:5000/blogs";

async function loadBlogs() {
    const res = await fetch(API_URL);
    const blogs = await res.json();

    const container = document.getElementById("blogs");
    container.innerHTML = "";

    blogs.forEach(blog => {
        const div = document.createElement("div");
        div.className = "blog";

        div.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.body}</p>
            <small><b>Author:</b> ${blog.author}</small>
            <div class="actions">
                <button class="edit" onclick="editBlog('${blog._id}', '${blog.title}', '${blog.body}', '${blog.author}')">Edit</button>
                <button onclick="deleteBlog('${blog._id}')">Delete</button>
            </div>
        `;

        container.appendChild(div);
    });
}

async function createBlog() {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const author = document.getElementById("author").value || "Anonymous";

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, author })
    });

    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
    document.getElementById("author").value = "";

    loadBlogs();
}

async function deleteBlog(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadBlogs();
}

function editBlog(id, currentTitle, currentBody, currentAuthor) {
    const newTitle = prompt("New title:", currentTitle);
    const newBody = prompt("New body:", currentBody);
    const newAuthor = prompt("New author:", currentAuthor);

    if (!newTitle || !newBody) {
        alert("Title and body cannot be empty");
        return;
    }

    updateBlog(id, newTitle, newBody, newAuthor);
}

async function updateBlog(id, title, body, author) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, author })
    });

    loadBlogs();
}

// Load blogs on page load
loadBlogs();
