
const urlBase = 'https://jsonplaceholder.typicode.com/';
const postSlug = 'posts';
const userSlug =  'users/1/albums'

const URL_POSTS = `${urlBase}${postSlug}`;
// const URL_USERS = `${urlBase}${userSlug}`;

// Fetching data from the server
const fetchPosts = async () => {
    try {
        const response = await fetch(URL_POSTS);
        const data = await response.json();
        renderPosts(data);
    }
    catch (error) {
        console.log('Error: ', error);
    }
}
// Add event listener 
window.addEventListener('load', () => {
    fetchPosts();
});

// fetch(URL_USERS)
//   .then((response) => response.json())
//   .then((users) => console.log(users));

function renderPosts(posts) {
    posts.forEach(post => {
        const { id, title, body } = post;
        const listadoPosts = document.getElementById('listado-posts');

        const postLi = document.createElement('li');
        postLi.id = `id-${id}`;
        postLi.classList.add('border-l-2', 'pl-4','mb-4', 'border-cyan-900' );

        const postTitle = document.createElement('h3');
        postTitle.classList.add('text-xl', 'font-semibold', 'capitalize');
        postTitle.textContent = title;

        const postBody = document.createElement('p');
        postBody.textContent = body;

        postLi.appendChild(postTitle);
        postLi.appendChild(postBody);
        listadoPosts.appendChild(postLi);

    });
}
