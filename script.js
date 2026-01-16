// 1. INITIALIZE ANIMATIONS
AOS.init({ duration: 1200, once: true });

const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

// 2. STATE VARIABLES
let mouseX = 0, mouseY = 0;     // Target Mouse
let cursorX = 0, cursorY = 0;   // Current Cursor (Smooth)
let scrollTarget = 0;           // Target Scroll
let scrollCurrent = 0;          // Current Scroll (Smooth)

// Sync scroll variables on page load
scrollTarget = window.scrollY;
scrollCurrent = window.scrollY;

// 3. EVENT LISTENERS
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Tiny dot stays with mouse perfectly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

window.addEventListener('wheel', (e) => {
    e.preventDefault(); // Stop jumpy default scroll
    scrollTarget += e.deltaY;
    // Keep scroll within page bounds
    scrollTarget = Math.max(0, Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

// 4. THE ANIMATION LOOP (LERP)
// This runs 60-120 times per second for maximum smoothness
function mainLoop() {
    // Smooth Cursor Outline (0.15 = weight)
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    outline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Smooth Scrolling (0.075 = buttery weight)
    scrollCurrent += (scrollTarget - scrollCurrent) * 0.075;
    window.scrollTo(0, scrollCurrent);

    // Subtle Orb Parallax
    if(orb1) orb1.style.transform = `translateY(${scrollCurrent * 0.15}px)`;
    if(orb2) orb2.style.transform = `translateY(${scrollCurrent * -0.1}px)`;

    requestAnimationFrame(mainLoop);
}
mainLoop();

// 5. MAGNETIC ATTRACTION
const magneticItems = document.querySelectorAll('.contact-pill, .nav-link, .exp-item summary, .project-container');

magneticItems.forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const pullX = (e.clientX - centerX) * 0.3;
        const pullY = (e.clientY - centerY) * 0.3;

        this.style.transform = `translate(${pullX}px, ${pullY}px)`;
        outline.classList.add('active');
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = `translate(0px, 0px)`;
        outline.classList.remove('active');
    });
});

// 6. ACCORDION LOGIC
const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
        details.forEach((detail) => {
            if (detail !== targetDetail) detail.removeAttribute("open");
        });
    });
});
