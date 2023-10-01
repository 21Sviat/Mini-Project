const userId = new URL(location.href).searchParams.get('userId');

fetch(`http://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then((user) => {
        const block = document.getElementsByClassName('wrap')[0];
        const blockInfo = document.createElement('div');
        blockInfo.className = `block-info`;
        block.appendChild(blockInfo);
        const ul = document.createElement('ul');
        buildUser(user, ul);
        blockInfo.appendChild(ul);

        const button = document.createElement('button');
        button.innerText = `Posts of current user`;
        button.className = `Posts-of-current-user`;
        block.appendChild(button);
        button.onclick = () => {
            button.disabled = true;

            fetch(`http://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(response => response.json())
                .then((posts) => {
                    const blockPost = document.getElementsByClassName('block-post')[0];
                    for (let post of posts) {
                        const postContainer = document.createElement('div');
                        postContainer.className = 'post-container';

                        const title = document.createElement('h2');
                        title.innerHTML = `<strong>Title:</strong> ${post.title}`;

                        const body = document.createElement('p');
                        body.innerHTML = `<strong>Body:</strong> ${post.body}`;

                        const detailsButton = document.createElement('button');
                        detailsButton.innerText = 'Details';
                        detailsButton.className = `detailsButton`

                        detailsButton.onclick = () => {
                            location.href = `../post-details/post-details.html?postId=${post.id}`;
                        };

                        postContainer.append(title, body, detailsButton);
                        blockPost.appendChild(postContainer);
                    }
                });
        };

        const blockPost = document.createElement('div');
        blockPost.className = `block-post`;
        block.appendChild(blockPost);
    });

function buildLi(key, value, parent) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${key}:</b> ${value}`;
    parent.appendChild(li);
}

function buildUl(key, object, parent) {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    li.innerHTML = `<b>${key}:</b>`

    parent.appendChild(li);
    li.appendChild(ul);
    buildUser(object, ul);
}

function buildUser(object, parent) {
    for (const key in object) {
        typeof object[key] === 'object'
            ? buildUl(key, object[key], parent)
            : buildLi(key, object[key], parent);
    }
}

