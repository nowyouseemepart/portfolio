AOS.init({ duration: 1200, once: true });

// --- SMOOTH SCROLL ENGINE ---
let targetY = window.scrollY;
let currentY = window.scrollY;
const scrollEase = 0.075; // Adjust this: Lower is smoother, Higher is faster

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetY += e.deltaY;
    // Boundary checks
    targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

function updateScroll() {
    // Lerp calculation for buttery motion
    currentY += (targetY - currentY) * scrollEase;
    window.scrollTo(0, currentY);
    
    // Sync Orbs with Scroll for Parallax
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    if(orb1) orb1.style.transform = `translateY(${currentY * 0.15}px)`;
    if(orb2) orb2.style.transform = `translateY(${currentY * -0.1}px)`;

    requestAnimationFrame(updateScroll);
}
updateScroll();

// --- CURSOR ENGINE ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    outline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Fix for Nav Links: Sync targetY when clicking
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if(targetSection) {
            targetY = targetSection.offsetTop;
        }
    });
});
