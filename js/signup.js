document.addEventListener('DOMContentLoaded', function() {
  // Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          // Remove active class from all buttons and contents
          tabBtns.forEach(b => b.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked button and corresponding content
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
      });
  });
  
  // Form Submissions
  const signupForm = document.getElementById('signupForm');
  const volunteerForm = document.getElementById('volunteerForm');
  
  signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for signing up! We will contact you shortly.');
      this.reset();
  });
  
  volunteerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your volunteer application! Our team will review it and get back to you.');
      this.reset();
  });
  
  // Mobile menu toggle would be handled by your common.js
});