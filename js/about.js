// About page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.social-links').style.bottom = '20px';
        });
        
        member.addEventListener('mouseleave', function() {
            this.querySelector('.social-links').style.bottom = '-50px';
        });
    });
    
    // Partner logo hover effects
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.filter = 'grayscale(0%)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.opacity = '0.7';
            this.style.filter = 'grayscale(100%)';
        });
    });
});