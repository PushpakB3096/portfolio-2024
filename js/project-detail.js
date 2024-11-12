document.addEventListener('DOMContentLoaded', () => {
    // Get project ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // Get project data
    const project = projectsData[projectId];

    if (!project) {
        window.location.href = 'index.html#projects';
        return;
    }

    // Update page title
    document.title = `${project.title} - Portfolio`;

    // Render project content
    const projectContent = document.getElementById('project-content');
    projectContent.innerHTML = `
        <div class="back-button">
            <a href="index.html#projects" class="back-link">
                <i class="fas fa-arrow-left"></i>
                Back to Projects
            </a>
        </div>

        <div class="project-hero">
            <img src="${project.image}" alt="${project.title}" class="project-banner">
            <div class="project-hero-content">
                <h1>${project.title}</h1>
                <div class="project-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-date">${project.date}</span>
                </div>
            </div>
        </div>

        <div class="project-content">
            <div class="project-overview">
                <h2>Project Overview</h2>
                <p>${project.overview}</p>
                
                <div class="project-tech">
                    <h3>Technologies Used</h3>
                    <ul class="tech-stack">
                        ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>

                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="${project.githubLink}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i>
                        Source Code
                    </a>
                </div>
            </div>

            <div class="project-features">
                <h2>Key Features</h2>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="project-gallery">
                <h2>Project Gallery</h2>
                <div class="gallery-grid">
                    ${project.gallery.map(img => `
                        <img src="${img}" alt="Project Screenshot">
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}); 