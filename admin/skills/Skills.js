document.addEventListener('DOMContentLoaded', function() {
    const skillsList = document.querySelector('.skills-list');

    // Retrieve skills from local storage
    let skills = JSON.parse(localStorage.getItem('skills')) || [];

    // Function to create and display skills
    function displaySkills() {
        skillsList.innerHTML = '';

        // Iterate over each skill and create HTML elements dynamically
        skills.forEach(skill => {
            // Create elements for the skill
            const singleSkill = document.createElement('div');
            singleSkill.classList.add('single-skills', 'card');

            const skillTitleDescription = document.createElement('div');
            skillTitleDescription.classList.add('skill-title-description');

            const h2 = document.createElement('h2');
            h2.textContent = skill.title;

            const skillDesc = document.createElement('div');
            skillDesc.classList.add('skill-desc');

            const p = document.createElement('p');
            p.textContent = skill.desc;

            const skillActions = document.createElement('div');
            skillActions.classList.add('skill-actions');

            const actions = document.createElement('div');
            actions.classList.add('actions');

            const trashCanIcon = document.createElement('i');
            trashCanIcon.classList.add('fa-regular', 'fa-trash-can');
            trashCanIcon.addEventListener('click', function() {
                deleteSkill(skill.id);
            });


            const editLink = document.createElement('a');
            editLink.href = `./editSkills.html?id=${skill.id}`;
            const penToSquareIcon = document.createElement('i');
            penToSquareIcon.classList.add('fa-regular', 'fa-pen-to-square');

            // Append elements to their  parents
            actions.appendChild(trashCanIcon);
            editLink.appendChild(penToSquareIcon);
            actions.appendChild(editLink);
            skillActions.appendChild(actions);

            skillDesc.appendChild(p);
            skillDesc.appendChild(skillActions);

            skillTitleDescription.appendChild(h2);
            skillTitleDescription.appendChild(skillDesc);

            singleSkill.appendChild(skillTitleDescription);

            skillsList.appendChild(singleSkill);
        });
        
        function deleteSkill(skillId) {
            let skills = JSON.parse(localStorage.getItem('skills')) || [];
            const index = skills.findIndex(skill => skill.id === skillId);
            if (index !== -1) {
                skills.splice(index, 1); 
                localStorage.setItem('skills', JSON.stringify(skills));
            } else {
                console.error('Skill not found for deletion');
            }
        }

    }

    displaySkills();
});
