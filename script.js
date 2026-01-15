// Initialize Animations
AOS.init({ duration: 1000, once: true });

// Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Accordion Toggle for Experience/Leadership
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
        
        // Rotate Icon
        const icon = header.querySelector('i');
        icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});
