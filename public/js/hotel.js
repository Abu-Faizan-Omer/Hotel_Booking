console.log("this is hotels search page");

async function searchHotels() {
    const city = document.getElementById("cityInput").value;
    const token = localStorage.getItem("token");

    try {
         const url = city 
    ? `http://localhost:3000/hotel/search?city=${city}` 
    : `http://localhost:3000/hotel/all`;


        const response = await axios.get(url, {
            headers: { Authorization: token }
        });

        const hotelList = document.getElementById("hotelList");
        hotelList.innerHTML = "";

        for (const hotel of response.data.hotels) {
            const reviewRes = await axios.get(`http://localhost:3000/review/hotel/${hotel.id}`);
            const reviews = reviewRes.data.reviews;

            // const avgRating = reviews.length
            //     ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            //     : "No rating";
            let avgRating = "No rating";
            if (reviews.length > 0) {
            let total = 0;
            for (let r of reviews) {
                total += r.rating;
            }
            avgRating = (total / reviews.length).toFixed(1);
            }

                //star
            const reviewHTML = reviews.map(r =>
                `<li><strong>${r.rating}★</strong> - ${r.comment}</li>`).join("");

            const reviewListId = `reviews-${hotel.id}`;

            const div = document.createElement("div");
            div.classList.add("hotel-card");
            div.innerHTML = `
                <div class="hotel-header">
                    <h3>${hotel.name}</h3>
                    <span class="rating-badge">${avgRating}★</span>
                </div>
                <div class="hotel-image">
                <img src="${hotel.imageUrl || 'default_image_url.jpg'}" alt="${hotel.name}" class="img-fluid" />
                </div>
                <p>${hotel.description}</p>
                <p>City: ${hotel.city} | Price: ₹${hotel.price}</p>
                <button onclick="bookHotel(${hotel.id}, ${hotel.price})">Book</button>
                <button onclick="toggleReviews('${reviewListId}')">Comments</button>
                <ul id="${reviewListId}" class="review-list" style="display: none;">${reviewHTML}</ul>
            `;
            hotelList.appendChild(div);
        }

    } catch (err) {
        console.error("Error fetching hotels", err);
        alert("Could not load hotels");
    }
}

function toggleReviews(listId) {
    const el = document.getElementById(listId);
    el.style.display = el.style.display === "none" ? "block" : "none";
}


async function bookHotel(hotelId, price) {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(`http://localhost:3000/booking/create/${hotelId}`, {
            amount: price
        }, {
            headers: { Authorization: token }
        });

        console.log("Booking response:", response.data);

        const { key, orderId } = response.data;

        if (!key || !orderId) {
            throw new Error("Missing key or orderId in response");
        }

        const options = {
            key,
            amount: price * 100,
            currency: "INR",
            order_id: orderId,
            handler: function (response) {
                alert("Payment successful!");
                console.log("Payment ID:", response.razorpay_payment_id);

                //  Confirm payment to backend
                axios.post("http://localhost:3000/booking/verify", {
                    razorpay_order_id: orderId,
                    razorpay_payment_id: response.razorpay_payment_id
                }, {
                    headers: { Authorization: token }
                })
                .then(() => {
                    //  Now allow review UI
                    const reviewDiv = document.createElement("div");
                    reviewDiv.innerHTML = `
                        <h4>Leave a Review</h4>
                        <label>Rating (1-5): <input id="ratingInput" type="number" min="1" max="5"></label><br>
                        <label>Comment: <input id="commentInput" type="text"></label><br>
                        <button onclick="submitReview(${hotelId})">Submit Review</button>
                    `;
                    document.body.appendChild(reviewDiv);
                })
                .catch(err => {
                    console.error("Failed to verify payment:", err);
                    alert("Could not verify payment");
                });
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

    } catch (err) {
        console.error("Booking error", err);
        alert("Booking failed");
    }
}


async function submitReview(hotelId) {
    const rating = document.getElementById("ratingInput").value;
    const comment = document.getElementById("commentInput").value;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(`http://localhost:3000/review/add/${hotelId}`, {
            rating,
            comment
        }, {
            headers: { Authorization: token }
        });

        alert("Review submitted successfully!");
    } catch (err) {
        console.error("Error submitting review", err);
        alert("Could not submit review");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    searchHotels();
});
