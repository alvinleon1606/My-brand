document.addEventListener('DOMContentLoaded', function() {
    const skillsList = document.querySelector('.skills-list');

    // token
    const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    const token = userLog?.token

    async function fetchSkills() {
        try {
            const response = await fetch('http://localhost:8080/skills/all');
            if (!response.ok) {
                throw new Error('Failed to fetch skills');
            }
            const skills = await response.json();
            return skills;
        } catch (error) {
            console.error('Error fetching skills:', error);
            return [];
        }
    }

    async function displaySkills() {
        // Fetch skills from the server
        const skills = await fetchSkills();

        skillsList.innerHTML = '';

        // Iterate over each skill and create HTML elements dynamically
        skills?.data.forEach(skill => {
            // Create elements for the skill
            const singleSkill = document.createElement('div');
            singleSkill.classList.add('single-skills', 'card');
            singleSkill.dataset.id = skill._id;

            const skillTitleDescription = document.createElement('div');
            skillTitleDescription.classList.add('skill-title-description');

            const h2 = document.createElement('h2');
            h2.textContent = skill.title;

            const skillDesc = document.createElement('div');
            skillDesc.classList.add('skill-desc');

            const p = document.createElement('p');
            p.textContent = skill.description;

            const skillActions = document.createElement('div');
            skillActions.classList.add('skill-actions');

            const actions = document.createElement('div');
            actions.classList.add('actions');

            const trashCanIcon = document.createElement('i');
            trashCanIcon.classList.add('fa-regular', 'fa-trash-can');
            trashCanIcon.addEventListener('click', function() {
                deleteSkill(skill._id);
            });

            const editLink = document.createElement('a');
            editLink.href = `./editSkills.html?id=${skill._id}`;
            const penToSquareIcon = document.createElement('i');
            penToSquareIcon.classList.add('fa-regular', 'fa-pen-to-square');

            // Append elements to their parents
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
    }

    async function deleteSkill(id) {
        try {
            const response = await fetch(`http://localhost:8080/skills/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete skill');
            }
            const data = await response.json();
            alert('Skill deleted successfully');
            const skillCardElement = document.querySelector(`.single-skills[data-id="${id}"]`);
            if (skillCardElement) {
                skillCardElement.remove();
            }
        } catch (error) {
            console.error('Error deleting skill:', error);
            alert('Failed to delete skill');
        }
    }
    

    displaySkills();
});

