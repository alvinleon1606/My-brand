    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('my-form');
        const titleInput = document.getElementById('title');
        const descInput = document.getElementById('desc');
        const iconInput = document.getElementById('icon');
        const percentInput = document.getElementById('percent');

        function getSkillIdFromUrl() {
            const queryParams = new URLSearchParams(window.location.search);
            return parseInt(queryParams.get('id'));
        }

        function getSkillDetails(skillId) {
            const skills = JSON.parse(localStorage.getItem('skills')) || [];
            return skills.find(skill => skill.id === skillId);
        }

        function populateFormFields(skill) {
            titleInput.value = skill.title;
            descInput.value = skill.desc;
            percentInput.value = skill.percent;
        }

        const skillId = getSkillIdFromUrl();

        const skill = getSkillDetails(skillId);

        populateFormFields(skill);

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const updatedSkill = {
                id: skillId,
                title: titleInput.value,
                desc: descInput.value,
                percent: percentInput.value
            };

                let skills = JSON.parse(localStorage.getItem('skills')) || [];
                const index = skills.findIndex(skill => skill.id === updatedSkill.id);

                if (index !== -1) {
                    skills[index] = updatedSkill;
                    localStorage.setItem('skills', JSON.stringify(skills));
                    form.reset()
                } else {
                    console.error('Skill not found for update');
                }

                alert('Updated Skill:', updatedSkill);
        });
    });
