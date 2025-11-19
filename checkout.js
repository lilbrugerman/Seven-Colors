// --- GET CART FROM LOCALSTORAGE ---
let cart = JSON.parse(localStorage.getItem('mini_cart_v1')) || [];

// DOM elements
const orderItemsEl = document.getElementById("orderItems");
const subtotalEl = document.getElementById("subtotal");
const totalAkhirEl = document.getElementById("totalAkhir");

let subtotal = 0;

// --- RENDER ITEMS ---
cart.forEach(item => {
  const div = document.createElement("div");
  div.classList.add("order-item");
  div.innerHTML = `
    <span>${item.name} × ${item.qty}</span>
    <span>Rp ${item.price * item.qty}</span>
  `;
  orderItemsEl.appendChild(div);

  subtotal += item.price * item.qty;
});

subtotalEl.textContent = `Rp ${subtotal}`;
const ongkir = 10000;
totalAkhirEl.textContent = `Rp ${subtotal + ongkir}`;

// --- ORDER BUTTON ---
document.getElementById("btnPlaceOrder").addEventListener("click", () => {
  alert("Order berhasil! 🎉");
  localStorage.removeItem("mini_cart_v1");
  window.location.href = "success.html"; // pembayaran berhasil ahh screen
});

