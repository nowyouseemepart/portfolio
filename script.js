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

scrollTarget = window.scrollY;
scrollCurrent = window.scrollY;

// 3. EVENT LISTENERS
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollTarget += e.deltaY;
    scrollTarget = Math.max(0, Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

// 4. ANIMATION LOOP (Cursor + Scroll + Parallax)
function mainLoop() {
    // Smooth Cursor
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    outline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Smooth Scroll
    scrollCurrent += (scrollTarget - scrollCurrent) * 0.075;
    window.scrollTo(0, scrollCurrent);

    // Orb Parallax
    if(orb1) orb1.style.transform = `translateY(${scrollCurrent * 0.15}px)`;
    if(orb2) orb2.style.transform = `translateY(${scrollCurrent * -0.1}px)`;

    requestAnimationFrame(mainLoop);
}
mainLoop();

// 5. ACCORDION LOGIC
const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
        details.forEach((detail) => {
            if (detail !== targetDetail) detail.removeAttribute("open");
        });
    });
});
