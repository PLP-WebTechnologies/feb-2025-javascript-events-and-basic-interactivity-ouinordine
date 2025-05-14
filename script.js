// 1. Event Handling 🎈

// Button Click & Bonus Animation
const buyButton = document.getElementById('buyButton');
buyButton.addEventListener('click', (event) => {
    // Form validation is handled by the form's submit listener,
    // but we can add animation here regardless of validation success
    buyButton.classList.add('animating-click'); // Add a class for potential animation
    setTimeout(() => {
        buyButton.classList.remove('animating-click');
    }, 300); // Remove class after animation duration (adjust as needed)

    // The form submit listener below will handle preventDefault and validation
});

// CSS handles the hover effects (:hover)

// Keypress Detection (for quantity real-time feedback)
const quantityInput = document.getElementById('quantity');
const quantityError = document.getElementById('quantityError');
const quantityFeedback = document.getElementById('quantityFeedback');

quantityInput.addEventListener('input', () => {
    const quantity = parseInt(quantityInput.value);

    if (quantityInput.value.trim() === '') {
        displayError(quantityError, 'Quantity is required');
        clearFeedback(quantityFeedback);
        quantityFeedback.classList.remove('valid');
    } else if (isNaN(quantity) || quantity < 1) {
        displayError(quantityError, 'Quantity must be at least 1');
        clearFeedback(quantityFeedback);
        quantityFeedback.classList.remove('valid');
    } else {
        clearError(quantityError);
        displayFeedback(quantityFeedback, `Quantity: ${quantity}`);
        quantityFeedback.classList.add('valid');
    }
});


// Bonus: Secret Double-click
const siteLogo = document.getElementById('siteLogo');
const secretMessage = document.getElementById('secretMessage');

siteLogo.addEventListener('dblclick', () => {
    secretMessage.classList.toggle('visible'); // Toggle visibility
});


// 2. Interactive Elements 🎮

// Button changes text (handled after form submission attempt in validation)

// Image Gallery / Slideshow
const slides = document.querySelectorAll('#gallery .slide');
let currentSlideIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

// Automatically advance slides every 4 seconds
let slideshowInterval = setInterval(nextSlide, 4000);

// Optional: Pause on hover
const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('mouseenter', () => {
    clearInterval(slideshowInterval);
});
slideshowContainer.addEventListener('mouseleave', () => {
    slideshowInterval = setInterval(nextSlide, 4000);
});


// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Deactivate all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate the clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Bonus Animation (CSS active state on button click is used)


// 3. Form Validation 📋✅

const purchaseForm = document.getElementById('purchaseForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ticketTypeSelect = document.getElementById('ticketType'); // Added ticket type validation

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ticketTypeError = document.getElementById('ticketTypeError'); // Added ticket type validation error

// quantityError and quantityFeedback already defined for keypress

purchaseForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    validateForm();
});

function validateForm() {
    let isValid = true;

    // Required field checks
    if (nameInput.value.trim() === '') {
        displayError(nameError, 'Full Name is required');
        isValid = false;
    } else {
        clearError(nameError);
    }

    if (emailInput.value.trim() === '') {
        displayError(emailError, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        displayError(emailError, 'Invalid email format');
        isValid = false;
    } else {
        clearError(emailError);
    }

    // Ticket Type Validation (Required)
     if (ticketTypeSelect.value === '') {
        displayError(ticketTypeError, 'Please select a ticket type');
        isValid = false;
    } else {
        clearError(ticketTypeError);
    }

    // Quantity Validation (using logic from keypress, but checking on submit too)
    const quantity = parseInt(quantityInput.value);
    if (quantityInput.value.trim() === '') {
        displayError(quantityError, 'Quantity is required');
        isValid = false;
    } else if (isNaN(quantity) || quantity < 1) {
        displayError(quantityError, 'Quantity must be at least 1');
        isValid = false;
    } else {
        clearError(quantityError);
    }


    if (isValid) {
        // --- Successful Validation ---
        alert('Tickets purchased successfully!\n\nDetails:\nName: ' + nameInput.value.trim() + '\nEmail: ' + emailInput.value.trim() + '\nTicket Type: ' + ticketTypeSelect.value + '\nQuantity: ' + quantityInput.value);

        // Optional: Change button text temporarily on success
        buyButton.textContent = 'Purchase Successful!';
         buyButton.style.backgroundColor = '#28a745'; // Keep it green or change color
        setTimeout(() => {
             buyButton.textContent = 'Buy Tickets';
              // buyButton.style.backgroundColor = '#28a745'; // Reset color if changed
        }, 3000); // Change back after 3 seconds


        purchaseForm.reset(); // Clear the form
        // Also clear real-time feedback/errors after reset
        clearError(nameError);
        clearError(emailError);
        clearError(ticketTypeError);
        clearError(quantityError);
        clearFeedback(quantityFeedback);
        quantityFeedback.classList.remove('valid'); // Ensure valid class is removed
         secretMessage.classList.remove('visible'); // Hide secret message on form success

    } else {
        // --- Validation Failed ---
         // Keep button text as is or indicate failure
         buyButton.textContent = 'Fix Errors Above';
         buyButton.style.backgroundColor = '#dc3545'; // Red color for error
         setTimeout(() => {
              buyButton.textContent = 'Buy Tickets';
              buyButton.style.backgroundColor = '#28a745'; // Reset color
         }, 2000); // Change back after 2 seconds
    }
}

function isValidEmail(email) {
    // Simple regex for email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(element, message) {
    element.textContent = message;
    element.style.display = 'block'; // Ensure error message is visible
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none'; // Hide error message
}

function displayFeedback(element, message) {
     element.textContent = message;
     element.style.display = 'block';
}

function clearFeedback(element) {
    element.textContent = '';
    element.style.display = 'none';
}


// Bonus: Real-time feedback while typing (Added listeners above for quantity)
// Add real-time validation feedback for email and name too (optional but good practice)

emailInput.addEventListener('input', () => {
     if (emailInput.value.trim() === '') {
        clearError(emailError); // Clear error if empty, wait for submit validation
    } else if (!isValidEmail(emailInput.value.trim())) {
        displayError(emailError, 'Invalid email format');
    } else {
        clearError(emailError);
    }
});

nameInput.addEventListener('input', () => {
     if (nameInput.value.trim() === '') {
        clearError(nameError); // Clear error if empty, wait for submit validation
    } else {
        clearError(nameError);
    }
});

// Initial state: Show first slide and hide errors/feedback
showSlide(currentSlideIndex);
clearError(nameError);
clearError(emailError);
clearError(ticketTypeError);
clearError(quantityError);
clearFeedback(quantityFeedback);