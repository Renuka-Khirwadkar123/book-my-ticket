document.addEventListener("DOMContentLoaded", async() => {

const movie = localStorage.getItem("movie");
document.getElementById("movieTitle").innerText = "🎬 " + movie;

const rows = ["A","B","C","D","E","F"];
const cols = 10;

let selectedSeats = [];

const seatMap = document.getElementById("seat-map");

rows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");

  for (let i = 1; i <= cols; i++) {
    const seatId = row + i;

    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.innerText = seatId;

    seat.onclick = () => toggle(seat, seatId);

    rowDiv.appendChild(seat);
  }

  seatMap.appendChild(rowDiv);

});

  await loadBookedSeats();

function toggle(seat, id) {
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter(s => s !== id);
  } else {
    seat.classList.add("selected");
    selectedSeats.push(id);
  }
}

async function loadBookedSeats() {
    try {
      const res = await fetch(`/bookings/show/${show_id}`);  // 👈 show_id available hai ab
      const data = await res.json();

      data.booked_seats.forEach(seatId => {
        const seatEl = [...document.querySelectorAll(".seat")]
          .find(el => el.innerText === seatId);
        if (seatEl) {
          seatEl.classList.add("booked");
        }
      });
    } catch (err) {
      console.error("Failed to load booked seats:", err);
    }
  }

window.bookSeats = async function () {

 const token = localStorage.getItem("token");

if (!token) {
    alert("Please log in to book seats.");
    return;
  }


  if (selectedSeats.length === 0) {
    alert("Select seats first!");
    return;
  }

  const res = await fetch("/bookings", {
    method: "POST",
    headers: {"Content-Type":"application/json",
              "Authorization": "Bearer " + token
},
    body: JSON.stringify({
      show_id: 1,
      seats: selectedSeats
    })
  });

  const data = await res.json();

  showToast(data.message);

  if (res.ok) {
    document.querySelectorAll(".selected").forEach(s=>{
      s.classList.remove("selected");
      s.classList.add("booked");
    });

    selectedSeats = [];
  }
}

function showToast(msg) {
  const toast = document.getElementById("toast");

  toast.innerText = msg;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}


});