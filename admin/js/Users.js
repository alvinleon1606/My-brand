document.addEventListener('DOMContentLoaded', async() =>{
    const usersList = document.getElementById('users-list');
    // token ...............
    const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    const token = userLog?.token

    try {
        const usersResponse = await fetch('http://localhost:8080/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!usersResponse.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await usersResponse.json();

        if (users?.data.length === 0) {
            usersList.innerHTML = 'No one has registered recently!';
            return;
        }

    //
    if (users.length=== 0) {
        usersList.innerHTML = 'No one Registered so far !'
    }
    usersList.innerHTML = ""

    // create table
    const table = document.createElement('table')
    const thead = document.createElement('thead')

    thead.innerHTML = `
    <tr>
        <th>Email</th>
        <th>Names</th>
        <th>Telephone</th>
        <th>Role</th>
        <th>Action</th>
    </tr>
    `
    table.appendChild(thead);

    // create table body
    const tbody = document.createElement('tbody')

    // Table container
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    // display each sub
    users?.data.forEach((user) =>{
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.firstName + " "+ user.secondName}</td>
            <td>${user.subEmail}</td>
            <td>${user.role}</td>
            <td><button class="delete-btn" data-user-id="${user._id}">Delete</button></td>
        `;
        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', async () => {
            const userId = (deleteButton.getAttribute('data-user-id'));
        
            try {
                const response = await fetch(`http://localhost:8080/users/delete/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
        
                // Remove the user row from the DOM
                row.remove();
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        });
        
        tbody.appendChild(row);
    })
    table.appendChild(tbody);
    tableContainer.appendChild(table)
    usersList.appendChild(tableContainer)

    } catch (error) {
        console.error('Failed to fetch users:', error);
        usersList.innerHTML = 'Failed to fetch users';
    }
})