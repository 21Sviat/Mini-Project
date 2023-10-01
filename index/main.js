fetch('http://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => {
        let userList = document.getElementsByClassName('user-list')[0];
        for (let user of users) {
            const userContainer = document.createElement('div');
            userContainer.className = 'user-container';

            const id = document.createElement('h2');
            id.innerHTML = `<strong>ID:</strong> ${user.id}`;

            const name = document.createElement('p');
            name.innerHTML = `<strong>Name:</strong> ${user.name}`;

            const button = document.createElement('button');
            button.innerText = `More details`

            button.onclick = () => {
                location.href = `../user-details/user-details.html?userId=${user.id}`;
            }

            userContainer.append(id,name,button)

            userList.appendChild(userContainer);
        }
    })