// ===============================
// APP.JS (SINGLE FILE CONTROLLER)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  initAuthPages();
  initSeatsPage();
});

// ===============================
// AUTH (REGISTER + LOGIN)
// ===============================

function initAuthPages() {
  const loginBtn = document.querySelector("#loginBtn");
  const registerBtn = document.querySelector("#registerBtn");

  if (loginBtn) {
    loginBtn.onclick = login;
  }

  if (registerBtn) {
    registerBtn.onclick = register;
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert(data.message || "Login failed");
  }
}

async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registered successfully");
    window.location.href = "login.html";
  } else {
    alert(data.message || "Register failed");
  }
}

// ===============================
// SEATS PAGE
// ===============================

function initSeatsPage() {
  const tbl = document.getElementById("tbl");
  if (!tbl) return;

  loadSeats();
}

// Load seats from backend
async function loadSeats() {
  const res = await fetch("/seats");
  const seats = await res.json();

  const tbl = document.getElementById("tbl");
  tbl.innerHTML = "";

  const sorted = seats.sort((a, b) => a.id - b.id);

  let tr;

  sorted.forEach((seat, i) => {
    if (i % 8 === 0) tr = document.createElement("tr");

    const td = document.createElement("td");

    const base =
      "w-32 h-32 rounded-2xl text-center align-middle text-2xl font-bold transition-all duration-300 select-none relative group";

    if (seat.isbooked) {
      td.className = `${base} bg-rose-500/10 text-rose-500/60 cursor-not-allowed`;
      td.innerHTML = `<span>${seat.id}</span>`;
    } else {
      td.className = `${base} bg-emerald-500 text-white cursor-pointer`;
      td.innerHTML = `<span>${seat.id}</span>`;

      td.onclick = () => bookSeat(seat);
    }

    tr.appendChild(td);
    tbl.appendChild(tr);
  });
}

// Book seat (SINGLE + SIMPLE)
async function bookSeat(seat) {
  const name = prompt("Enter your name");
  if (!name) return;

  const res = await fetch(`/bookings/${seat.id}/${name}`, {
    method: "PUT"
  });

  const data = await res.json();

  if (res.ok) {
    alert("Seat booked successfully!");
    loadSeats(); // refresh UI
  } else {
    alert(data.error || "Booking failed");
  }
}