// --- GET CART FROM LOCALSTORAGE ---
let cart = JSON.parse(localStorage.getItem('mini_cart_v1')) || [];

// DOM elements
const orderItemsEl = document.getElementById("orderItems");
const subtotalEl = document.getElementById("subtotal");
const totalAkhirEl = document.getElementById("totalAkhir");

let subtotal = 0;

// --- RENDER ITEMS ---
cart.forEach(item => {
  // Make sure price is a clean number
  let price = parseInt(item.price.toString().replace(/\D/g, ""));

  const div = document.createElement("div");
  div.classList.add("order-item");
  div.innerHTML = `
    <span>${item.name} × ${item.qty}</span>
    <span>Rp ${price * item.qty}</span>
  `;
  orderItemsEl.appendChild(div);

  subtotal += price * item.qty;
});

subtotalEl.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;

const ongkir = 10000;

totalAkhirEl.textContent = `Rp ${(subtotal + ongkir).toLocaleString("id-ID")}`;

// --- ORDER BUTTON ---
document.getElementById("btnPlaceOrder").addEventListener("click", () => {
  alert("Order berhasil! 🎉");

  // Clear cart
  localStorage.removeItem("mini_cart_v1");

  // Delay redirect slightly so clearing finishes
  setTimeout(() => {
    window.location.href = "success.html";
  }, 200);
});


