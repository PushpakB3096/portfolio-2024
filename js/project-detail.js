document.addEventListener('DOMContentLoaded', () => {
    // Get project ID and referrer from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const referrer = urlParams.get('from') || 'home'; // Default to home if not specified

    // Get project data
    const project = projectsData[projectId];

    if (!project) {
        window.location.href = 'index.html#projects';
        return;
    }

    // Get back button text and URL based on referrer
    const getBackLink = () => {
        switch(referrer) {
            case 'projects':
                return {
                    text: 'Back to All Projects',
                    url: 'projects.html'
                };
            default:
                return {
                    text: 'Back to Home',
                    url: 'index.html#projects'
                };
        }
    };

    const backLink = getBackLink();

    // Update page title
    document.title = `${project.title} - Portfolio`;

    // Render project content
    const projectContent = document.getElementById('project-content');
    projectContent.innerHTML = `
        <div class="back-button">
            <a href="${backLink.url}" class="back-link">
                <i class="fas fa-arrow-left"></i>
                ${backLink.text}
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
                <div class="features-grid">
                    ${project.features.map((feature, index) => `
                        <div class="feature-card">
                            <div class="feature-icon">
                                ${getFeatureIcon(index)}
                            </div>
                            <div class="feature-content">
                                <h3>${feature.title}</h3>
                                <p>${feature.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="project-gallery">
                <h2>Project Gallery</h2>
                <div class="gallery-grid">
                    ${project.gallery.map(img => `
                        <div class="gallery-item">
                            <img src="${img}" alt="Project Screenshot" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // Add lightbox functionality for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="Project Screenshot">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            document.body.appendChild(lightbox);

            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                lightbox.remove();
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });
        });
    });
});

// Helper function to get feature icons
function getFeatureIcon(index) {
    const icons = [
        'fa-chart-line',
        'fa-mobile-screen',
        'fa-gauge-high',
        'fa-shield-halved',
        'fa-arrows-rotate',
        'fa-cloud'
    ];
    return `<i class="fas ${icons[index % icons.length]}"></i>`;
} 