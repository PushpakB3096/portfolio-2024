// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Form handling
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
});

// Project hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(2)';
    });
    
    card.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillSection = document.querySelector('.skills-container');
    const progressBars = document.querySelectorAll('.progress-line span');
    
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;
    
    if(sectionPos < screenPos) {
        progressBars.forEach(bar => {
            const value = bar.dataset.progress;
            bar.style.width = value;
        });
    }
};

window.addEventListener('scroll', animateSkillBars);

// Animate stats counter
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const count = parseInt(stat.innerText);
        const increment = target / 200;
        
        if(count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 1);
        } else {
            stat.innerText = target + "+";
        }
    });
};

// Trigger stats animation when section is in view
const statsSection = document.querySelector('.stats-grid');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateStats();
        }
    });
}, observerOptions);

observer.observe(statsSection);

// Project filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    // Reset animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = null;
                    
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'grid';
                        card.style.animationDelay = `${Array.from(projectCards).indexOf(card) * 0.1}s`;
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Trigger layout recalculation
                const projectGrid = document.querySelector('.project-grid');
                if (projectGrid) {
                    projectGrid.style.display = 'none';
                    projectGrid.offsetHeight;
                }
            });
        });
    }
});

// Project card hover effect
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-image img').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-image img').style.transform = 'scale(1)';
    });
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});