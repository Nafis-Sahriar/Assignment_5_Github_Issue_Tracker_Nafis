console.log("LogIn JS Running");


document.getElementById('btn-login').addEventListener('click', function () {

    const inputUsername = document.getElementById('login-username').value;

    const inputPass = document.getElementById('login-password').value;

    // console.log(inputUsername, inputPass);

   if (inputUsername === 'admin' && inputPass === 'admin123') 
    {
        window.location.href = "./home.html";
    }

    else
    {
        alert("Incorrect Credentials : Username: admin Password : admin123");
        return;
    }

});