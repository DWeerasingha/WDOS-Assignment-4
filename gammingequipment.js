
  function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove('active');
    }
  });

  // Close menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      document.querySelector('.mobile-menu').classList.remove('active');
    }
  });

  // Scroll animations
  document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
  });








  
  let cartItems = [];
  let favoriteItems = []; // Fixed: Single declaration

  function addToCart(name, price, details) {
    cartItems.push({ name, price, details });
    updateCartTable();
    alert(`${name} added to cart!`);
  }

  function transferFavoritesToCart() {
  favoriteItems.forEach(favItem => {
    if (!cartItems.some(item => item.name === favItem.name)) {
      cartItems.push({
        name: favItem.name,
        price: favItem.price,
        details: favItem.details
      });
    }
  });
  updateCartTable();
  alert('Favorites transferred to cart!');
}

  function updateCartTable() {
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';
    
    cartItems.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.details.join(', ')}</td>
        <td>LKR ${item.price.toLocaleString()}</td>
        <td>
          <button class="cta-button remove-btn" onclick="removeCartItem(${index})">Remove</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function removeCartItem(index) {
    if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      updateCartTable();
      alert('Item removed from cart!');
    }
  }

  function toggleFavorite(name, button) {
  const heartIcon = button.nextElementSibling;
  const productContent = button.closest('.product-content');
  
  // Extract price from the product content
  const priceElement = productContent.querySelector('.price');
  const priceText = priceElement.textContent;
  const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
  
  // Extract details from the product list
  const details = [];
  const ul = productContent.querySelector('ul');
  ul.querySelectorAll('li').forEach(li => {
    details.push(li.textContent.trim());
  });
  
  // Check if item exists in favorites
  const index = favoriteItems.findIndex(item => item.name === name);
  
  if (index === -1) {
    favoriteItems.push({ name, price, details });
    heartIcon.classList.add('active');
    alert(`${name} added to favorites!`);
  } else {
    favoriteItems.splice(index, 1);
    heartIcon.classList.remove('active');
    alert(`${name} removed from favorites!`);
  }
}
  
  function proceedToCheckout() {
  // Save cart items to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // Redirect to checkout page
  window.location.href = 'checkout.html';
}





































