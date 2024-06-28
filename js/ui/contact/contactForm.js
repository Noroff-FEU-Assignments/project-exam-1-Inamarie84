// Get form element and input fields
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

// Function to validate form on submit
form.addEventListener("submit", function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Validate each input field
  let isFormValid = true;

  if (!isNameValid()) {
    isFormValid = false;
  }

  if (!isEmailValid()) {
    isFormValid = false;
  }

  if (!isSubjectValid()) {
    isFormValid = false;
  }

  if (!isMessageValid()) {
    isFormValid = false;
  }

  // If form is valid, submit the form (you can add AJAX submission here)
  if (isFormValid) {
    alert("Form submitted successfully!");
    form.submit(); // Replace with your form submission logic
  }
});

// Function to validate Name field
function isNameValid() {
  const name = nameInput.value.trim();
  const nameError = document.getElementById("nameError");

  if (name.length < 5) {
    nameError.textContent = "Name must be more than 5 characters long";
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
}

// Function to validate Email field
function isEmailValid() {
  const email = emailInput.value.trim();
  const emailError = document.getElementById("emailError");

  // Regular expression for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address";
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}

// Function to validate Subject field
function isSubjectValid() {
  const subject = subjectInput.value.trim();
  const subjectError = document.getElementById("subjectError");

  if (subject.length < 15) {
    subjectError.textContent = "Subject must be more than 15 characters long";
    return false;
  } else {
    subjectError.textContent = "";
    return true;
  }
}

// Function to validate Message field
function isMessageValid() {
  const message = messageInput.value.trim();
  const messageError = document.getElementById("messageError");

  if (message.length < 25) {
    messageError.textContent = "Message must be more than 25 characters long";
    return false;
  } else {
    messageError.textContent = "";
    return true;
  }
}

// Event listeners for real-time validation (optional)
nameInput.addEventListener("input", isNameValid);
emailInput.addEventListener("input", isEmailValid);
subjectInput.addEventListener("input", isSubjectValid);
messageInput.addEventListener("input", isMessageValid);
