// Smooth scroll to seva section
function scrollToSevaSection() {
    const element = document.getElementById('seva-selection');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle donation button click
function handleDonation(title, amount, isMultiple = false) {
    const formattedAmount = amount.toLocaleString('en-IN');
    const actionText = isMultiple ? 'added to cart' : 'selected';
    
    showToast(
        `Thank you for selecting ${title}!`,
        `Amount: ₹${formattedAmount}`
    );
}

// Handle custom donation
function handleCustomDonation(isMultiple = false) {
    const inputId = isMultiple ? 'customAmountMultiple' : 'customAmount';
    const input = document.getElementById(inputId);
    const amount = parseFloat(input.value);

    if (!amount || amount <= 0) {
        showToast(
            'Please enter a valid amount',
            'Amount must be greater than 0',
            'error'
        );
        return;
    }

    const formattedAmount = amount.toLocaleString('en-IN');
    const actionText = isMultiple ? 'added to cart' : 'received';
    
    showToast(
        'Thank you for your generous contribution!',
        `Amount: ₹${formattedAmount}`
    );
    
    input.value = '';
}

// Show toast notification
function showToast(title, description, type = 'success') {
    const toastElement = document.getElementById('donationToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    const toastIcon = toastElement.querySelector('.toast-icon i');

    // Set content
    toastTitle.textContent = title;
    toastDescription.textContent = description;

    // Set icon based on type
    if (type === 'error') {
        toastIcon.className = 'bi bi-exclamation-circle-fill';
        toastIcon.style.color = '#ef4444';
    } else {
        toastIcon.className = 'bi bi-check-circle-fill';
        toastIcon.style.color = '#10b981';
    }

    // Show toast
    const toast = new bootstrap.Toast(toastElement, {
        delay: 3000
    });
    toast.show();
}

// Add animation on scroll
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.donation-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize cards with animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.donation-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    // Trigger animation on load
    setTimeout(() => {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 100);
});

