const submitBasicAuthBtn = document.getElementById('submitBasicAuthBtn');
let valLogin
let valPassword
let valPasswordSecond
submitBasicAuthBtn.onclick = baseAuthCLick;

function baseAuthCLick(){
    valLogin = document.getElementById('loginInput').value;
    valPassword = document.getElementById('passwordInput').value;
    valPasswordSecond = document.getElementById('passwordInputSecond').value;

    const req = new XMLHttpRequest();
    if (valPassword === valPasswordSecond) {
        req.open("POST", "http://localhost:8199/register", false);
        let data = {
            "login": valLogin,
            "password": valPassword
        }
        req.send(JSON.stringify(data));
        const toParse = JSON.parse(req.responseText);
        if (toParse.status === "Succeed") {
            document.cookie = "login" + "=" + valLogin + ";" +
                "password" + "=" + valPassword + ";" +
                "path=/";
            window.location.replace("authVoting.html");
            return false;
        } else {
            alert("Smt wrong_1")
            return false;
        }
    } else {
        alert("Smt wrong_2")
        return false;
    }
}
function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    const res = cookies.find(c => c.startsWith(name + '='));
    if (res) {
        return res.substring(res.indexOf('=') + 1);
    }
}