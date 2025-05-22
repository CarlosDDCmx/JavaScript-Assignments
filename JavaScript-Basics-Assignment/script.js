// DOM Elements
const toggleBtn = document.getElementById('toggleBtn');
const toggleParagraph = document.getElementById('toggleParagraph');
const demoForm = document.getElementById('demoForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const feedback = document.getElementById('feedback');

// Toggle Button Functionality
let isVisible = true;

function toggleVisibility() {
    isVisible = !isVisible;
    toggleParagraph.classList.toggle('hidden');
    toggleBtn.textContent = isVisible ? 'Hide' : 'Show';
}

toggleBtn.addEventListener('click', toggleVisibility);

// Form Validation and Submission
function validateForm() {
    let isValid = true;
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    // Name validation
    if (nameValue === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Email validation
    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailValue.includes('@')) {
        emailError.textContent = 'Invalid email format';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    return isValid;
}

function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Form is valid - show success message
        feedback.textContent = `Thank you for submitting, ${nameInput.value}!`;
        feedback.style.backgroundColor = '#dff0d8';
        feedback.style.color = '#3c763d';
        
        // Clear form inputs
        nameInput.value = '';
        emailInput.value = '';
        
        // Clear errors
        nameError.textContent = '';
        emailError.textContent = '';
    } else {
        // Form is invalid - show error message
        feedback.textContent = 'Please fix the errors in the form.';
        feedback.style.backgroundColor = '#f2dede';
        feedback.style.color = '#a94442';
    }
}

demoForm.addEventListener('submit', handleSubmit);