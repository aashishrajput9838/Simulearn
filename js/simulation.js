/**
 * VAT Simulation Interactive Functionality
 * This file handles all interactive elements of the VAT simulation including:
 * - Navigation between modules and steps
 * - Progress tracking
 * - Drag and drop interactions
 * - Quiz functionality
 * - VR mode toggling
 */

// State variables
let currentModule = 1;
let currentStep = 1;
const totalModules = 4;

// DOM Elements
const progressBar = document.getElementById('progress-bar');
const moduleDisplay = document.getElementById('module-display');
const stepDisplay = document.getElementById('step-display');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const interactionPoints = document.querySelectorAll('.interaction-point');
const dragElements = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const quizForm = document.getElementById('quiz-form');
const quizSubmit = document.getElementById('quiz-submit');
const quizResult = document.getElementById('quiz-result');
const vrToggle = document.getElementById('vr-toggle');
const restartBtn = document.getElementById('restart-simulation');

/**
 * Navigation Functions
 */

// Go to next step or module
function goToNextStep() {
    const moduleStepCount = getModuleStepCount(currentModule);
    
    if (currentStep < moduleStepCount) {
        currentStep++;
    } else if (currentModule < totalModules) {
        currentModule++;
        currentStep = 1;
    }
    
    updateDisplay();
    updateProgress();
}

// Go to previous step or module
function goToPrevStep() {
    if (currentStep > 1) {
        currentStep--;
    } else if (currentModule > 1) {
        currentModule--;
        currentStep = getModuleStepCount(currentModule);
    }
    
    updateDisplay();
    updateProgress();
}

// Get the number of steps in a specific module
function getModuleStepCount(moduleNumber) {
    const stepCounts = {
        1: 3, // Module 1 has 3 steps
        2: 4, // Module 2 has 4 steps
        3: 3, // Module 3 has 3 steps
        4: 5  // Module 4 has 5 steps
    };
    
    return stepCounts[moduleNumber] || 3; // Default to 3 if not found
}

// Update the display based on current module and step
function updateDisplay() {
    if (moduleDisplay) moduleDisplay.textContent = `Module ${currentModule}`;
    if (stepDisplay) stepDisplay.textContent = `Step ${currentStep}`;
    
    // Hide all module/step content first
    document.querySelectorAll('.module-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show only current module/step content
    const currentContent = document.getElementById(`module-${currentModule}-step-${currentStep}`);
    if (currentContent) {
        currentContent.style.display = 'block';
    }
    
    // Disable prev button if at first step of first module
    if (prevButton) {
        prevButton.disabled = (currentModule === 1 && currentStep === 1);
    }
    
    // Disable next button if at last step of last module
    if (nextButton) {
        nextButton.disabled = (currentModule === totalModules && 
                             currentStep === getModuleStepCount(totalModules));
    }
}

// Update progress bar
function updateProgress() {
    if (!progressBar) return;
    
    let totalSteps = 0;
    let completedSteps = 0;
    
    // Calculate total steps
    for (let i = 1; i <= totalModules; i++) {
        totalSteps += getModuleStepCount(i);
    }
    
    // Calculate completed steps
    for (let i = 1; i < currentModule; i++) {
        completedSteps += getModuleStepCount(i);
    }
    completedSteps += currentStep - 1;
    
    // Update progress bar
    const progressPercentage = Math.floor((completedSteps / totalSteps) * 100);
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    progressBar.textContent = `${progressPercentage}%`;
}

/**
 * Drag and Drop Functionality
 */
function setupDragAndDrop() {
    if (!dragElements || !dropZones) return;
    
    // Set up draggable elements
    dragElements.forEach(elem => {
        elem.setAttribute('draggable', 'true');
        
        elem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', elem.id);
            elem.classList.add('dragging');
        });
        
        elem.addEventListener('dragend', () => {
            elem.classList.remove('dragging');
        });
    });
    
    // Set up drop zones
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const draggedElementId = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(draggedElementId);
            
            // Check if this is the correct drop zone
            if (zone.dataset.accepts === draggedElement.dataset.type) {
                // Append to drop zone
                zone.appendChild(draggedElement);
                
                // Provide feedback
                zone.classList.add('correct-drop');
                showFeedback('Correct placement!', true);
                
                // Check if all elements are correctly placed
                checkAllElementsPlaced();
            } else {
                // Incorrect drop zone
                showFeedback('Incorrect placement. Try again.', false);
            }
        });
    });
}

function checkAllElementsPlaced() {
    // Check if all draggable elements are in correct drop zones
    const allPlaced = Array.from(dragElements).every(elem => {
        const parentZone = elem.closest('.drop-zone');
        return parentZone && parentZone.dataset.accepts === elem.dataset.type;
    });
    
    if (allPlaced) {
        showFeedback('Great job! All items correctly placed.', true);
        
        // Enable progression to next step if all items are placed correctly
        if (nextButton) {
            nextButton.disabled = false;
        }
    }
}

/**
 * Interaction Points
 */
function setupInteractionPoints() {
    if (!interactionPoints) return;
    
    interactionPoints.forEach(point => {
        point.addEventListener('click', () => {
            // Get the information associated with this point
            const info = point.dataset.info;
            
            // Show the information in a modal or info box
            showInformation(info);
            
            // Mark as visited
            point.classList.add('visited');
        });
    });
}

function showInformation(info) {
    // Create or update information modal
    const infoModal = document.getElementById('info-modal') || createInfoModal();
    const infoContent = document.getElementById('info-content');
    
    infoContent.textContent = info;
    infoModal.style.display = 'block';
}

