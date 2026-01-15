AOS.init({ duration: 1200, once: true });

// Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    
    // Smooth trailing outline
    outline.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
    }, { duration: 500, fill: "forwards" });
});

// Parallax for Orbs
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    document.querySelector('.orb-1').style.transform = `translateY(${scroll * 0.2}px)`;
    document.querySelector('.orb-2').style.transform = `translateY(${scroll * -0.1}px)`;
});

// Hover effect for links
document.querySelectorAll('a, details, summary').forEach(link => {
    link.addEventListener('mouseenter', () => {
        outline.style.transform = 'scale(1.5)';
        outline.style.background = 'rgba(255,255,255,0.1)';
    });
    link.addEventListener('mouseleave', () => {
        outline.style.transform = 'scale(1)';
        outline.style.background = 'transparent';
    });
});
