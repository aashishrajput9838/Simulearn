// IRCTC Ticket Booking Simulation JavaScript - Simplified Version

document.addEventListener('DOMContentLoaded', function() {
    console.log("IRCTC Simulation initialized");
    
    // DOM Elements
    const fromInput = document.getElementById('from-station');
    const toInput = document.getElementById('to-station');
    const travelDateInput = document.getElementById('journey-date');
    const travelClassInput = document.getElementById('journey-class');
    const swapStationsButton = document.getElementById('swap-stations');
    const searchTrainsButton = document.getElementById('search-trains');
    const trainListContainer = document.getElementById('train-list');
    const modifySearchButton = document.getElementById('modify-search');
    const addPassengerButton = document.getElementById('add-passenger');
    const continuePaymentButton = document.getElementById('continue-payment');
    const backToPassengersButton = document.getElementById('back-to-passengers');
    const makePaymentButton = document.getElementById('make-payment');
    const downloadTicketButton = document.getElementById('download-ticket');
    const newBookingButton = document.getElementById('new-booking');
    const changeTrainButton = document.getElementById('change-train');
    const passengersContainer = document.getElementById('passengers-container');
    
    // Set today as minimum date
    if (travelDateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        
        const todayFormatted = yyyy + '-' + mm + '-' + dd;
        travelDateInput.setAttribute('min', todayFormatted);
        travelDateInput.value = todayFormatted;
    }
    
    // Show current step
    function showStep(stepNumber) {
        console.log(`Showing step ${stepNumber}`);
        
        // Hide all steps
        const steps = document.querySelectorAll('.irctc-content');
        steps.forEach(step => {
            step.classList.add('hidden');
        });
        
        // Show current step
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) {
            targetStep.classList.remove('hidden');
        } else {
            console.error(`Step ${stepNumber} element not found!`);
        }
        
        // Update progress steps
        const progressSteps = document.querySelectorAll('.progress-step');
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            
            if (stepNum < stepNumber) {
                step.classList.add('completed');
            } else if (stepNum === stepNumber) {
                step.classList.add('active');
            }
        });
    }
    
    // Format currency
    function formatCurrency(amount) {
        return '₹' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Get full class name
    function getClassFullName(classCode) {
        const classNames = {
            'SL': 'Sleeper Class',
            '3A': '3rd AC',
            '2A': '2nd AC',
            '1A': '1st AC',
            'CC': 'Chair Car',
            'EC': 'Executive Chair Car'
        };
        
        return classNames[classCode] || classCode;
    }
    
    // Validate search form
    function validateSearchForm() {
        let isValid = true;
        
        // Simple validation - just check if fields are not empty
        if (!fromInput.value.trim()) {
            isValid = false;
            fromInput.nextElementSibling.textContent = 'Please enter departure station';
        } else {
            fromInput.nextElementSibling.textContent = '';
        }
        
        if (!toInput.value.trim()) {
            isValid = false;
            toInput.nextElementSibling.textContent = 'Please enter arrival station';
        } else if (toInput.value.trim() === fromInput.value.trim()) {
            isValid = false;
            toInput.nextElementSibling.textContent = 'Departure and arrival stations cannot be the same';
        } else {
            toInput.nextElementSibling.textContent = '';
        }
        
        return isValid;
    }
    
    // Create static train list - always shows one train
    function createTrainList() {
        console.log("Creating static train list");
        
        if (!trainListContainer) {
            console.error("Train list container not found!");
            return;
        }
        
        // Clear previous trains
        trainListContainer.innerHTML = '';
        
        // Get stations for display
        const fromStation = fromInput.value;
        const toStation = toInput.value;
        
        // Static train data
        const train = {
            number: "12345",
            name: "Rajdhani Express",
            departure: "07:30",
            arrival: "16:45",
            duration: "9h 15m",
            classes: {
                "SL": { available: 185, fare: 750 },
                "3A": { available: 92, fare: 1950 },
                "2A": { available: 35, fare: 2850 },
                "1A": { available: 18, fare: 4350 }
            }
        };
        
        // Create train card HTML
        const trainCard = document.createElement('div');
        trainCard.className = 'train-card';
        trainCard.innerHTML = `
            <div class="train-header">
                <div class="train-number">${train.number}</div>
                <div class="train-name">${train.name}</div>
            </div>
            
            <div class="train-details">
                <div class="train-timing">
                    <div class="departure">
                        <div class="time">${train.departure}</div>
                        <div class="station">${fromStation}</div>
                    </div>
                    
                    <div class="journey-line">
                        <div class="line"></div>
                        <div class="duration">${train.duration}</div>
                    </div>
                    
                    <div class="arrival">
                        <div class="time">${train.arrival}</div>
                        <div class="station">${toStation}</div>
                    </div>
                </div>
            </div>
            
            <div class="train-class">
                <div class="class-item">
                    <div class="class-name">Sleeper Class</div>
                    <div class="availability available">Available</div>
                    <div class="fare">₹750.00</div>
                </div>
                <div class="class-item">
                    <div class="class-name">3rd AC</div>
                    <div class="availability available">Available</div>
                    <div class="fare">₹1,950.00</div>
                </div>
                <div class="class-item">
                    <div class="class-name">2nd AC</div>
                    <div class="availability available">Available</div>
                    <div class="fare">₹2,850.00</div>
                </div>
            </div>
            
            <button class="select-train-btn">Select <i class="fas fa-chevron-right"></i></button>
        `;
        
        // Add train to container
        trainListContainer.appendChild(trainCard);
        
        // Add event listener to select button
        const selectButton = trainCard.querySelector('.select-train-btn');
        selectButton.addEventListener('click', function() {
            // Update journey summary
            const trainSummary = document.getElementById('train-summary');
            if (trainSummary) {
                trainSummary.innerHTML = `<strong>${train.number} ${train.name}</strong> | ${train.departure} - ${train.arrival} | ${train.duration}`;
            }
            
            // Store selected train data
            localStorage.setItem('selectedTrain', JSON.stringify(train));
            localStorage.setItem('fromStation', fromStation);
            localStorage.setItem('toStation', toStation);
            localStorage.setItem('travelDate', travelDateInput.value);
            localStorage.setItem('travelClass', travelClassInput.value);
            
            // Show passenger details step
            showStep(3);
        });
        
        // Update journey summary
        const journeySummary = document.getElementById('journey-summary');
        if (journeySummary) {
            journeySummary.innerHTML = `<strong>${fromStation}</strong> to <strong>${toStation}</strong> | ${travelDateInput.value} | ${getClassFullName(travelClassInput.value)}`;
        }
    }
    
    // Add passenger
    function addPassenger() {
        const passengerCount = passengersContainer.querySelectorAll('.passenger-card').length + 1;
        
        if (passengerCount > 6) {
            alert('You can add up to 6 passengers only');
            return;
        }
        
        const newPassenger = document.createElement('div');
        newPassenger.className = 'passenger-card';
        newPassenger.setAttribute('data-passenger', passengerCount);
        
        newPassenger.innerHTML = `
            <div class="passenger-header">
                <h4>Passenger ${passengerCount}</h4>
                <button type="button" class="remove-passenger" data-passenger="${passengerCount}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="passenger-details">
                <div class="form-group">
                    <label for="name-${passengerCount}">Name</label>
                    <input type="text" id="name-${passengerCount}" placeholder="Full Name">
                    <small class="error-message"></small>
                </div>
                
                <div class="form-group">
                    <label for="age-${passengerCount}">Age</label>
                    <input type="number" id="age-${passengerCount}" min="1" max="120" placeholder="Age">
                    <small class="error-message"></small>
                </div>
                
                <div class="form-group">
                    <label for="gender-${passengerCount}">Gender</label>
                    <select id="gender-${passengerCount}">
                        <option value="">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    <small class="error-message"></small>
                </div>
                
                <div class="form-group">
                    <label for="berth-${passengerCount}">Berth Preference</label>
                    <select id="berth-${passengerCount}">
                        <option value="NO">No Preference</option>
                        <option value="LB">Lower Berth</option>
                        <option value="MB">Middle Berth</option>
                        <option value="UB">Upper Berth</option>
                        <option value="SL">Side Lower</option>
                        <option value="SU">Side Upper</option>
                    </select>
                </div>
            </div>
        `;
        
        passengersContainer.appendChild(newPassenger);
        
        // Add event listener to remove button
        const removeButton = newPassenger.querySelector('.remove-passenger');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                passengersContainer.removeChild(newPassenger);
            });
        }
    }
    
    // Calculate fare
    function calculateFare() {
        let selectedTrain;
        try {
            selectedTrain = JSON.parse(localStorage.getItem('selectedTrain'));
        } catch (e) {
            selectedTrain = {
                classes: {
                    "SL": { fare: 750 },
                    "3A": { fare: 1950 },
                    "2A": { fare: 2850 },
                    "1A": { fare: 4350 }
                }
            };
        }
        
        const travelClass = localStorage.getItem('travelClass') || 'SL';
        
        // Get fare for selected class
        const fare = selectedTrain.classes[travelClass].fare;
        
        // Get number of passengers
        const passengerCount = passengersContainer.querySelectorAll('.passenger-card').length;
        
        // Calculate total
        const baseFare = fare * passengerCount;
        const reservationCharge = 20 * passengerCount;
        const gst = Math.round(baseFare * 0.05);
        const convenienceFee = 30;
        const totalFare = baseFare + reservationCharge + gst + convenienceFee;
        
        // Update DOM
        document.getElementById('base-fare').textContent = formatCurrency(baseFare);
        document.getElementById('reservation-charges').textContent = formatCurrency(reservationCharge);
        document.getElementById('gst-charges').textContent = formatCurrency(gst);
        document.getElementById('convenience-fee').textContent = formatCurrency(convenienceFee);
        document.getElementById('total-amount').textContent = formatCurrency(totalFare);
        
        // Store for later use
        localStorage.setItem('totalFare', totalFare);
        
        // Update payment summary
        const paymentSummary = document.getElementById('payment-summary');
        if (paymentSummary) {
            paymentSummary.textContent = `Total Amount: ${formatCurrency(totalFare)}`;
        }
    }
    
    // Generate PNR
    function generatePNR() {
        const digits = '0123456789';
        let pnr = '';
        for (let i = 0; i < 10; i++) {
            pnr += digits[Math.floor(Math.random() * 10)];
        }
        return pnr;
    }
    
    // Populate ticket
    function populateTicket() {
        // Get stored data
        const selectedTrain = JSON.parse(localStorage.getItem('selectedTrain'));
        const fromStation = localStorage.getItem('fromStation');
        const toStation = localStorage.getItem('toStation');
        const travelDate = localStorage.getItem('travelDate');
        const travelClass = localStorage.getItem('travelClass');
        const totalFare = localStorage.getItem('totalFare');
        
        // Generate PNR
        const pnr = generatePNR();
        
        // Set ticket info
        document.getElementById('ticket-pnr').textContent = pnr;
        document.getElementById('ticket-from-code').textContent = fromStation;
        document.getElementById('ticket-to-code').textContent = toStation;
        document.getElementById('ticket-train-number').textContent = selectedTrain.number;
        document.getElementById('ticket-train-name').textContent = selectedTrain.name;
        document.getElementById('ticket-class').textContent = getClassFullName(travelClass);
        document.getElementById('ticket-date').textContent = travelDate;
        document.getElementById('ticket-fare').textContent = formatCurrency(totalFare);
        
        // Populate passenger details
        const passengerCards = passengersContainer.querySelectorAll('.passenger-card');
        const ticketPassengersContainer = document.getElementById('ticket-passengers');
        
        // Clear previous passengers
        ticketPassengersContainer.innerHTML = '';
        
        passengerCards.forEach((card, index) => {
            const passengerNum = index + 1;
            const nameInput = document.getElementById(`name-${passengerNum}`);
            const ageInput = document.getElementById(`age-${passengerNum}`);
            const genderSelect = document.getElementById(`gender-${passengerNum}`);
            const berthSelect = document.getElementById(`berth-${passengerNum}`);
            
            const name = nameInput ? nameInput.value : 'Guest Passenger';
            const age = ageInput ? ageInput.value : '25';
            const gender = genderSelect ? genderSelect.value : 'M';
            const berth = berthSelect ? berthSelect.value : 'NO';
            
            const genderText = gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other';
            const berthText = {
                'NO': 'No Preference',
                'LB': 'Lower Berth',
                'MB': 'Middle Berth',
                'UB': 'Upper Berth',
                'SL': 'Side Lower',
                'SU': 'Side Upper'
            }[berth] || 'No Preference';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${passengerNum}</td>
                <td>${name || 'Guest Passenger'}</td>
                <td>${age || '25'}</td>
                <td>${genderText}</td>
                <td>CNF / ${berthText}</td>
            `;
            
            ticketPassengersContainer.appendChild(row);
        });
    }
    
    // Event listeners
    
    // Swap stations
    if (swapStationsButton) {
        swapStationsButton.addEventListener('click', function() {
            const temp = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = temp;
        });
    }
    
    // Search trains
    if (searchTrainsButton) {
        searchTrainsButton.addEventListener('click', function() {
            if (validateSearchForm()) {
                createTrainList();
                showStep(2);
            }
        });
    }
    
    // Modify search
    if (modifySearchButton) {
        modifySearchButton.addEventListener('click', function() {
            showStep(1);
        });
    }
    
    // Add passenger
    if (addPassengerButton) {
        addPassengerButton.addEventListener('click', function() {
            addPassenger();
        });
    }
    
    // Change train
    if (changeTrainButton) {
        changeTrainButton.addEventListener('click', function() {
            showStep(2);
        });
    }
    
    // Continue to payment
    if (continuePaymentButton) {
        continuePaymentButton.addEventListener('click', function() {
            calculateFare();
            showStep(4);
        });
    }
    
    // Back to passengers
    if (backToPassengersButton) {
        backToPassengersButton.addEventListener('click', function() {
            showStep(3);
        });
    }
    
    // Make payment
    if (makePaymentButton) {
        makePaymentButton.addEventListener('click', function() {
            // Show processing state
            makePaymentButton.disabled = true;
            makePaymentButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate payment processing with delay
            setTimeout(function() {
                populateTicket();
                showStep(5);
                
                // Reset button state
                makePaymentButton.disabled = false;
                makePaymentButton.innerHTML = 'Make Payment';
            }, 1500);
        });
    }
    
    // Download ticket
    if (downloadTicketButton) {
        downloadTicketButton.addEventListener('click', function() {
            alert('Ticket downloaded successfully! (This is a simulation)');
        });
    }
    
    // New booking
    if (newBookingButton) {
        newBookingButton.addEventListener('click', function() {
            // Clear inputs
            fromInput.value = '';
            toInput.value = '';
            
            // Reset passenger container
            passengersContainer.innerHTML = `
                <div class="passenger-card" data-passenger="1">
                    <div class="passenger-header">
                        <h4>Passenger 1</h4>
                    </div>
                    
                    <div class="passenger-details">
                        <div class="form-group">
                            <label for="name-1">Name</label>
                            <input type="text" id="name-1" placeholder="Full Name">
                            <small class="error-message"></small>
                        </div>
                        
                        <div class="form-group">
                            <label for="age-1">Age</label>
                            <input type="number" id="age-1" min="1" max="120" placeholder="Age">
                            <small class="error-message"></small>
                        </div>
                        
                        <div class="form-group">
                            <label for="gender-1">Gender</label>
                            <select id="gender-1">
                                <option value="">Select</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                            <small class="error-message"></small>
                        </div>
                        
                        <div class="form-group">
                            <label for="berth-1">Berth Preference</label>
                            <select id="berth-1">
                                <option value="NO">No Preference</option>
                                <option value="LB">Lower Berth</option>
                                <option value="MB">Middle Berth</option>
                                <option value="UB">Upper Berth</option>
                                <option value="SL">Side Lower</option>
                                <option value="SU">Side Upper</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            
            // Clear stored data
            localStorage.removeItem('selectedTrain');
            localStorage.removeItem('fromStation');
            localStorage.removeItem('toStation');
            localStorage.removeItem('travelDate');
            localStorage.removeItem('travelClass');
            localStorage.removeItem('totalFare');
            
            // Go back to first step
            showStep(1);
        });
    }
    
    // Initialize - show first step
    showStep(1);
}); 