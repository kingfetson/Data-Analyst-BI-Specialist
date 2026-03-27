// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// --- MODAL LOGIC ---

const modal = document.getElementById('project-modal');
const closeBtn = document.querySelector('.close-modal');
const projectCards = document.querySelectorAll('.project-card');

// Elements inside the modal to update
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalMetric1 = document.getElementById('modal-metric1');
const modalMetric2 = document.getElementById('modal-metric2');
const modalTools = document.getElementById('modal-tools');
const modalGithubBtn = document.getElementById('modal-github-btn');

// Add click event to all project cards
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Get data from data-attributes
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const m1 = card.getAttribute('data-metric1');
        const m2 = card.getAttribute('data-metric2');
        const tools = card.getAttribute('data-tools');
        const githubLink = card.getAttribute('data-github');

        // Populate Modal
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalMetric1.textContent = m1;
        modalMetric2.textContent = m2;
        modalGithubBtn.href = githubLink;

        // Create tool pills dynamically
        modalTools.innerHTML = '';
        const toolsArray = tools.split(',');
        toolsArray.forEach(tool => {
            const span = document.createElement('span');
            span.className = 'tool-pill';
            span.textContent = tool.trim();
            modalTools.appendChild(span);
        });

        // Show Modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close Modal Function
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close when clicking X
closeBtn.addEventListener('click', closeModal);

// Close when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Fade In Animation on Scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
