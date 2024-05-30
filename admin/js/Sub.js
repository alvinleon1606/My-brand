document.addEventListener('DOMContentLoaded', async() =>{
    const usersList = document.getElementById('users-list');

    const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    const token = userLog?.token

    try {
        const subsResponse = await fetch('https://leonx-ldu1-vvuz.onrender.com/subscribers/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!subsResponse.ok) {
            throw new Error('Failed to fetch subscribers');
        }

        const subscribers = await subsResponse.json();

        if (subscribers.Subs.length === 0) {
            usersList.innerHTML = 'No one has subscribed yet!';
            return;
        }

        // Create table
        const table = document.createElement('table');
        const thead = document.createElement('thead');

        thead.innerHTML = `
            <tr>
                <th>Email</th>
                <th>Subscribed Date</th>
                <th>Action</th>
            </tr>
        `;
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        subscribers.Subs.forEach((sub) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${sub.email}</td>
                <td>${new Date(sub.subAt).toLocaleString()}</td>
                <td><button class="delete-btn" data-index="${sub._id}">Delete</button></td>
            `;

            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', async () => {
                try {
                    const response = await fetch(`https://leonx-ldu1-vvuz.onrender.com/subscribers/delete/${sub._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete subscriber');
                    }

                    // Remove the row from the table
                    row.remove();
                } catch (error) {
                    console.error('Failed to delete subscriber:', error);
                }
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        usersList.appendChild(table);

    } catch (error) {
        console.error('Failed to fetch subscribers:', error);
    }
});
