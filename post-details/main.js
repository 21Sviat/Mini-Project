const postId = new URL(location.href).searchParams.get('postId');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then((post) => {
        const postContainer = document.querySelector('.post-container');
        buildPost(post, postContainer);
    });

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then((comments) => {
        const commentsContainer = document.querySelector('.comments-container');
        comments.forEach(comment => {
            const commentContainer = document.createElement('div');
            commentContainer.className = 'comment-container';

            const name = document.createElement('h3');
            name.textContent = comment.name;

            const id = document.createElement('p');
            id.textContent = comment.id;

            const body = document.createElement('p');
            body.textContent = comment.body;

            commentContainer.append(name, id, body);
            commentsContainer.appendChild(commentContainer);
        });
    });

function buildPost(post, parent) {
    const title = document.createElement('h2');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.textContent = post.body;

    parent.appendChild(title);
    parent.appendChild(body);
}