const allButtons = document.querySelectorAll('.add-to-cart');
const cartContent = document.querySelector('.cart-section .updated-cart');
const cartHeader = document.querySelector('.cart-section h2');
const cartImage = document.querySelector('.cart-section .cart-image');
const orderSummary = document.querySelector('.order-summary');
const orderTotalElement = document.querySelector('.order-total span');
const confirmOrder = document.querySelector('.confirm-order');

let cart = [];

function updateCartDisplay() {
  cartContent.innerHTML = '';

  if (cart.length === 0) {
    cartImage.style.display = 'block';
    cartHeader.textContent = `Your Cart (0)`;
    orderSummary.style.display = 'none';
  } else {
    cartImage.style.display = 'none';
    cartHeader.textContent = `Your Cart (${cart.length})`;

    let totalPrice = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      cartItem.innerHTML = `
        <h3>${item.name} (${item.quantity}x)</h3>
        <span class="price">$${itemTotal.toFixed(2)}</span>
      `;

      cartContent.appendChild(cartItem);
    });

    orderTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    orderSummary.style.display = 'block';
  }
}

function addToCart(event) {
  const dessertCard = event.target.closest('.dessert-card');
  const dessertName = dessertCard.querySelector('p').textContent;
  const dessertPrice = parseFloat(
    dessertCard.querySelector('.price').textContent.replace('$', '')
  );

  const existingItem = cart.find(item => item.name === dessertName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: dessertName,
      price: dessertPrice,
      quantity: 1,
    });
  }

  updateCartDisplay();
}

function showConfirmationModal(orderDetails, total) {
  const modal = document.getElementById('confirmationModal');
  const orderDetailsContainer = modal.querySelector('.order-details');
  const orderTotal = modal.querySelector('.order-total span');

  orderDetailsContainer.innerHTML = '';

  orderDetails.forEach(item => {
    const itemElement = document.createElement('p');
    itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    orderDetailsContainer.appendChild(itemElement);
  });

  orderTotal.textContent = `$${total.toFixed(2)}`;

  modal.style.display = 'block';
}

function closeConfirmationModal() {
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'none';
}

function resetCart() {
  cart = [];
  updateCartDisplay();
  closeConfirmationModal();
}

document.querySelector('.start-new-order').addEventListener('click', resetCart);

document.querySelector('.confirm-order').addEventListener('click', () => {
  const orderDetails = cart.map(item => ({
    name: item.name,
    price: item.price * item.quantity,
  }));
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  showConfirmationModal(orderDetails, total);
});

allButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});