function createInfoModal() {
    const modal = document.createElement('div');
    modal.id = 'info-modal';
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div id="info-content"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close functionality
    modal.querySelector('.close-button').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    return modal;
}

/**
 * Quiz Functionality
 */
function setupQuiz() {
    if (!quizForm || !quizSubmit) return;
    
    quizSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        evaluateQuiz();
    });
}

function evaluateQuiz() {
    if (!quizForm || !quizResult) return;
    
    const formData = new FormData(quizForm);
    let score = 0;
    let totalQuestions = 0;
    
    // Check answers against correct ones stored in data attributes
    quizForm.querySelectorAll('.quiz-question').forEach(question => {
        totalQuestions++;
        const questionId = question.dataset.questionId;
        const correctAnswer = question.dataset.correctAnswer;
        const userAnswer = formData.get(questionId);
        
        if (userAnswer === correctAnswer) {
            score++;
            question.classList.add('correct');
            question.classList.remove('incorrect');
        } else {
            question.classList.add('incorrect');
            question.classList.remove('correct');
        }
    });
    
    // Display results
    const percentage = Math.round((score / totalQuestions) * 100);
    quizResult.textContent = `You scored ${score}/${totalQuestions} (${percentage}%)`;
    
    // Enable next button only if score is sufficient (e.g., 70% or higher)
    if (nextButton) {
        const passingScore = Math.ceil(totalQuestions * 0.7);
        nextButton.disabled = score < passingScore;
        
        if (score < passingScore) {
            showFeedback('Please try again to achieve at least 70% to continue.', false);
        } else {
            showFeedback('Great job! You can now proceed to the next section.', true);
        }
    }
}

/**
 * Feedback System
 */
function showFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById('feedback') || createFeedbackElement();
    
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${isSuccess ? 'success' : 'error'}`;
    feedbackElement.style.display = 'block';
    
    // Hide after a few seconds
    setTimeout(() => {
        feedbackElement.style.display = 'none';
    }, 3000);
}

function createFeedbackElement() {
    const feedback = document.createElement('div');
    feedback.id = 'feedback';
    feedback.className = 'feedback';
    document.body.appendChild(feedback);
    return feedback;
}

/**
 * VR Mode Toggle
 */
function setupVRToggle() {
    if (!vrToggle) return;
    
    vrToggle.addEventListener('click', () => {
        document.body.classList.toggle('vr-mode');
        
        if (document.body.classList.contains('vr-mode')) {
            vrToggle.textContent = 'Exit VR Mode';
            initVRMode();
        } else {
            vrToggle.textContent = 'Enter VR Mode';
            exitVRMode();
        }
    });
}

function initVRMode() {
    // Initialize VR components if available
    if (window.AFRAME !== undefined) {
        // A-Frame specific initialization
        console.log('Initializing VR mode with A-Frame');
        
        // Create VR scene for current module/step
        createVRScene();
    } else {
        console.warn('VR mode requested but A-Frame is not available');
        showFeedback('VR library not loaded. Please check your internet connection.', false);
    }
}

function createVRScene() {
    // Create VR scene based on current module and step
    const vrContainer = document.getElementById('vr-container') || document.createElement('div');
    vrContainer.id = 'vr-container';
    
    // Set up A-Frame scene
    vrContainer.innerHTML = `
        <a-scene embedded>
            <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
            <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
            <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
            <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
            <a-sky color="#ECECEC"></a-sky>
        </a-scene>
    `;
    
    document.body.appendChild(vrContainer);
}

function exitVRMode() {
    // Clean up VR resources
    const vrContainer = document.getElementById('vr-container');
    if (vrContainer) {
        vrContainer.remove();
    }
}

/**
 * Reset Simulation
 */
function resetSimulation() {
    // Reset to beginning
    currentModule = 1;
    currentStep = 1;
    
    // Reset UI
    updateDisplay();
    updateProgress();
    
    // Reset drag and drop elements
    if (dragElements) {
        dragElements.forEach(elem => {
            // Move back to original container
            document.querySelector('.draggable-container').appendChild(elem);
        });
    }
    
    // Reset drop zones
    if (dropZones) {
        dropZones.forEach(zone => {
            zone.classList.remove('correct-drop');
        });
    }
    
    // Reset quiz forms
    if (quizForm) {
        quizForm.reset();
        document.querySelectorAll('.quiz-question').forEach(question => {
            question.classList.remove('correct', 'incorrect');
        });
    }
    
    // Reset interaction points
    if (interactionPoints) {
        interactionPoints.forEach(point => {
            point.classList.remove('visited');
        });
    }
    
    // Exit VR mode if active
    if (document.body.classList.contains('vr-mode')) {
        document.body.classList.remove('vr-mode');
        exitVRMode();
    }
    
    showFeedback('Simulation has been reset.', true);
}

/**
 * Event Listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation buttons
    if (nextButton) {
        nextButton.addEventListener('click', goToNextStep);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', goToPrevStep);
    }
    
    // Set up restart button
    if (restartBtn) {
        restartBtn.addEventListener('click', resetSimulation);
    }
    
    // Initialize all interactive elements
    setupDragAndDrop();
    setupInteractionPoints();
    setupQuiz();
    setupVRToggle();
    
    // Initialize display
    updateDisplay();
    updateProgress();
});

// Handling keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (!nextButton.disabled) {
            goToNextStep();
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (!prevButton.disabled) {
            goToPrevStep();
        }
    }
}); 