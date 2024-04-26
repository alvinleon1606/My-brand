document.addEventListener('DOMContentLoaded', async () => {
    const usersList = document.getElementById('recent-users-list');

    // token .....
    const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    const token = userLog?.token


    // Fetch subscribers
    try {
        const subsResponse = await fetch('https://leonx-ldu1.onrender.com/subscribers/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!subsResponse.ok) {
            throw new Error('Failed to fetch subscribers');
        }
        const subs = await subsResponse.json();

        document.getElementById('subs').innerHTML = subs?.Subs.length;
    } catch (error) {
        console.error('Failed to fetch subscribers:', error);
    }

    // Fetch messages
    try {
        const messagesResponse = await fetch('https://leonx-ldu1.onrender.com/messages/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!messagesResponse.ok) {
            throw new Error('Failed to fetch messages');
        }
        const messages = await messagesResponse.json();

        document.getElementById('msg').innerHTML = messages?.content.length;
    } catch (error) {
        console.error('Failed to fetch messages:', error);
    }

    // Fetch users
    try {
        const usersResponse = await fetch('https://leonx-ldu1.onrender.com/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!usersResponse.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await usersResponse.json();

        document.getElementById('users').innerHTML = users?.data.length;

        if (users?.data.length === 0) {
            usersList.innerHTML = 'No one has registered recently!';
            return;
        }

        // Create a table to display users
        usersList.innerHTML = '';
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Names</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        users?.data.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstName+" "+user.secondName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');
        tableContainer.appendChild(table);
        usersList.appendChild(tableContainer);

    } catch (error) {
        console.error('Failed to fetch users:', error);
        usersList.innerHTML = 'Failed to fetch users';
    }
});
