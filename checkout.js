// --- GET CART FROM LOCALSTORAGE ---
let cart = JSON.parse(localStorage.getItem('mini_cart_v1')) || [];

// --- STORE LOCATION (UNSRI FE INDRALAYA) ---
const STORE_LAT = -3.220300;
const STORE_LNG = 104.650900;

// --- Dummy geocoder: ubah alamat jadi koordinat fake ---
function dummyGeocode(address) {
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
        hash += address.charCodeAt(i);
    }

    // Buat koordinat random tapi stabil
    return {
        lat: -3.22 + ((hash % 50) / 1000),   // range: -3.22 s/d -3.17
        lng: 104.65 + ((hash % 50) / 1000)   // range: 104.65 s/d 104.70
    };
}

// --- Haversine Formula (hitungan jarak km) ---
function getDistanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a =
        Math.sin(dLat/2) ** 2 +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLng/2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// DOM elements
const orderItemsEl = document.getElementById("orderItems");
const subtotalEl = document.getElementById("subtotalValue");
const totalAkhirEl = document.getElementById("totalAkhir");

let subtotal = 0;

// --- RENDER ITEMS ---
cart.forEach(item => {
  // Make sure price is a clean number
  let price = parseInt(item.price.toString().replace(/\D/g, ""));

  const div = document.createElement("div");
  div.classList.add("order-item");
  div.innerHTML = `
    <span>${item.title} × ${item.qty}</span>
    <span>Rp ${price * item.qty}</span>
  `;
  orderItemsEl.appendChild(div);

  subtotal += price * item.qty;
});

subtotalEl.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;

function calculateOngkir() {
    const address = document.getElementById("alamat").value.trim();
    if (!address) return 5000; // default 5k

    const userLoc = dummyGeocode(address);
    const distance = getDistanceKm(STORE_LAT, STORE_LNG, userLoc.lat, userLoc.lng);

    // Dummy formula: 5000 + 5000 per 100 km
    const extra = Math.floor(distance / 100) * 5000;

    return 5000 + extra;
}

function updateTotal() {
    // --- Recalculate subtotal every time ---
    let subtotal = 0;
    cart.forEach(item => {
        let price = parseInt(item.price.toString().replace(/\D/g, ""));
        subtotal += price * item.qty;
    });

    // --- Calculate ongkir based on latest subtotal ---
    let ongkir = calculateOngkir();

    document.getElementById("subtotalValue").textContent =
        "Rp " + subtotal.toLocaleString("id-ID");

    document.getElementById("ongkirValue").textContent =
        "Rp " + ongkir.toLocaleString("id-ID");

    document.getElementById("totalAkhir").textContent =
        "Rp " + (subtotal + ongkir).toLocaleString("id-ID");
}

 updateTotal()

document.getElementById("alamat").addEventListener("input", updateTotal);
// --- ORDER BUTTON ---
document.getElementById("btnPlaceOrder").addEventListener("click", () => {
    const nama = document.getElementById("nama").value.trim();
    const hp = document.getElementById("hp").value.trim();
    const alamat = document.getElementById("alamat").value.trim();

    // VALIDATION
    if (!nama || !hp || !alamat) {
        alert("do you REALLY think i know who u r. - n7");
        return; // stop order
    }

    alert("yay u spent ur money on smth 🎭🍔");

  // Clear cart
  localStorage.removeItem("mini_cart_v1");

  // Delay redirect slightly so clearing finishes
  setTimeout(() => {
    window.location.href = "success.html";
  }, 200);
});











