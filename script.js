// Mobile Menu and Search Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const searchContainer = document.querySelector('.search-container');
  const searchButton = document.querySelector('.search-button');

  // Toggle mobile menu
  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuToggle.classList.toggle('active');
  });

  // Toggle search on mobile
  searchButton?.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      searchContainer.classList.toggle('active');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
      navLinks?.classList.remove('show');
      menuToggle?.classList.remove('active');
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks?.classList.remove('show');
      menuToggle?.classList.remove('active');
      searchContainer?.classList.remove('active');
    }
  });
});

// Search Bar

document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-box input');
  const searchBox = document.querySelector('.search-box');
  const searchDropdown = document.querySelector('.search-results-dropdown');
  
  // Initialize products in localStorage if they don't exist
  function initializeProducts() {
    if (!localStorage.getItem('menProducts')) {
      const menProducts = [
        {
          id: 1,
          name: "Titan Octane Black",
          image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwc07c110a/images/Titan/Catalog/90086KM05_1.jpg?sw=600&sh=600",
          price: "₹12,765",
          category: "Men Watch",
          brand: "TITAN",
          rating: "4.4"
        },
        {
          id: 2,
          name: "Police Men's Skeleton",
          image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw3f71a14a/images/Helios/Catalog/PLPEWJR0005906_1.jpg?sw=600&sh=600",
          price: "₹7,995",
          category: "Men Watch",
          brand: "POLICE",
          rating: "4.0"
        }
      ];
      localStorage.setItem('menProducts', JSON.stringify(menProducts));
    }

    if (!localStorage.getItem('womenProducts')) {
      const womenProducts = [
        {
          id: 3,
          name: "Raga Showstopper 2.0 Quartz Green",
          image: "https://m.media-amazon.com/images/I/71WXkGpIjaL._SX522_.jpg",
          price: "₹5,343",
          category: "Women Watch",
          brand: "RAGA",
          rating: "4.6"
        },
        {
          id: 4,
          name: "Fossil Analog Gold Dial",
          image: "https://m.media-amazon.com/images/I/41MxO-0RAxL._SX300_SY300_QL70_FMwebp_.jpg",
          price: "₹13,495",
          category: "Women Watch",
          brand: "FOSSIL",
          rating: "5.0"
        }
      ];
      localStorage.setItem('womenProducts', JSON.stringify(womenProducts));
    }

    if (!localStorage.getItem('smartProducts')) {
      const smartProducts = [
        {
          id: 5,
          name: "NoiseFit Halo",
          image: "https://m.media-amazon.com/images/I/71aTghUQfqL._SX679_.jpg",
          price: "₹2,999",
          category: "Smart Watch",
          brand: "NOISE",
          rating: "4.2"
        },
        {
          id: 6,
          name: "Fastrack Radiant FX4",
          image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw56c2fc35/images/Fastrack/Catalog/38158NM01_1.jpg?sw=600&sh=600",
          price: "₹5,495",
          category: "Smart Watch",
          brand: "FASTRACK",
          rating: "4.6"
        }
      ];
      localStorage.setItem('smartProducts', JSON.stringify(smartProducts));
    }

    if (!localStorage.getItem('premiumProducts')) {
      const premiumProducts = [
        {
          id: 7,
          name: "Xylys Quartz Analog Black",
          image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwf1ad553d/images/Xylys/Catalog/40065KL01E_2.jpg?sw=600&sh=600",
          price: "₹39,900",
          category: "Premium Watch",
          brand: "XYLYS",
          rating: "4.4"
        },
        {
          id: 8,
          name: "Titan Vintage 18k Gold",
          image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw168a5b4a/images/Titan/Catalog/5069DM01_1.jpg?sw=600&sh=600",
          price: "₹429,250",
          category: "Premium Watch",
          brand: "NEBULA",
          rating: "5.0"
        }
      ];
      localStorage.setItem('premiumProducts', JSON.stringify(premiumProducts));
    }

    if (!localStorage.getItem('internationalProducts')) {
      const internationalProducts = [
        {
          id: 9,
          name: "Anne Klein Quartz Analog Purple",
          image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwb721c967/images/Helios/Catalog/AK4018PRRG_1.jpg?sw=600&sh=600",
          price: "₹8,750",
          category: "International Watch",
          brand: "ANNE KLEIN",
          rating: "4.6"
        },
        {
          id: 10,
          name: "Police Quartz Analog Grey",
          image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw89a444e0/images/Helios/Catalog/PLPEWJA2110101_1.jpg?sw=600&sh=600",
          price: "₹14,750",
          category: "International Watch",
          brand: "POLICE",
          rating: "5.0"
        }
      ];
      localStorage.setItem('internationalProducts', JSON.stringify(internationalProducts));
    }
  }

  // Initialize products when page loads
  initializeProducts();
  
  // Get all products from localStorage
  function getAllProducts() {
    const menProducts = JSON.parse(localStorage.getItem('menProducts') || '[]');
    const womenProducts = JSON.parse(localStorage.getItem('womenProducts') || '[]');
    const smartProducts = JSON.parse(localStorage.getItem('smartProducts') || '[]');
    const premiumProducts = JSON.parse(localStorage.getItem('premiumProducts') || '[]');
    const internationalProducts = JSON.parse(localStorage.getItem('internationalProducts') || '[]');

    console.log('Men Products:', menProducts);
    console.log('Women Products:', womenProducts);
    console.log('Smart Products:', smartProducts);
    console.log('Premium Products:', premiumProducts);
    console.log('International Products:', internationalProducts);

    const allProducts = [
      ...menProducts,
      ...womenProducts,
      ...smartProducts,
      ...premiumProducts,
      ...internationalProducts
    ];

    console.log('All Products:', allProducts);
    return allProducts;
  }

  // Search function
  function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
      // Add loading state
      searchButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
      searchButton.disabled = true;
      
      // Store search term in localStorage
      localStorage.setItem('searchTerm', searchTerm);
      
      // Redirect to search results page
      window.location.href = 'search-results.html';
    } else {
      // Visual feedback for empty search
      searchBox.classList.add('empty-search');
      setTimeout(() => {
        searchBox.classList.remove('empty-search');
      }, 500);
    }
  }

  // Show search results in dropdown
  function showSearchResults(searchTerm) {
    if (!searchTerm) {
      searchDropdown.classList.remove('active');
      return;
    }

    const allProducts = getAllProducts();
    const filteredProducts = allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const brandMatch = product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || brandMatch;
    }).slice(0, 5);

    searchDropdown.innerHTML = '';

    if (filteredProducts.length === 0) {
      searchDropdown.innerHTML = '<div class="no-results">No products found</div>';
    } else {
      filteredProducts.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="item-details">
            <div class="item-name">${product.name}</div>
            <div class="item-price">${product.price}</div>
            <div class="item-brand">${product.brand}</div>
          </div>
        `;
        
        resultItem.addEventListener('click', () => {
          // Store the selected product in localStorage
          localStorage.setItem('selectedProduct', JSON.stringify(product));
          
          // Determine the correct product detail page based on category
          let productPage = 'product.html'; // default page
          
          if (product.category.toLowerCase().includes('men')) {
            productPage = 'men/product.html';
          } else if (product.category.toLowerCase().includes('women')) {
            productPage = 'women/product2.html';
          } else if (product.category.toLowerCase().includes('smart')) {
            productPage = 'smart-watch/product3.html';
          } else if (product.category.toLowerCase().includes('premium')) {
            productPage = 'premium watch/product4.html';
          } else if (product.category.toLowerCase().includes('international')) {
            productPage = 'internation brand/product5.html';
          }
          
          // Redirect to the appropriate product detail page
          window.location.href = productPage;
        });
        
        searchDropdown.appendChild(resultItem);
      });
    }

    searchDropdown.classList.add('active');
  }

  // Add click event to button
  searchButton.addEventListener('click', performSearch);
  
  // Add input event to show dropdown results
  searchInput.addEventListener('input', function() {
    searchBox.classList.remove('empty-search');
    const searchTerm = this.value.trim();
    console.log('Input Event - Search Term:', searchTerm);
    showSearchResults(searchTerm);
  });
  
  // Add enter key event to input
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchBox.contains(e.target)) {
      searchDropdown.classList.remove('active');
    }
  });

  // Add focus styles
  searchInput.addEventListener('focus', function() {
    searchBox.classList.add('focused');
    if (this.value.trim()) {
      showSearchResults(this.value.trim());
    }
  });
  
  searchInput.addEventListener('blur', function() {
    searchBox.classList.remove('focused');
  });
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle for mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // For mobile: make nav items expandable
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const link = item.querySelector('a');

    // Mobile only click behavior for mega menu
    if (window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
        // Only prevent default if it has mega menu
        if (item.querySelector('.mega-menu')) {
          e.preventDefault();

          // Close all other open menus
          navItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });

          // Toggle current menu
          item.classList.toggle('active');
        }
      });
    }
  });

  // Reset menu state on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('show');
      navItems.forEach(item => item.classList.remove('active'));
    }
  });

  // Login and Profile Management
  const accountBtn = document.querySelector('.account-btn');
  const loginPopup = document.getElementById('loginPopup');
  const userProfilePopup = document.getElementById('userProfilePopup');
  const closeLogin = document.getElementById('closeLogin');
  const closeProfile = document.getElementById('closeProfile');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check if user is logged in
  const checkLoginStatus = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      updateLoggedInState(user);
    } else {
      updateLoggedOutState();
    }
  };

  // Update UI for logged in state
  const updateLoggedInState = (user) => {
    accountBtn.innerHTML = `
      <i class="fa-regular fa-user"></i>
      <span>${user.name}</span>
    `;
    accountBtn.onclick = showUserProfile;
  };

  // Update UI for logged out state
  const updateLoggedOutState = () => {
    accountBtn.innerHTML = `
      <i class="fa-regular fa-user"></i>
      <span>Account</span>
    `;
    accountBtn.onclick = showLoginPopup;
  };

  // Show login popup
  const showLoginPopup = () => {
    loginPopup.style.display = 'flex';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  };

  // Show user profile
  const showUserProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      document.getElementById('profileName').textContent = userData.name;
      document.getElementById('profileEmail').textContent = userData.email;
      document.getElementById('profileMobile').textContent = userData.mobile;
      userProfilePopup.style.display = 'flex';
    }
  };

  // Handle login form submission
  loginForm.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;

    // Get stored user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData && userData.email === email && userData.password === password) {
      loginPopup.style.display = 'none';
      updateLoggedInState(userData);
      showMessage('Login successful!', false);
    } else {
      showMessage('Invalid email or password');
    }
  });

  // Handle register form submission
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

    // Save user data
    const userData = {
      name,
      email,
      mobile,
      password
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    loginPopup.style.display = 'none';
    updateLoggedInState(userData);
    showMessage('Registration successful!', false);
  });

  // Handle logout
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userData');
    updateLoggedOutState();
    userProfilePopup.style.display = 'none';
    showMessage('Logged out successfully', false);
  });

  // Close buttons
  closeLogin.addEventListener('click', () => {
    loginPopup.style.display = 'none';
  });

  closeProfile.addEventListener('click', () => {
    userProfilePopup.style.display = 'none';
  });

  // Toggle between login and register forms
  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  });

  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Show message function
  const showMessage = (message, isError = true) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  };

  // Check login status on page load
  checkLoginStatus();
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Slider
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;
let isAnimating = false;
let slideInterval;
const SLIDE_DURATION = 3000; // 3 seconds in milliseconds

function showSlide(index, direction = 'right') {
  if (isAnimating) return;
  isAnimating = true;

  // Remove all animation classes
  slides.forEach(slide => {
    slide.classList.remove('active', 'slide-in-right', 'slide-in-left');
  });

  // Add appropriate animation class based on direction
  slides[index].classList.add('active', `slide-in-${direction}`);

  // Reset animation flag after animation completes
  setTimeout(() => {
    isAnimating = false;
  }, 1000);
}

function nextSlide() {
  if (isAnimating) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide, 'right');
}

function prevSlide() {
  if (isAnimating) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide, 'left');
}

function startAutoSlide() {
  // Clear any existing interval
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  // Start new interval with precise 3-second timing
  slideInterval = setInterval(() => {
    nextSlide();
  }, SLIDE_DURATION);
}

// Initialize slider
function initSlider() {
  showSlide(currentSlide);
  startAutoSlide();
}

// Pause auto-slide when hovering over the slider
const slider = document.querySelector('.slider');
slider?.addEventListener('mouseenter', () => {
  // clearInterval(slideInterval);
});

// Resume auto-slide when mouse leaves the slider
slider?.addEventListener('mouseleave', () => {
  startAutoSlide();
});

// Button event listeners
nextBtn?.addEventListener("click", () => {
  clearInterval(slideInterval);
  nextSlide();
  startAutoSlide();
});

prevBtn?.addEventListener("click", () => {
  clearInterval(slideInterval);
  prevSlide();
  startAutoSlide();
});

// Start the slider
initSlider();

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Mobile Nav Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Short Banner
const track = document.getElementById("carouselTrack");
const scrollAmount = 220;
let autoScrollInterval;

function scrollCarousel(direction) {
  if (direction === "left") {
    track.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  } else {
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}

// Automatic scrolling one-by-one
function startAutoCarousel() {
  autoScrollInterval = setInterval(() => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollCarousel("right");
    }
  }, 3000);
}
startAutoCarousel();



function scrollCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  const scrollAmount = track.offsetWidth / 2; // dynamic scroll
  if (direction === 'left') {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Footer
// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  // Show button when user scrolls down 300px
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Smooth scroll to top when button is clicked
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});