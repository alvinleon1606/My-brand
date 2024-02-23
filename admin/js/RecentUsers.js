document.addEventListener('DOMContentLoaded', () =>{
    const usersList = document.getElementById('recent-users-list');
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const Subs = JSON.parse(localStorage.getItem("Subscribers")) || [];
    const messages = JSON.parse(localStorage.getItem("Messages")) || [];

    document.getElementById('subs').innerHTML = Subs.length;
    document.getElementById('msg').innerHTML = messages.length;
    document.getElementById('users').innerHTML = users.length;

    //
    if (users.length=== 0) {
        usersList.innerHTML = 'No one Recently Registered so far !'
    }
    usersList.innerHTML = ""
    // create table
    const table = document.createElement('table')
    const thead = document.createElement('thead')

    thead.innerHTML = `
    <tr>
        <th>Names</th>
        <th>Email</th>
        <th>Telephone</th>
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
            <td>${user.names}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        `;
        tbody.appendChild(row);
    })
    table.appendChild(tbody);
    tableContainer.appendChild(table)
    usersList.appendChild(tableContainer)
})