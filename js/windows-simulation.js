// Windows Installation Simulation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log("Windows Simulation initializing...");
    
    // DOM Elements
    const steps = document.querySelectorAll('.windows-screen');
    const progressSteps = document.querySelectorAll('.progress-step');
    const instructionContent = document.getElementById('instruction-content');
    
    // Boot Screen Elements
    const anyKeyButton = document.querySelector('.any-key-btn');
    
    // Installation Elements
    const nextLanguageButton = document.getElementById('next-language');
    const acceptCheckbox = document.getElementById('accept-checkbox');
    const nextLicenseButton = document.getElementById('next-license');
    const backLicenseButton = document.getElementById('back-license');
    const nextInstallTypeButton = document.getElementById('next-install-type');
    const backInstallTypeButton = document.getElementById('back-install-type');
    const nextDiskButton = document.getElementById('next-disk');
    const backDiskButton = document.getElementById('back-disk');
    const installProgressBar = document.getElementById('install-progress-bar');
    const diskRows = document.querySelectorAll('.selectable');
    const diskActionButtons = document.querySelectorAll('.disk-action-btn');
    
    // Configuration Elements
    const nextRegionButton = document.getElementById('next-region');
    const nextKeyboardLayoutButton = document.getElementById('next-keyboard-layout');
    const backKeyboardLayoutButton = document.getElementById('back-keyboard-layout');
    const skipNetworkButton = document.getElementById('skip-network');
    const backNetworkButton = document.getElementById('back-network');
    const networkConnectButtons = document.querySelectorAll('.network-connect-btn');
    const nextUserButton = document.getElementById('next-user');
    const backUserButton = document.getElementById('back-user');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    const acceptPrivacyButton = document.getElementById('accept-privacy');
    const backPrivacyButton = document.getElementById('back-privacy');
    
    // Desktop Elements
    const taskbarTimeElement = document.getElementById('taskbar-time');
    const restartSimulationButton = document.getElementById('restart-simulation');
    
    // Instructions for each step
    const instructions = {
        1: "Insert the Windows installation media and boot your computer. Press any key when prompted to boot from the DVD/USB.",
        2: "Follow the Windows installation wizard. Select your language, accept the license terms, choose installation type, and select where to install Windows.",
        3: "Set up your Windows account by selecting region, keyboard layout, connecting to a network, and creating a user account.",
        4: "Congratulations! You've completed the Windows installation. You can now explore the desktop or restart the simulation."
    };
    
    // Current step tracker
    let currentMainStep = 1;
    let currentInstallationStep = 1;
    let currentConfigStep = 1;
    
    // Log elements availability for debugging
    console.log("Key Elements Found:", 
        "anyKeyButton:", !!anyKeyButton,
        "nextLanguageButton:", !!nextLanguageButton,
        "acceptCheckbox:", !!acceptCheckbox,
        "nextLicenseButton:", !!nextLicenseButton
    );
    
    // Show the current step and update progress
    function showStep(stepNumber) {
        console.log(`Showing main step ${stepNumber}`);
        
        try {
            // Hide all steps
            steps.forEach(step => {
                step.classList.add('hidden');
                console.log(`Hidden step: ${step.id}`);
            });
            
            // Show current step
            const targetStep = document.getElementById(`step-${stepNumber}`);
            if (targetStep) {
                targetStep.classList.remove('hidden');
                console.log(`Showing step: ${targetStep.id}`);
            } else {
                console.error(`Step element #step-${stepNumber} not found!`);
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
            
            // Update current step
            currentMainStep = stepNumber;
            
            // Update taskbar time if on desktop step
            if (stepNumber === 4 && taskbarTimeElement) {
                updateTaskbarTime();
                setInterval(updateTaskbarTime, 60000); // Update time every minute
            }
        } catch (error) {
            console.error("Error in showStep:", error);
        }
    }
    
    // Update the taskbar time
    function updateTaskbarTime() {
        try {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12
            
            const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
            
            if (taskbarTimeElement) {
                taskbarTimeElement.textContent = formattedTime;
            }
        } catch (error) {
            console.error("Error updating taskbar time:", error);
        }
    }
    
    // Show Installation Sub-Steps
    function showInstallationStep(stepNumber) {
        console.log(`Showing installation sub-step ${stepNumber}`);
        
        try {
            // Hide all installation steps
            document.querySelectorAll('.installation-step').forEach(step => {
                step.classList.add('hidden');
            });
            
            // Show the current installation step
            let stepId;
            switch (stepNumber) {
                case 1:
                    stepId = 'language-step';
                    break;
                case 2:
                    stepId = 'license-step';
                    break;
                case 3:
                    stepId = 'install-type-step';
                    break;
                case 4:
                    stepId = 'disk-step';
                    break;
                case 5:
                    stepId = 'installing-step';
                    simulateInstallation();
                    break;
            }
            
            if (stepId) {
                const targetStep = document.getElementById(stepId);
                if (targetStep) {
                    targetStep.classList.remove('hidden');
                    console.log(`Showing installation step: ${stepId}`);
                } else {
                    console.error(`Installation step element #${stepId} not found!`);
                }
            }
            
            currentInstallationStep = stepNumber;
        } catch (error) {
            console.error("Error in showInstallationStep:", error);
        }
    }
    
    // Show Configuration Sub-Steps
    function showConfigStep(stepNumber) {
        console.log(`Showing configuration sub-step ${stepNumber}`);
        
        try {
            // Hide all config steps
            document.querySelectorAll('.config-step').forEach(step => {
                step.classList.add('hidden');
            });
            
            // Show the current config step
            let stepId;
            switch (stepNumber) {
                case 1:
                    stepId = 'region-step';
                    break;
                case 2:
                    stepId = 'keyboard-step';
                    break;
                case 3:
                    stepId = 'network-step';
                    break;
                case 4:
                    stepId = 'user-step';
                    break;
                case 5:
                    stepId = 'privacy-step';
                    break;
                case 6:
                    stepId = 'finalizing-step';
                    simulateFinalizing();
                    break;
            }
            
            if (stepId) {
                const targetStep = document.getElementById(stepId);
                if (targetStep) {
                    targetStep.classList.remove('hidden');
                    console.log(`Showing config step: ${stepId}`);
                } else {
                    console.error(`Config step element #${stepId} not found!`);
                }
            }
            
            currentConfigStep = stepNumber;
        } catch (error) {
            console.error("Error in showConfigStep:", error);
        }
    }
    
    // Simulate installation progress
    function simulateInstallation() {
        try {
            let progress = 0;
            const progressText = document.querySelector('.progress-text');
            const progressPercentage = document.querySelector('.progress-percentage');
            
            console.log("Starting installation simulation...");
            
            if (!installProgressBar) {
                console.error("Install progress bar element not found!");
                return;
            }
            
            const progressInterval = setInterval(() => {
                progress += 1;
                installProgressBar.style.width = `${progress}%`;
                
                if (progressPercentage) {
                    progressPercentage.textContent = `${progress}%`;
                }
                
                if (progressText) {
                    if (progress === 30) {
                        progressText.textContent = 'Getting files ready for installation...';
                    } else if (progress === 60) {
                        progressText.textContent = 'Installing features and drivers...';
                    } else if (progress === 85) {
                        progressText.textContent = 'Finishing up...';
                    }
                }
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    console.log("Installation completed, moving to configuration step");
                    
                    setTimeout(() => {
                        showStep(3); // Move to Configuration step
                        showConfigStep(1);
                    }, 1000);
                }
            }, 100);
        } catch (error) {
            console.error("Error in simulateInstallation:", error);
        }
    }
    
    // Simulate finalizing setup
    function simulateFinalizing() {
        setTimeout(() => {
            showStep(4); // Move to Desktop step
        }, 3000);
    }
    
    // Validate user account form
    function validateUserForm() {
        let isValid = true;
        let usernameError = '';
        let passwordError = '';
        let confirmError = '';
        
        // Validate username
        if (!usernameInput.value.trim()) {
            usernameError = 'Please enter a name';
            isValid = false;
        }
        
        // Validate password
        if (passwordInput.value.length < 6) {
            passwordError = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        // Validate confirm password
        if (passwordInput.value !== passwordConfirmInput.value) {
            confirmError = 'Passwords do not match';
            isValid = false;
        }
        
        // Display errors
        usernameInput.nextElementSibling.textContent = usernameError;
        passwordInput.nextElementSibling.textContent = passwordError;
        passwordConfirmInput.nextElementSibling.textContent = confirmError;
        
        return isValid;
    }
    
    // Event Listeners
    
    // Step 1: Boot Screen
    if (anyKeyButton) {
        console.log("Setting up any key button click handler");
        
        // Remove any existing event listeners first
        const newAnyKeyButton = anyKeyButton.cloneNode(true);
        anyKeyButton.parentNode.replaceChild(newAnyKeyButton, anyKeyButton);
        
        // Add the event listener to the new button
        newAnyKeyButton.addEventListener('click', function() {
            console.log("Any key button clicked");
            showStep(2);
            showInstallationStep(1);
        });
        
        // Also add a direct onclick attribute for redundancy
        newAnyKeyButton.setAttribute('onclick', "console.log('Any key clicked via onclick'); document.dispatchEvent(new CustomEvent('anyKeyPressed'));");
        
        // Listen for the custom event
        document.addEventListener('anyKeyPressed', function() {
            console.log("Any key custom event triggered");
            showStep(2);
            showInstallationStep(1);
        });
    } else {
        console.error("Any key button not found!");
    }
    
    // Also add a keydown listener for the entire document
    document.addEventListener('keydown', function(e) {
        console.log("Key pressed:", e.key);
        if (currentMainStep === 1) {
            console.log("Processing keydown event in step 1");
            showStep(2);
            showInstallationStep(1);
        }
    });
    
    // Step 2: Installation
    if (nextLanguageButton) {
        nextLanguageButton.addEventListener('click', function() {
            console.log("Next language button clicked");
            showInstallationStep(2);
        });
    }
    
    if (acceptCheckbox) {
        acceptCheckbox.addEventListener('change', function() {
            console.log("License checkbox changed:", this.checked);
            nextLicenseButton.disabled = !this.checked;
        });
    }
    
    if (nextLicenseButton) {
        nextLicenseButton.addEventListener('click', function() {
            console.log("Next license button clicked");
            showInstallationStep(3);
        });
    }
    
    if (backLicenseButton) {
        backLicenseButton.addEventListener('click', function() {
            console.log("Back license button clicked");
            showInstallationStep(1);
        });
    }
    
    if (nextInstallTypeButton) {
        nextInstallTypeButton.addEventListener('click', function() {
            console.log("Next install type button clicked");
            showInstallationStep(4);
        });
    }
    
    if (backInstallTypeButton) {
        backInstallTypeButton.addEventListener('click', function() {
            console.log("Back install type button clicked");
            showInstallationStep(2);
        });
    }
    
    if (nextDiskButton) {
        nextDiskButton.addEventListener('click', function() {
            console.log("Next disk button clicked");
            showInstallationStep(5);
        });
    }
    
    if (backDiskButton) {
        backDiskButton.addEventListener('click', function() {
            console.log("Back disk button clicked");
            showInstallationStep(3);
        });
    }
    
    // Disk row selection
    diskRows.forEach(row => {
        row.addEventListener('click', function() {
            console.log("Disk row selected:", this.getAttribute('data-disk'));
            diskRows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Disk action buttons (these don't do anything in the simulation)
    diskActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Disk action button clicked:", this.id);
            // This would normally do something, but it's just for show in this simulation
        });
    });
    
    // Step 3: Configuration
    if (nextRegionButton) {
        nextRegionButton.addEventListener('click', function() {
            console.log("Next region button clicked");
            showConfigStep(2);
        });
    }
    
    if (nextKeyboardLayoutButton) {
        nextKeyboardLayoutButton.addEventListener('click', function() {
            console.log("Next keyboard layout button clicked");
            showConfigStep(3);
        });
    }
    
    if (backKeyboardLayoutButton) {
        backKeyboardLayoutButton.addEventListener('click', function() {
            console.log("Back keyboard layout button clicked");
            showConfigStep(1);
        });
    }
    
    // Network connect buttons (just for show)
    networkConnectButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Network connect button clicked");
            // Simulate connecting
            this.textContent = 'Connecting...';
            
            setTimeout(() => {
                this.textContent = 'Connected';
                this.disabled = true;
                this.style.backgroundColor = '#28a745';
                
                // Move to next step after a slight delay
                setTimeout(() => {
                    showConfigStep(4);
                }, 1000);
            }, 2000);
        });
    });
    
    if (skipNetworkButton) {
        skipNetworkButton.addEventListener('click', function() {
            console.log("Skip network button clicked");
            showConfigStep(4);
        });
    }
    
    if (backNetworkButton) {
        backNetworkButton.addEventListener('click', function() {
            console.log("Back network button clicked");
            showConfigStep(2);
        });
    }
    
    if (nextUserButton) {
        nextUserButton.addEventListener('click', function() {
            console.log("Next user button clicked");
            if (validateUserForm()) {
                showConfigStep(5);
            }
        });
    }
    
    if (backUserButton) {
        backUserButton.addEventListener('click', function() {
            console.log("Back user button clicked");
            showConfigStep(3);
        });
    }
    
    if (acceptPrivacyButton) {
        acceptPrivacyButton.addEventListener('click', function() {
            console.log("Accept privacy button clicked");
            showConfigStep(6);
        });
    }
    
    if (backPrivacyButton) {
        backPrivacyButton.addEventListener('click', function() {
            console.log("Back privacy button clicked");
            showConfigStep(4);
        });
    }
    
    // Step 4: Desktop
    if (restartSimulationButton) {
        restartSimulationButton.addEventListener('click', function() {
            console.log("Restart simulation button clicked");
            // Reset the simulation
            showStep(1);
            
            // Reset installation and config steps
            currentInstallationStep = 1;
            currentConfigStep = 1;
            
            // Reset any form fields and checkboxes
            if (acceptCheckbox) acceptCheckbox.checked = false;
            if (nextLicenseButton) nextLicenseButton.disabled = true;
            if (usernameInput) usernameInput.value = '';
            if (passwordInput) passwordInput.value = '';
            if (passwordConfirmInput) passwordConfirmInput.value = '';
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Reset network connect buttons
            networkConnectButtons.forEach(button => {
                button.textContent = 'Connect';
                button.disabled = false;
                button.style.backgroundColor = '';
            });
        });
    }
    
    // Initialize the simulation
    showStep(1);
    console.log("Windows simulation initialized");
    
    // Add a final global click handler for the boot screen
    document.querySelector('.boot-screen').addEventListener('click', function(e) {
        console.log("Boot screen clicked");
        if (currentMainStep === 1) {
            console.log("Moving to installation step");
            showStep(2);
            showInstallationStep(1);
        }
    });
}); 