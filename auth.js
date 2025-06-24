// Auth state management
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Function to update logged in state
function updateLoggedInState(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update UI elements if they exist
    const accountBtn = document.querySelector('.account-btn');
    if (accountBtn) {
        accountBtn.classList.add('logged-in');
        accountBtn.innerHTML = `
            <i class="fa-regular fa-user"></i>
            <span>${user.fullName.split(' ')[0]}</span>
        `;
    }
}

// Function to update logged out state
function updateLoggedOutState() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Update UI elements if they exist
    const accountBtn = document.querySelector('.account-btn');
    if (accountBtn) {
        accountBtn.classList.remove('logged-in');
        accountBtn.innerHTML = `
            <i class="fa-regular fa-user"></i>
            <span>Account</span>
        `;
    }
}

// Function to check login status
function checkLoginStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        updateLoggedInState(JSON.parse(userData));
    } else {
        updateLoggedOutState();
    }
}

// Function to handle logout
function handleLogout() {
    updateLoggedOutState();
    
    // Show logout message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message success';
    messageDiv.textContent = 'Logged out successfully!';
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Check login status when page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// Export functions for use in other files
window.auth = {
    updateLoggedInState,
    updateLoggedOutState,
    checkLoginStatus,
    handleLogout,
    getCurrentUser: () => currentUser
};

document.addEventListener("DOMContentLoaded", () => {
  // Check login state from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const accountBtn = document.getElementById("accountBtn");
  const loginPopup = document.getElementById("loginPopup");
  const userProfilePopup = document.getElementById("userProfilePopup");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const closeLogin = document.getElementById("closeLogin");
  const closeProfile = document.getElementById("closeProfile");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");
  const logoutBtn = document.getElementById("logoutBtn");

  // Update UI based on login state
  function updateLoginState() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      // User is logged in
      accountBtn.classList.add('logged-in');
      accountBtn.innerHTML = `
        <i class="fa-regular fa-user"></i>
        <span>${userData.name}</span>
      `;
    } else {
      // User is logged out
      accountBtn.classList.remove('logged-in');
      accountBtn.innerHTML = `
        <i class="fa-regular fa-user"></i>
        <span>Account</span>
      `;
    }
  }

  // Show login popup
  function showLoginPopup() {
    if (loginPopup) {
      loginPopup.style.display = 'flex';
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
    }
  }

  // Show user profile
  function showUserProfile() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userProfilePopup) {
      document.getElementById('profileName').textContent = userData.name;
      document.getElementById('profileEmail').textContent = userData.email;
      document.getElementById('profileMobile').textContent = userData.mobile;
      userProfilePopup.style.display = 'flex';
    }
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="text"]').value;
      const password = this.querySelector('input[type="password"]').value;

      const userData = JSON.parse(localStorage.getItem('userData'));
      
      if (userData && userData.email === email && userData.password === password) {
        loginPopup.style.display = 'none';
        updateLoginState();
        showMessage('Login successful!', false);
      } else {
        showMessage('Invalid email or password');
      }
    });
  }

  // Handle register form submission
  if (registerForm) {
    registerForm.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('input[placeholder="Full Name"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const mobile = this.querySelector('input[placeholder="Mobile Number"]').value;
      const password = this.querySelector('input[placeholder="Create Password"]').value;
      const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value;

      if (password !== confirmPassword) {
        showMessage('Passwords do not match');
        return;
      }

      const userData = {
        name,
        email,
        mobile,
        password
      };
      localStorage.setItem('userData', JSON.stringify(userData));

      loginPopup.style.display = 'none';
      updateLoginState();
      showMessage('Registration successful!', false);
    });
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('userData');
      updateLoginState();
      if (userProfilePopup) userProfilePopup.style.display = 'none';
      showMessage('Logged out successfully', false);
    });
  }

  // Close buttons
  if (closeLogin) {
    closeLogin.addEventListener('click', () => {
      if (loginPopup) loginPopup.style.display = 'none';
    });
  }

  if (closeProfile) {
    closeProfile.addEventListener('click', () => {
      if (userProfilePopup) userProfilePopup.style.display = 'none';
    });
  }

  // Toggle between login and register forms
  if (showRegister) {
    showRegister.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'block';
    });
  }

  if (showLogin) {
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      if (registerForm) registerForm.style.display = 'none';
      if (loginForm) loginForm.style.display = 'block';
    });
  }

  // Account button click handler
  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        showUserProfile();
      } else {
        showLoginPopup();
      }
    });
  }

  // Show message function
  function showMessage(message, isError = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Initial state update
  updateLoginState();
}); 