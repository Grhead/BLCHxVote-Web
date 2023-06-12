document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);
const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateRegisterVotingBtn = document.getElementById('submitBasicRegBtn');
const SubmitRegisterVotingBtn = document.getElementById('submitAuthBtn');

let valIdentity;
let valPublicKey;
let valSalt;

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateRegisterVotingBtn.onclick = baseRegTransCLick;
SubmitRegisterVotingBtn.onclick = newRegisterVotingUser;

function newRegisterVotingUser() {
    valIdentity = document.getElementById('txtIdentification').value;
    valPrivateKey = document.getElementById('txtAreaPrivate').value;
    valSalt = document.getElementById('txtSalt').value;

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/acceptLoad", false);

    let data = {
        "pass": valIdentity,
        "publicKey": valPublicKey,
        "salt": valSalt,
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    // if (toParse.error === 'rpc error: code = Unknown desc = invalid master voting') {
    //     alert("invalid Public or Private Key")
    // }
    if (toParse.status === 'Access Denied') {
        alert("You are not entered to system")
    }
    if (toParse.acceptNewUserHelpResponse !== undefined) {
        document.cookie = "privateKey=" + toParse.acceptNewUserHelpResponse + "; path=/";
        window.location.replace("personalAccount.html");
    }
}

function baseRegTransCLick() {
    window.location.replace("authVoting.html");
    return false;
}

function navigateCreateCLick() {
    window.location.replace("creators.html");
    return false;
}

function navigateVoteCLick() {
    window.location.replace("authVoting.html");
    return false;
}

function check() {
    if (getCookieValue("login") !== undefined) {
        window.location.replace("authVoting.html");
    } else {
        window.location.replace("index.html");
    }
}