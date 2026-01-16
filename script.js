// Initialize AOS (Animate on Scroll)
AOS.init({ duration: 1200, once: true });

const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// 1. Update mouse coordinates on movement
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate movement for the center dot
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// 2. The Smoothing Loop for the Outline (Better performance than .animate)
function animateCursor() {
    // Linear Interpolation: (Target - Current) * Speed
    // Adjust 0.15 to change lag/smoothness (Lower = slower trailing)
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 3. Parallax Effect for Background Orbs
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    if (orb1) orb1.style.transform = `translateY(${scroll * 0.2}px)`;
    if (orb2) orb2.style.transform = `translateY(${scroll * -0.1}px)`;
});

// 4. Hover Effects for Interactive Elements
const hoverElements = document.querySelectorAll('a, details, summary, .contact-pill, .nav-link');

hoverElements.forEach(link => {
    link.addEventListener('mouseenter', () => {
        // We use scale to expand the outline without changing its layout size
        outline.style.width = '60px';
        outline.style.height = '60px';
        outline.style.marginLeft = '-30px'; // Recenter based on new width
        outline.style.marginTop = '-30px';  // Recenter based on new height
        outline.style.background = 'rgba(255, 255, 255, 0.1)';
        outline.style.borderColor = 'rgba(255, 255, 255, 0.8)';
    });
    
    link.addEventListener('mouseleave', () => {
        // Reset to original CSS values
        outline.style.width = '40px';
        outline.style.height = '40px';
        outline.style.marginLeft = '-20px';
        outline.style.marginTop = '-20px';
        outline.style.background = 'transparent';
        outline.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    });
});
