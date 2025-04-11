// Food Donation Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle donation type selection
    const donationType = document.getElementById('donation-type');
    const pickupOptions = document.getElementById('pickup-options');
    
    // Show/hide pickup options based on delivery method
    const deliveryMethod = document.getElementById('delivery-method');
    const pickupOptionsSection = document.getElementById('pickupOptions');
    
    deliveryMethod.addEventListener('change', function() {
        if (this.value === 'pickup') {
            pickupOptionsSection.style.display = 'block';
        } else {
            pickupOptionsSection.style.display = 'none';
        }
    });
    
    // Handle form submission
    const foodDonationForm = document.getElementById('foodDonationForm');
    const donationModal = document.getElementById('donationModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const closeModal = document.querySelector('.close-modal');
    
    foodDonationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would process the form data here
        // For this example, we'll just show the confirmation modal
        
        // Get the donation type for the confirmation message
        const donationType = document.getElementById('donation-type').value;
        let donationMessage = "Thank you for your food donation!";
        
        if (donationType === 'non-perishable') {
            donationMessage = "Thank you for donating non-perishable food items!";
        } else if (donationType === 'fresh-produce') {
            donationMessage = "Thank you for donating fresh produce!";
        } else if (donationType === 'baked-goods') {
            donationMessage = "Thank you for donating baked goods!";
        } else if (donationType === 'prepared-food') {
            donationMessage = "Thank you for donating prepared food!";
        }
        
        document.getElementById('donationMessage').textContent = donationMessage;
        donationModal.style.display = 'flex';
        
        // Reset form
        this.reset();
    });
    
    // Close modal
    function closeDonationModal() {
        donationModal.style.display = 'none';
    }
    
    modalCloseBtn.addEventListener('click', closeDonationModal);
    closeModal.addEventListener('click', closeDonationModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === donationModal) {
            closeDonationModal();
        }
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Initialize any visible FAQ answers
    document.querySelectorAll('.faq-question').forEach(question => {
        if (question.classList.contains('active')) {
            const answer = question.nextElementSibling;
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});