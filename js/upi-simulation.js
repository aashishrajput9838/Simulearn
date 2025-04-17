// UPI Payment Simulation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log("UPI Simulation initialized");
    
    // Elements
    const steps = document.querySelectorAll('.app-content');
    const progressSteps = document.querySelectorAll('.progress-step');
    const instructionContent = document.getElementById('instruction-content');
    
    console.log("Found steps:", steps.length);
    steps.forEach((step, index) => {
        console.log(`Step ${index + 1} ID: ${step.id}, Classes: ${step.className}`);
    });
    
    // Step 1 Elements
    const recipientInput = document.getElementById('recipient');
    const amountInput = document.getElementById('amount');
    const noteInput = document.getElementById('note');
    const nextStep1Button = document.getElementById('next-step1');
    
    // Step 2 Elements
    const verifyRecipient = document.getElementById('verify-recipient');
    const verifyAmount = document.getElementById('verify-amount');
    const verifyNote = document.getElementById('verify-note');
    const noteRow = document.getElementById('note-row');
    const backStep2Button = document.getElementById('back-step2');
    const nextStep2Button = document.getElementById('next-step2');
    
    console.log("Step 2 elements found:", 
                "verifyRecipient:", !!verifyRecipient, 
                "verifyAmount:", !!verifyAmount, 
                "verifyNote:", !!verifyNote,
                "noteRow:", !!noteRow);
    
    // Step 3 Elements
    const paymentRecipient = document.getElementById('payment-recipient');
    const paymentAmount = document.getElementById('payment-amount');
    const pinInputs = document.querySelectorAll('.pin-input');
    const pinKeys = document.querySelectorAll('.pin-key');
    const pinError = document.getElementById('pin-error');
    const backStep3Button = document.getElementById('back-step3');
    const confirmPinButton = document.getElementById('confirm-pin');
    
    // Step 4 Elements
    const successAmount = document.getElementById('success-amount');
    const successRecipient = document.getElementById('success-recipient');
    const transactionId = document.getElementById('transaction-id');
    const transactionDate = document.getElementById('transaction-date');
    const newPaymentButton = document.getElementById('new-payment');
    
    // Instructions for each step
    const instructions = {
        1: "Enter the payment details as you would in a real UPI app. You can use any mobile number and recipient name for this simulation.",
        2: "Verify the payment details before proceeding. Make sure the recipient and amount are correct.",
        3: "Enter your UPI PIN to authorize the payment. For this simulation, any 6-digit PIN will work.",
        4: "Your payment is successful! You can view the transaction details and start a new payment."
    };
    
    // Show current step and update progress
    function showStep(stepNumber) {
        console.log(`Showing step ${stepNumber}`);
        
        // Hide all steps
        steps.forEach(step => {
            step.classList.add('hidden');
            console.log(`Added 'hidden' class to ${step.id}`);
        });
        
        // Show current step
        const targetStep = document.getElementById(`step-${stepNumber}`);
        console.log(`Target step: ${targetStep ? targetStep.id : 'not found'}`);
        
        if (targetStep) {
            targetStep.classList.remove('hidden');
            console.log(`Removed 'hidden' class from ${targetStep.id}`);
        } else {
            console.error(`Step ${stepNumber} element not found!`);
        }
        
        // Update progress tracker
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            
            if (stepNum < stepNumber) {
                step.classList.add('completed');
            } else if (stepNum === stepNumber) {
                step.classList.add('active');
            }
        });
        
        // Update instructions
        if (instructionContent) {
            instructionContent.innerHTML = `<p>${instructions[stepNumber]}</p>`;
        }
        
        // Focus on first input in step 1
        if (stepNumber === 1 && recipientInput) {
            setTimeout(() => recipientInput.focus(), 100);
        }
        
        // Focus on first PIN input in step 3
        if (stepNumber === 3 && pinInputs.length > 0) {
            setTimeout(() => pinInputs[0].focus(), 100);
        }
        
        // Check final state of steps
        console.log("Steps visibility after change:");
        steps.forEach(step => {
            console.log(`Step ${step.id}: ${step.classList.contains('hidden') ? 'hidden' : 'visible'}`);
        });
    }
    
    // Validate Step 1
    function validateStep1() {
        console.log("Validating step 1");
        let isValid = true;
        let recipientError = '';
        let amountError = '';
        
        // Validate recipient
        console.log("Recipient value:", recipientInput.value);
        
        if (!recipientInput.value.trim()) {
            recipientError = 'Please enter a recipient';
            isValid = false;
        } else if (recipientInput.value.includes('@')) {
            // UPI ID validation - should be in format username@bankname or phonenumber@bankname
            const upiRegex = /^[a-zA-Z0-9_.-]{3,}@[a-zA-Z]{3,}$/;
            if (!upiRegex.test(recipientInput.value)) {
                recipientError = 'Please enter a valid UPI ID';
                isValid = false;
            }
        } else if (!recipientInput.value.includes('@') && 
                  (isNaN(recipientInput.value) || recipientInput.value.length !== 10)) {
            recipientError = 'Please enter a valid 10-digit mobile number';
            isValid = false;
        }
        
        // Validate amount
        console.log("Amount value:", amountInput.value);
        
        if (!amountInput.value) {
            amountError = 'Please enter an amount';
            isValid = false;
        } else if (parseFloat(amountInput.value) <= 0) {
            amountError = 'Amount must be greater than 0';
            isValid = false;
        } else if (parseFloat(amountInput.value) > 100000) {
            amountError = 'Amount cannot exceed ₹1,00,000';
            isValid = false;
        }
        
        // Show errors
        if (recipientInput.nextElementSibling) {
            recipientInput.nextElementSibling.textContent = recipientError;
        }
        
        if (amountInput.parentElement && amountInput.parentElement.nextElementSibling) {
            amountInput.parentElement.nextElementSibling.textContent = amountError;
        }
        
        console.log("Validation result:", isValid, "Errors:", recipientError, amountError);
        return isValid;
    }
    
    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
    
    // Generate random transaction ID
    function generateTransactionId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 12; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    // Format date for transaction
    function formatTransactionDate() {
        const now = new Date();
        return `${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN')}`;
    }
    
    // Reset all PIN inputs
    function resetPinInputs() {
        pinInputs.forEach(input => {
            input.value = '';
        });
        if (pinError) pinError.textContent = '';
    }
    
    // Process successful payment
    function processSuccessfulPayment() {
        // Populate success screen
        if (successAmount) successAmount.textContent = formatCurrency(parseFloat(amountInput.value));
        if (successRecipient) successRecipient.textContent = recipientInput.value;
        if (transactionId) transactionId.textContent = generateTransactionId();
        if (transactionDate) transactionDate.textContent = formatTransactionDate();
        
        // Show success after a short delay
        setTimeout(() => {
            showStep(4);
        }, 800);
    }
    
    // Event Listeners
    
    // Step 1: Next button
    if (nextStep1Button) {
        console.log("Next button found, adding click listener");
        nextStep1Button.addEventListener('click', function() {
            console.log("Next button clicked");
            if (validateStep1()) {
                console.log("Validation successful, proceeding to step 2");
                try {
                    // Populate verification screen
                    if (verifyRecipient) verifyRecipient.textContent = recipientInput.value;
                    if (verifyAmount) verifyAmount.textContent = `₹${formatCurrency(parseFloat(amountInput.value))}`;
                    
                    if (noteInput && noteInput.value.trim() && verifyNote && noteRow) {
                        verifyNote.textContent = noteInput.value;
                        noteRow.style.display = 'flex';
                    } else if (noteRow) {
                        noteRow.style.display = 'none';
                    }
                    
                    showStep(2);
                } catch(error) {
                    console.error("Error in next button handler:", error);
                }
            }
        });
    } else {
        console.error("Next button not found!");
    }
    
    // Step 2: Back button
    if (backStep2Button) {
        backStep2Button.addEventListener('click', function() {
            showStep(1);
        });
    }
    
    // Step 2: Next button
    if (nextStep2Button) {
        nextStep2Button.addEventListener('click', function() {
            // Populate payment screen
            if (paymentRecipient) paymentRecipient.textContent = recipientInput.value;
            if (paymentAmount) paymentAmount.textContent = formatCurrency(parseFloat(amountInput.value));
            
            // Clear PIN inputs
            resetPinInputs();
            
            showStep(3);
            if (pinInputs.length > 0) {
                pinInputs[0].focus();
            }
        });
    }
    
    // Step 3: PIN input handling
    pinInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < pinInputs.length - 1) {
                    pinInputs[index + 1].focus();
                } else {
                    // Check if PIN is complete (6 digits)
                    const pin = Array.from(pinInputs).map(input => input.value).join('');
                    if (pin.length === 6 && confirmPinButton) {
                        // Auto-click confirm button for better UX
                        confirmPinButton.click();
                    }
                }
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value) {
                if (index > 0) {
                    pinInputs[index - 1].focus();
                    // Clear the previous input value too for better UX
                    pinInputs[index - 1].value = '';
                }
            }
        });
    });
    
    // Virtual keyboard for PIN
    pinKeys.forEach(key => {
        key.addEventListener('click', function() {
            if (this.classList.contains('pin-delete')) {
                // Find the last non-empty input and clear it
                for (let i = pinInputs.length - 1; i >= 0; i--) {
                    if (pinInputs[i].value) {
                        pinInputs[i].value = '';
                        pinInputs[i].focus();
                        break;
                    }
                    if (i === 0) {
                        pinInputs[0].focus();
                    }
                }
            } else if (this.classList.contains('pin-cancel')) {
                // Go back to previous step
                showStep(2);
            } else {
                // Find the first empty input and fill it
                for (let i = 0; i < pinInputs.length; i++) {
                    if (!pinInputs[i].value) {
                        pinInputs[i].value = this.textContent;
                        
                        // Move focus to next input
                        if (i < pinInputs.length - 1) {
                            pinInputs[i + 1].focus();
                        } else {
                            // All inputs filled, check if PIN is complete
                            const pin = Array.from(pinInputs).map(input => input.value).join('');
                            if (pin.length === 6) {
                                // Process the payment
                                processSuccessfulPayment();
                            }
                        }
                        break;
                    }
                }
            }
        });
    });
    
    // Step 3: Back button
    if (backStep3Button) {
        backStep3Button.addEventListener('click', function() {
            showStep(2);
        });
    }
    
    // Step 3: Confirm PIN button
    if (confirmPinButton) {
        confirmPinButton.addEventListener('click', function() {
            // Check if PIN is complete (6 digits)
            const pin = Array.from(pinInputs).map(input => input.value).join('');
            if (pin.length === 6) {
                processSuccessfulPayment();
            } else if (pinError) {
                pinError.textContent = 'Please enter a 6-digit PIN';
            }
        });
    }
    
    // Step 4: New Payment button
    if (newPaymentButton) {
        newPaymentButton.addEventListener('click', function() {
            // Reset the form
            if (recipientInput) recipientInput.value = '';
            if (amountInput) amountInput.value = '';
            if (noteInput) noteInput.value = '';
            
            // Clear any error messages
            if (recipientInput && recipientInput.nextElementSibling) {
                recipientInput.nextElementSibling.textContent = '';
            }
            
            if (amountInput && amountInput.parentElement && amountInput.parentElement.nextElementSibling) {
                amountInput.parentElement.nextElementSibling.textContent = '';
            }
            
            showStep(1);
        });
    }
    
    // Initialize the simulation
    showStep(1);
    console.log("UPI Simulation ready");
}); 