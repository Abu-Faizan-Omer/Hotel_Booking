 async function loadBookingHistory() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/booking/history", {
          headers: { Authorization: token }
        });

        const bookings = res.data.bookings;
        const container = document.getElementById("bookingList");

        if (bookings.length === 0) {
          container.innerHTML = "<p class='text-center'>No bookings yet.</p>";
          return;
        }

        for (const b of bookings) {
          const div = document.createElement("div");
          div.className = "col-md-6 col-lg-4";
          div.innerHTML = `
            <div class="card h-100 shadow-sm">
              <img src="${b.hotel.imageUrl || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${b.hotel.name}">
              <div class="card-body">
                <h5 class="card-title">${b.hotel.name}</h5>
                <p class="card-text">City: ${b.hotel.city}</p>
                <p class="card-text">Price: ₹${b.amount}</p>
                <p class="card-text">Status: 
                  <span class="badge ${b.status === 'paid' ? 'bg-success' : 'bg-warning'}">
                    ${b.status}
                  </span>
                </p>
              </div>
            </div>
          `;
          container.appendChild(div);
        }

      } catch (err) {
        console.error("Failed to load bookings", err);
        alert("Could not load booking history.");
      }
    }

    window.onload = loadBookingHistory;