console.log("this is signup page");
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        const userDetails = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            adminEmail: event.target.adminemail.value, 
        };

        console.log("signupDetails", userDetails);

        const response = await axios.post("http://localhost:3000/user/signup", userDetails);

        if (response.status === 201) {
            alert("Signup successful! Please login.");
            window.location.href = "./login";
        }

    } catch (err) {
        console.log("Signup error", err);
        document.body.innerHTML += `<div style="color:red;">${err.response ? err.response.data.message : 'Signup failed'}</div>`;
    }
});
