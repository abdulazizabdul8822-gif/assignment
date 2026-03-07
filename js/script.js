
const loginBtn = document.getElementById("loginBtn");


if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        const userName = document.getElementById("inputUsername").value;
        const pin = document.getElementById("inputPin").value;

        if (userName === "admin" && pin === "123") {
            alert("Login Success");
            window.location.href = "home.html";
        } else {
            alert("Login Failed");
        }
    });
}