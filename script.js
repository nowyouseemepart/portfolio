// 1. INITIALIZE AOS (Scroll Animations)
AOS.init({ 
    duration: 1200, 
    once: true,
    offset: 100 
});

// 2. CUSTOM CURSOR LOGIC
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct movement for the small dot
    dot.style.transform = `translate(${posX}px, ${posY}px)`;
    
    // The outline follows with a CSS transition for that "liquid" delay
    outline.style.transform = `translate(${posX}px, ${posY}px)`;
});

// 3. NATIVE SCROLL PARALLAX
// Provides depth without heavy processing
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    // Orbs drift slowly as you scroll
    if(orb1) orb1.style.transform = `translateY(${scrolled * 0.15}px)`;
    if(orb2) orb2.style.transform = `translateY(${scrolled * -0.1}px)`;
});

// 4. ACCORDION AUTO-CLOSE (Experience Section)
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

// 5. CLICK-TO-COPY (Optional Fun Feature)
// If you click your email, it could copy to clipboard
document.querySelectorAll('.contact-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        outline.style.transform += ' scale(1.5)';
        outline.style.borderColor = 'rgba(255,255,255,1)';
    });
    pill.addEventListener('mouseleave', () => {
        outline.style.transform = outline.style.transform.replace(' scale(1.5)', '');
        outline.style.borderColor = 'rgba(255,255,255,0.4)';
    });
});
