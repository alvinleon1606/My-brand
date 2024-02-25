document.addEventListener('DOMContentLoaded', () =>{
    const usersList = document.getElementById('users-list');
    let users = JSON.parse(localStorage.getItem("users")) || [];

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
        <th>Joined Date</th>
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
    users.forEach((user) =>{
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.names}</td>
            <td>${user.subEmail}</td>
            <td>${user.userId}</td>
            <td><button class="delete-btn" data-index="${user.userId}">Delete</button></td>
        `;
        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () =>{
            const index = parseInt(deleteButton.getAttribute('data-index'));
            const u = users=users.filter((user) => user.userId !==index)
            if(u && confirm("are you?")){
                localStorage.setItem('users', JSON.stringify(users))
                row.remove()
            }
        })
        tbody.appendChild(row);
    })
    table.appendChild(tbody);
    tableContainer.appendChild(table)
    usersList.appendChild(tableContainer)
})