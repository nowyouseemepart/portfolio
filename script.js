// Initialize AOS Animations
AOS.init({ duration: 1200, once: true });

// Cursor Elements
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

// State Variables for Smooth Motion (Lerp)
let mouseX = 0, mouseY = 0;     // Target position
let outlineX = 0, outlineY = 0; // Current outline position

// 1. Track Mouse Movement
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot moves instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// 2. The Animation Loop for Smooth Outline
function animateCursor() {
    // Linear Interpolation (0.15 creates a soft lag effect)
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 3. Magnetic Effect Logic
const magneticItems = document.querySelectorAll('.contact-pill, .nav-link, .exp-item summary, .project-container');

magneticItems.forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        
        // Calculate Distance from Center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Apply Magnetic Pull (Strength: 0.25)
        this.style.transform = `translate(${deltaX * 0.25}px, ${deltaY * 0.25}px)`;
        
        // Scale Cursor
        outline.classList.add('active');
    });

    item.addEventListener('mouseleave', function() {
        // Reset Position
        this.style.transform = `translate(0px, 0px)`;
        outline.classList.remove('active');
    });
});

// 4. Parallax Background Orbs
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    if(orb1) orb1.style.transform = `translateY(${scroll * 0.2}px)`;
    if(orb2) orb2.style.transform = `translateY(${scroll * -0.1}px)`;
});

// 5. Accordion Auto-Close Logic
const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
        details.forEach((detail) => {
            if (detail !== targetDetail) {
                detail.removeAttribute("open");
            }
        });
    });
});
// --- SMOOTH SCROLL VELOCITY ---
// Line: At the bottom of script.js

let currentScroll = 0;
let targetScroll = 0;
const ease = 0.075; // Adjust this for "weight": Lower is smoother/slower

function smoothScroll() {
    // Linear Interpolation (Lerp) for scroll position
    currentScroll += (targetScroll - currentScroll) * ease;
    
    // Use the native scrollTo with our calculated eased value
    window.scrollTo(0, currentScroll);
    
    requestAnimationFrame(smoothScroll);
}

// Initial setup
targetScroll = window.scrollY;
currentScroll = window.scrollY;

window.addEventListener('wheel', (e) => {
    // Prevent default browser jumpy scroll
    e.preventDefault();
    
    // Update the target scroll based on wheel movement
    targetScroll += e.deltaY;
    
    // Clamp values so you don't scroll past top or bottom
    targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

// Start the animation loop
smoothScroll();
