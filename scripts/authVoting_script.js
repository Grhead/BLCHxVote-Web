document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);

const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateRegisterVotingBtn = document.getElementById('submitBasicRegBtn');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateRegisterVotingBtn.onclick = baseRegTransCLick;

let valPublicKey;
let valPrivateKey;
const submitBasicAuthBtn = document.getElementById('submitAuthBtn');

submitBasicAuthBtn.onclick = VotingAuth;

function VotingAuth() {
    valPublicKey = document.getElementById('txtAreaPublic').value;
    valPrivateKey = document.getElementById('txtAreaPrivate').value;

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/acceptLoad", false);
    let data = {

        "publicKey": valPublicKey,
        "privateKey": valPrivateKey,
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    console.log(data)
    console.log(document.cookie)
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    if (toParse.error === 'rpc error: code = Unknown desc = invalid master voting') {
        alert("invalid Public or Private Key")
    }
    // if () {
    //
    // }
}

function getCookieValue(name) {
    let name_cook = name + "=";
    let spl = document.cookie.split(";");
    for (let i = 0; i < spl.length; i++) {
        let c = spl[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(name_cook) === 0) {
            return c.substring(name_cook.length, c.length);
        }
    }
    return null;
}

function baseRegTransCLick() {
    window.location.replace("registerVoting.html");
    return false;
}

function check() {
    if (getCookieValue("login") !== undefined) {
        window.location.replace("authVoting.html");
    } else {
        window.location.replace("index.html");
    }
}

function navigateCreateCLick() {
    window.location.replace("creators.html");
    return false;
}

function navigateVoteCLick() {
    window.location.replace("authVoting.html");
    return false;
}