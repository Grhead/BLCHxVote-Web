const submitBasicRegBtn = document.getElementById('submitBasicRegBtn');
document.addEventListener('DOMContentLoaded', function() {
    check()
}, false);

let valLogin
let valPassword

submitBasicAuthBtn.onclick = baseAuthCLick;
submitBasicRegBtn.onclick = baseRegTransCLick;

function baseAuthCLick() {
    valLogin = document.getElementById('loginInputAuth').value;
    valPassword = document.getElementById('passwordInputAuth').value;
    console.log(valLogin)
    console.log(valPassword)
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/check", false);
    let data = {
        "login": valLogin,
        "password": valPassword
    }
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    if (toParse.status === true) {
        document.cookie = "login=" + valLogin + "; path=/";
        document.cookie = "password=" + valPassword + "; path=/";
        window.location.replace("authVoting.html");
        return false;
    } else {
        alert("Smt wrong_1")
        return false;
    }

}

function baseRegTransCLick() {
    window.location.replace("register.html");
    return false;
}

function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    const res = cookies.find(c => c.startsWith(name + '='));
    if (res) {
        return res.substring(res.indexOf('=') + 1);
    }
}
function check() {
    if (getCookieValue("login") !== undefined) {
        window.location.replace("authVoting.html");
    } else {
        window.location.replace("index.html");
    }
}