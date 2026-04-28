document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Contact Form Handler (Formspree Compatible)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('Message sent successfully! We\'ll be in touch soon.');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Something went wrong. Please email us directly at hello@palidosconsulting.com');
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    // Subtle Parallax on Dynamic Background
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelector('.dynamic-bg').style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
    });
});
