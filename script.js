// 1. INITIALIZE AOS
AOS.init({ duration: 1200, once: true });

const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

// 2. SMOOTHING VARIABLES
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let scrollTarget = 0;
let scrollCurrent = 0;

// Set ease: 0.05 is very smooth and 'heavy'
const scrollEase = 0.05; 
const cursorEase = 0.15;

scrollTarget = window.scrollY;
scrollCurrent = window.scrollY;

// 3. EVENT LISTENERS
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot moves instantly with mouse
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

window.addEventListener('wheel', (e) => {
    // Intercept default scroll
    e.preventDefault();
    scrollTarget += e.deltaY;
    
    // Boundary check
    scrollTarget = Math.max(0, Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

// 4. ANIMATION LOOP (Cursor + Refined Smooth Scroll)
function mainLoop() {
    // Smooth Cursor Outline
    cursorX += (mouseX - cursorX) * cursorEase;
    cursorY += (mouseY - cursorY) * cursorEase;
    outline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // REFINED Smooth Scroll Logic (Inertia)
    let scrollDiff = scrollTarget - scrollCurrent;
    scrollCurrent += scrollDiff * scrollEase;
    window.scrollTo(0, scrollCurrent);

    // Orb Parallax (Synced to smooth scroll)
    if(orb1) orb1.style.transform = `translateY(${scrollCurrent * 0.15}px)`;
    if(orb2) orb2.style.transform = `translateY(${scrollCurrent * -0.1}px)`;

    requestAnimationFrame(mainLoop);
}

// Start the loop
mainLoop();

// 5. ACCORDION AUTO-CLOSE LOGIC
const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
        details.forEach((detail) => {
            if (detail !== targetDetail) detail.removeAttribute("open");
        });
    });
});
