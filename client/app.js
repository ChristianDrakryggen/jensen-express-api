//api root
const rootURL = "http://localhost:5000/api/";

let posts = [];

//response message
const showResponseMessage = (message) => {
  document.querySelector("#response-message").innerHTML = message;
  setTimeout(() => {
    document.querySelector("#response-message").innerHTML = "";
  }, 2000);
};

//get posts
const getPosts = async () => {
  const res = await fetch(`${rootURL}getposts`);
  const data = await res.json();
  posts = data.posts;
  document.querySelector("#posts").innerHTML = posts
    .map(
      (post) => `
    <div>
        <h3 id="'${post._id}'-title">${post.title}</h3>
        <p id="'${post._id}'-content">${post.content}</p>
        <form onsubmit="updatePost('${post._id}'); return false;" >
            <input id="update-post-'${post._id}'-title" placeholder="Title">
            <input id="update-post-'${post._id}'-content" placeholder="Content">
            <button type="submit">Update</button>
        </form>
        <button onclick="deletePost('${post._id}')">Delete</button>
    </div>
    `
    )
    .join("");
};

//new post
const newPost = async () => {
  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;

  const post = {
    title,
    content,
  };

  const res = await fetch(`${rootURL}newpost`, {
    method: "post",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  getPosts();
  showResponseMessage(data.message.msgBody);

  document.querySelector("#post-title").value = "";
  document.querySelector("#post-content").value = "";
};

//update post
const updatePost = async (id) => {
  const title = document.getElementById(`update-post-'${id}'-title`).value;
  const content = document.getElementById(`update-post-'${id}'-content`).value;

  const post = {
    title: title ? title : document.getElementById(`'${id}'-title`).innerHTML,
    content: content
      ? content
      : document.getElementById(`'${id}'-content`).innerHTML,
  };

  const res = await fetch(`${rootURL}updatepost/${id}`, {
    method: "put",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  getPosts();
  showResponseMessage(data.message.msgBody);
};

//delete post
const deletePost = async (id) => {
  const res = await fetch(`${rootURL}deletepost/${id}`, {
    method: "delete",
  });
  const data = await res.json();
  getPosts();
  showResponseMessage(data.message.msgBody);
};

window.addEventListener("load", getPosts);
