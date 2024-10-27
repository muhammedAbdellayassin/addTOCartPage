let cart = [];

// Function to add item to cart
function addToCart(productId, productName, productPrice, productImage) {
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    });
  }

  updateCartCount();

  displayCart();
}

// Update cart count in the cart icon
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  
  cartCount.textContent = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );
}

// Function to display cart items in modal
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    // Disable checkout button when cart is empty
    checkoutBtn.textContent = "Cart is empty";
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add("empty-cart");
  } 
  
  else {
    cart.forEach(function (item) {
      const div = document.createElement("div");
      div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - $${item.price} x ${item.quantity}</p>`;

      cartItems.appendChild(div);
      total += item.price * item.quantity;
    });

    checkoutBtn.textContent = "Checkout";
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("empty-cart");
  }

  cartTotal.textContent = total;
}

// Show cart modal
document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "flex";
});

// Close cart modal
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});


// Checkout functionality
document.getElementById("checkout-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
  document.getElementById("payment-modal").style.display = "flex";
  document.getElementById("payment-total").textContent =
    document.getElementById("cart-total").textContent;
});

// Payment and Purchase completion
document.getElementById("pay-btn").addEventListener("click", () => {
  alert(
    `Purchase completed! Total: BIRR ${
      document.getElementById("payment-total").textContent
    }`
  );
  cart = [];
  updateCartCount();
  document.getElementById("payment-modal").style.display = "none";
  displayCart();
});



// Add event listeners to add-to-cart buttons
document.querySelectorAll(".add-to-cart").forEach(function (button) {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-id");
    const productName = button.getAttribute("data-name");
    const productPrice = parseFloat(button.getAttribute("data-price"));
    const productImage = button.getAttribute("data-image");

    addToCart(productId, productName, productPrice, productImage);
  });
});
