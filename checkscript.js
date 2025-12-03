// Form validation
function validateForm() {
    const form = document.getElementById('checkoutForm');
    
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    
    return true;
}

// Payment method switching
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment details
            document.getElementById('upiDetails').style.display = 'none';
            document.getElementById('cardDetails').style.display = 'none';
            document.getElementById('netbankingDetails').style.display = 'none';
            document.getElementById('walletDetails').style.display = 'none';
            
            // Show selected payment method details
            const selectedMethod = this.value;
            const detailsId = selectedMethod + 'Details';
            const detailsElement = document.getElementById(detailsId);
            
            if (detailsElement) {
                detailsElement.style.display = 'block';
            }
        });
    });

   

   

    // Phone number validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9+\-\s]/g, '');
        });
    }
});


    
    
    
    
// Complete donation
function completeDonation() {
    if (!validateForm()) {
        showToast('Please fill all required fields correctly', 'error');
        return;
    }
    
    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    //const address = document.getElementById('address').value;
    //const city = document.getElementById('city').value;
    //const state = document.getElementById('state').value;
    //const zipCode = document.getElementById('zipCode').value;
   // const country = document.getElementById('country').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
   // const notes = document.getElementById('notes').value;
    
    // Validate payment method specific fields
    if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upiId').value;
        if (!upiId) {
            showToast('Please enter your UPI ID', 'error');
            return;
        }
    } else if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;
        
        if (!cardNumber || !cardExpiry || !cardCvv) {
            showToast('Please fill all card details', 'error');
            return;
        }
    } else if (paymentMethod === 'netbanking') {
        const bank = document.getElementById('bank').value;
        if (!bank) {
            showToast('Please select your bank', 'error');
            return;
        }
    } else if (paymentMethod === 'wallet') {
        const walletType = document.getElementById('walletType').value;
        if (!walletType) {
            showToast('Please select your wallet', 'error');
            return;
        }
    }
    
    // Simulate payment processing
    const submitButton = document.querySelector('.btn-complete-donation');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    
    // Simulate API call
    setTimeout(() => {
        // Generate transaction ID
        const transactionId = 'TXN' + Date.now();
        const total = document.getElementById('total').textContent;
        
        // Update modal content
        document.getElementById('transactionId').textContent = transactionId;
        document.getElementById('confirmedAmount').textContent = total;
        
        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="bi bi-shield-check"></i> Complete Donation';
        
        // Console log for demo
        console.log('Donation Data:', {
            firstName,
            lastName,
            email,
            phone,           
            paymentMethod,           
            amount: total,
            transactionId
        });
    }, 2000);
}


    
    



// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateTotals();
});