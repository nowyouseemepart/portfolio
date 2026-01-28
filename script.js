// 1. INITIALIZE LENIS (THE SMOOTH SCROLL ENGINE)
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // High-end ease-out curve
    smoothWheel: true,
    wheelMultiplier: 1,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: false, // Keep touch scrolling native for better mobile feel
});

// Animation loop to keep Lenis running
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. INITIALIZE AOS
AOS.init({ duration: 1200, once: true });

// Sync AOS with Lenis (important for scroll-triggered animations)
lenis.on('scroll', AOS.refresh);

// 3. CURSOR ENGINE
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

// 4. ORB PARALLAX
lenis.on('scroll', (e) => {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    if (orb1) orb1.style.transform = `translateY(${e.scroll * 0.1}px)`;
    if (orb2) orb2.style.transform = `translateY(${e.scroll * -0.05}px)`;
});

// 5. NAV CLICK ANCHOR FIX (Smooth glide to section)
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        lenis.scrollTo(id); // Use lenis to scroll smoothly to the target
    });
});
