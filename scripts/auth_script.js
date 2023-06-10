document.addEventListener('DOMContentLoaded', function() {
    check()
}, false);

let valLogin
let valPassword

submitBasicAuthBtn.onclick = baseAuthCLick;

function baseAuthCLick() {
    valLogin = document.getElementById('loginInput').value;
    valPassword = document.getElementById('passwordInput').value;

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/check", false);
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