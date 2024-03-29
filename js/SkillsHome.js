document.addEventListener('DOMContentLoaded', function() {
    const skillsData = [
        { name: 'Next.js', percent: '90%' },
        { name: 'React.js', percent: '90%' },
        { name: 'Django', percent: '90%' },
        { name: 'Prisma', percent: '90%' },
        { name: 'React Native', percent: '90%' },
        { name: 'GraphQL', percent: '90%' },
        { name: 'Node.js', percent: '90%' }
    ];

    const skillsCards = document.querySelector('.skills-cards');
    // fetch all skills
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
    
    const displaySkills = async() =>{
        // skills
        const skillsData = await fetchSkills();

        skillsData?.data.forEach(skill => {
            const card = document.createElement('div');
            card.classList.add('card');
    
            const img = document.createElement('img');
            img.src = `http://localhost:8080/${skill.icon}`
    
            const skillDesc = document.createElement('div');
            skillDesc.classList.add('skil-desc');
    
            const skillNamePercent = document.createElement('div');
            skillNamePercent.classList.add('skill-name-percent');
    
            const skillName = document.createElement('div');
            skillName.classList.add('skill-name');
            skillName.textContent = skill.title;
    
            const percent = document.createElement('div');
            percent.classList.add('percent');
            percent.textContent = skill.percent +"%";
    
            const skillBar = document.createElement('div');
            skillBar.classList.add('skill-bar');
    
            const mainBar = document.createElement('div');
            mainBar.classList.add('main-bar');
    
            const innerBar = document.createElement('div');
            innerBar.classList.add('inner-bar');
    
            mainBar.appendChild(innerBar);
            skillBar.appendChild(mainBar);
            skillNamePercent.appendChild(skillName);
            skillNamePercent.appendChild(percent);
            skillDesc.appendChild(skillNamePercent);
            skillDesc.appendChild(skillBar);
            card.appendChild(img);
            card.appendChild(skillDesc);
            skillsCards.appendChild(card);
        });
    }

    displaySkills()
});
