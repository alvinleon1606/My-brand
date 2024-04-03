document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('my-form');
    const titleInput = document.getElementById('title');
    const descInput = document.getElementById('desc');
    const percentInput = document.getElementById('percent');


    // token
    const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    const token = userLog?.token
    

    function getSkillIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    const getSkillDetails = async(skillId) => {
        try {
            const response = await fetch(`https://leonx.onrender.com/skills/${skillId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch skill details');
            }
            const data = await response.json();
            return data.data; 
        } catch (error) {
            console.error('Error fetching skill details:', error);
            return null;
        }
    }
    

    function populateFormFields(skill) {
        titleInput.value = skill.title;
        descInput.value = skill.description;
        percentInput.value = skill.percent;
    }

    async function updateSkill(updatedSkill) {
        try {
            const response = await fetch(`https://leonx.onrender.com/skills/edit/${skillId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: updatedSkill
            });
            if (!response.ok) {
                throw new Error('Failed to update skill');
            }
            alert('Skill updated successfully');

        } catch (error) {
            console.error('Error updating skill:', error);
            alert('Failed to update skill');
        }
    }

    const skillId = getSkillIdFromUrl();
    const skill = await getSkillDetails(skillId);

    populateFormFields(skill);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', titleInput.value);
        formData.append('description', descInput.value);
        formData.append('percent', percentInput.value);
    
        updateSkill(formData);
    });
});
