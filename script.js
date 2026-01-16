AOS.init({ duration: 1200, once: true });

const body = document.body;
const scrollContainer = document.querySelector("#scroll-container");
const scrollContent = document.querySelector("#scroll-content");

let scrollTarget = 0;
let scrollCurrent = 0;
const scrollEase = 0.08; // Adjust between 0.05 (slower) and 0.1 (faster)

// Sync height of body to content height
function setBodyHeight() {
    body.style.height = scrollContent.getBoundingClientRect().height + "px";
}
window.addEventListener("resize", setBodyHeight);
setBodyHeight();

// The Smoothing Function
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function smoothScroll() {
    scrollCurrent = lerp(scrollCurrent, scrollTarget, scrollEase);
    
    // Move the content using GPU transform
    scrollContent.style.transform = `translateY(-${scrollCurrent}px)`;
    
    // Refresh AOS positions as we scroll
    if (Math.abs(scrollTarget - scrollCurrent) > 0.1) {
        AOS.refresh();
    }

    requestAnimationFrame(smoothScroll);
}

// Mouse Wheel Event
window.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollTarget += e.deltaY;
    
    // Clamp values
    const maxScroll = scrollContent.getBoundingClientRect().height - window.innerHeight;
    scrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));
}, { passive: false });

// Start the loop
smoothScroll();

// --- CURSOR LOGIC ---
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
    cursorX = lerp(cursorX, mouseX, 0.15);
    cursorY = lerp(cursorY, mouseY, 0.15);
    outline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// --- NAV CLICK FIX ---
// Standard anchors don't work with virtual scroll, so we intercept them
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            scrollTarget = targetElement.offsetTop;
        }
    });
});
