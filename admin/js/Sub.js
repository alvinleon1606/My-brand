document.addEventListener('DOMContentLoaded', async() =>{
    const susbList = document.getElementById('users-list');
    let Subscribers = JSON.parse(localStorage.getItem("Subscribers")) || [];


        // Fetch subscribers
    try {
        const subsResponse = await fetch('http://localhost:8080/subscribers/all');
        if (!subsResponse.ok) {
            throw new Error('Failed to fetch subscribers');
     }
    const Subscribers = await subsResponse.json();
    
     document.getElementById('subs').innerHTML = subs?.Subs.length;
        

    if (Subscribers.length=== 0) {
        susbList.innerHTML = 'No one Subscribed so far !'
    }
    susbList.innerHTML = ""

    // create table
    const table = document.createElement('table')
    const thead = document.createElement('thead')

    thead.innerHTML = `
    <tr>
        <th>Email</th>
        <th>Subscribed Date</th>
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
    Subscribers.forEach((sub) =>{
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${sub.subEmail}</td>
            <td>${sub.subDate}</td>
            <td><button class="delete-btn" data-index="${sub.subDate}">Delete</button></td>
        `;
        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () =>{
            const index = parseInt(deleteButton.getAttribute('data-index'));
            const su = Subscribers=Subscribers.filter((su) => su.subDate !==index)
            if(su && confirm("are you?")){
                localStorage.setItem('Subscribers', JSON.stringify(Subscribers))
                row.remove()
            }
        })
        tbody.appendChild(row);
    })
    table.appendChild(tbody);
    tableContainer.appendChild(table)
    susbList.appendChild(tableContainer)

} catch (error) {
        console.error('Failed to fetch subscribers:', error);
    }
})