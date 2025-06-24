// Cart and Wishlist count management
document.addEventListener("DOMContentLoaded", () => {
  // Get cart and wishlist elements
  const cartLink = document.querySelector('.cart-link');
  const wishlistLink = document.querySelector('.wishlist-link');
  
  // Function to update counts
  function updateCounts() {
    // Get cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Get wishlist items
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCount = wishlist.length;
    
    // Update cart count
    if (cartLink) {
      const cartCountSpan = document.createElement('span');
      cartCountSpan.className = 'cart-count';
      cartCountSpan.textContent = cartCount;
      
      // Remove existing count if any
      const existingCount = cartLink.querySelector('.cart-count');
      if (existingCount) {
        existingCount.remove();
      }
      
      // Add new count
      if (cartCount > 0) {
        cartLink.appendChild(cartCountSpan);
      }
    }
    
    // Update wishlist count
    if (wishlistLink) {
      const wishlistCountSpan = document.createElement('span');
      wishlistCountSpan.className = 'wishlist-count';
      wishlistCountSpan.textContent = wishlistCount;
      
      // Remove existing count if any
      const existingCount = wishlistLink.querySelector('.wishlist-count');
      if (existingCount) {
        existingCount.remove();
      }
      
      // Add new count
      if (wishlistCount > 0) {
        wishlistLink.appendChild(wishlistCountSpan);
      }
    }
  }

  // Add styles for count badges
  const style = document.createElement('style');
  style.textContent = `
    .cart-count, .wishlist-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #e91e63;
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .cart-link, .wishlist-link {
      position: relative;
    }
  `;
  document.head.appendChild(style);

  // Update counts initially
  updateCounts();

  // Listen for storage changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'cart' || e.key === 'wishlist') {
      updateCounts();
    }
  });

  // Update counts when items are added/removed
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (key === 'cart' || key === 'wishlist') {
      updateCounts();
    }
  };

  const originalRemoveItem = localStorage.removeItem;
  localStorage.removeItem = function(key) {
    originalRemoveItem.apply(this, arguments);
    if (key === 'cart' || key === 'wishlist') {
      updateCounts();
    }
  };
}); 