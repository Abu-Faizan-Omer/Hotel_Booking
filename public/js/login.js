console.log("this is login page");
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        const loginDetails = {
            email: event.target.email.value,
            password: event.target.password.value,
             adminEmail: event.target.adminemail.value // optional
        };

        console.log("loginDetails", loginDetails);

        const response = await axios.post("http://localhost:3000/user/login", loginDetails);

        if (response.status === 200) {
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);

            const oldFilterData = localStorage.getItem("searchFilter");
            if (oldFilterData) {
                localStorage.removeItem("searchFilter");
            }

            if (response.data.isAdmin) {
                window.location.href = "./admin";
            } else {
                window.location.href = "./hotel";
            }
        }

    } catch (err) {
        console.log('err in login', err);
        document.body.innerHTML += `<div style="color:red;">${err.response ? err.response.data.message : 'Login failed'}</div>`;
    }
});
