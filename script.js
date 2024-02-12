document.getElementById('subscribeForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);

  // Client-side form validation
  const emailInput = formData.get('email');
  if (!isValidEmail(emailInput)) {
    displayError('Invalid email format. Please enter a valid email address.');
    return;
  }

  try {
    const response = await fetch('/subscribe', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      displaySuccess('Subscription successful!');
      this.reset(); // Clear form fields
    } else {
      throw new Error('Failed to subscribe. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    displayError('An error occurred. Please try again later.');
  }
});

function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displaySuccess(message) {
  const successMessage = document.createElement('div');
  successMessage.classList.add('alert', 'alert-success');
  successMessage.textContent = message;
  document.getElementById('subscribeForm').appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 5000); // Remove success message after 5 seconds
}

function displayError(message) {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('alert', 'alert-danger');
  errorMessage.textContent = message;
  document.getElementById('subscribeForm').appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, 5000); // Remove error message after 5 seconds
}


  // Initialize Swiper
  var swiper = new Swiper('.swiper-container', {
    loop: true, // Enable loop mode
    autoplay: {
      delay: 3000, // Delay between slides in milliseconds
      disableOnInteraction: false // Continue autoplay even when user interacts with slider
    },
    // Add more options as needed
  });


