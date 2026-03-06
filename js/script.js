document.getElementById("loginBtn").addEventListener("click", function(){
    const inputUsername = document.getElementById("inputUsername");
    const userName = inputUsername.value;
    console.log(userName);

    const inputPin = document.getElementById("inputPin");
    const pin = inputPin.value;
    console.log(pin);


    if(userName == "admin" && pin == "123"){
        alert("Login Success");
        window.location.assign("/home.html");
    } else{
        alert("Login Failed");
        return;
    }
});