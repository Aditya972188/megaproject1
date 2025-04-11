document.addEventListener('DOMContentLoaded', function () {
    // Handle amount option selection
    const amountOptions = document.querySelectorAll('.amount-option');
    const amountInput = document.getElementById('amount');

    amountOptions.forEach(option => {
        option.addEventListener('click', function () {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.amount === 'other') {
                amountInput.style.display = 'block';
                amountInput.focus();
                amountInput.value = '';
            } else {
                amountInput.style.display = 'none';
                amountInput.value = this.dataset.amount;
            }
        });
    });

    // Payment method toggle
    const paymentMethods = document.querySelectorAll('.payment-method input');
    const creditCardForm = document.getElementById('creditCardForm');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function () {
            creditCardForm.style.display = this.value === 'credit-card' ? 'block' : 'none';
        });
    });

    // FAQ accordion toggle
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
        });
    });

    // Donation option buttons
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const option = this.dataset.option;
            const frequencySelect = document.getElementById('frequency');

            document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });

            if (option === 'monthly') {
                frequencySelect.value = 'monthly';
            } else if (option === 'corporate') {
                alert('Please contact our corporate partnerships team at corporate@helpinghands.org for information about matching gifts.');
            }
        });
    });

    // Form submission handling
    const donationForm = document.getElementById('donationForm');
    const donationModal = document.getElementById('donationModal');
    const donationAmount = document.getElementById('donationAmount');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    donationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const selectedOption = document.querySelector('.amount-option.active');
        const amount = amountInput.value || selectedOption?.dataset.amount || '0';

        donationAmount.textContent = `₹${amount}`;
        donationModal.style.display = 'flex';

        // Reset form
        this.reset();
        amountOptions.forEach(opt => opt.classList.remove('active'));
        amountInput.style.display = 'none';
        amountInput.value = '';
        creditCardForm.style.display = 'none';
    });

    modalCloseBtn.addEventListener('click', () => {
        donationModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === donationModal) {
            donationModal.style.display = 'none';
        }
    });

    // Credit card input formatting
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            value = value.slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
            this.value = value;
        });
    }

    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '').slice(0, 4);
            if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
            }
            this.value = value;
        });
    }

    if (cvvInput) {
        cvvInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 4);
        });
    }
});
