
// Improved input formatting and validation
document.addEventListener('DOMContentLoaded', () => {
  // Initialize checkout
  updateCheckoutCart();
  
  // Card number formatting
  document.getElementById('cardNumber').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ').substr(0, 19) || '';
    e.target.value = value;
  });

  // Expiry date formatting
  document.getElementById('expiry').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
  });

  // CVV formatting
  document.getElementById('cvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substr(0, 3);
  });

  // Form submission
  document.getElementById('paymentForm').addEventListener('submit', handlePayment);
});

// Improved payment handler
async function handlePayment(e) {
  e.preventDefault();
  const form = e.target;
  const button = form.querySelector('button');
  
  // Validate inputs
  const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
  const expiry = document.getElementById('expiry').value.split('/');
  const cvv = document.getElementById('cvv').value;

  let isValid = true;

  if (!/^\d{16}$/.test(cardNumber)) {
    showError('cardError', 'Invalid card number');
    isValid = false;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry.join('/')) || 
      parseInt(expiry[0]) > 12 || 
      parseInt(expiry[0]) < 1) {
    showError('expiryError', 'Invalid expiry date');
    isValid = false;
  }

  if (!/^\d{3}$/.test(cvv)) {
    showError('cvvError', 'Invalid CVV');
    isValid = false;
  }

  if (!isValid) return;

  // Show loading state
  form.classList.add('loading');
  button.disabled = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (confirm('Confirm purchase?')) {
    localStorage.removeItem('cartItems');
    alert('Payment successful! Redirecting...');
    window.location.href = 'index.html';
  }

  form.classList.remove('loading');
  button.disabled = false;
}

function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.style.display = 'block';
}

// Cart functionality
function updateCheckoutCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const tbody = document.querySelector('#checkoutCart tbody');
  const totalPrice = document.getElementById('totalPrice');

  if (cartItems.length === 0) {
    alert('Cart is empty! Redirecting...');
    window.location.href = 'gamingequipment.html';
    return;
  }

  tbody.innerHTML = cartItems.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>LKR ${item.price.toLocaleString()}</td>
    </tr>
  `).join('');

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = `Total: LKR ${total.toLocaleString()}`;
}

