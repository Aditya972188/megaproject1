document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.textContent = '');

            // Validate form
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Name
            if (name.value.trim() === '') {
                name.nextElementSibling.textContent = 'Please enter your name';
                isValid = false;
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                email.nextElementSibling.textContent = 'Please enter your email';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                email.nextElementSibling.textContent = 'Please enter a valid email';
                isValid = false;
            }

            // Phone (optional)
            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (phone.value.trim() !== '' && !phoneRegex.test(phone.value)) {
                phone.nextElementSibling.textContent = 'Please enter a valid phone number';
                isValid = false;
            }

            // Subject
            if (subject.value === '' || subject.value === null) {
                subject.nextElementSibling.textContent = 'Please select a subject';
                isValid = false;
            }

            // Message
            if (message.value.trim() === '') {
                message.nextElementSibling.textContent = 'Please enter your message';
                isValid = false;
            } else if (message.value.trim().length < 10) {
                message.nextElementSibling.textContent = 'Message must be at least 10 characters';
                isValid = false;
            }

            // ✅ If form is valid, store in Firebase
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    phone: phone.value.trim(),
                    subject: subject.value,
                    message: message.value.trim(),
                    createdAt: new Date().toISOString()
                };

                try {
                    const db = window.firebaseDb;
                    const addDoc = window.firebaseAddDoc;
                    const collection = window.firebaseCollection;

                    await addDoc(collection(db, "contactMessages"), formData);

                    contactForm.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you soon.</p>
                            <a href="index.html" class="btn">Back to Home</a>
                        </div>
                    `;
                } catch (error) {
                    alert("Error sending message. Please try again later.");
                    console.error("Error writing to Firestore:", error);
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card, .contact-form, .faq-item').forEach(element => {
        animateOnScroll.observe(element);
    });
});
