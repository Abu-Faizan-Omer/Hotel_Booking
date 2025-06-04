console.log("this is admin page");
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        const hotelDetails = {
            name: event.target.name.value,
            city: event.target.city.value,
            description: event.target.description.value,
            price: event.target.price.value
        };

        console.log("hotelDetails", hotelDetails);

        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/admin/addhotel", hotelDetails, {
            headers: { Authorization: token }
        });

        if (response.status === 201) {
            alert("Hotel added successfully!");
        }

    } catch (err) {
        console.log("Error in admin add hotel", err);
        alert("Failed to add hotel");
    }
});
