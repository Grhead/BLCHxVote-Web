document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);
// window.addEventListener('load', () => {
//     check()
// });

document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);
const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const navigateRegisterVotingBtn = document.getElementById('submitBasicRegBtn');
const SubmitRegisterVotingBtn = document.getElementById('submitAuthBtn');

let valIdentity;
let valPublicKey;
let valSalt;

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;
navigateRegisterVotingBtn.onclick = baseRegTransCLick;
SubmitRegisterVotingBtn.onclick = newRegisterVotingUser;

function newRegisterVotingUser() {
    valIdentity = document.getElementById('txtIdentification').value;
    valPublicKey = document.getElementById('txtAreaPrivateReg').value;
    valSalt = document.getElementById('txtSalt').value;

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/acceptNew", false);

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
        document.cookie = "valPublicKey=" + valPublicKey + "; path=/";
        document.cookie = "privateKey=" + toParse.acceptNewUserHelpResponse.privateKey + "; path=/";
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
function navigateAccountClick() {
    window.location.replace("personalAccount.html");
    return false;
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
function check() {
    if (getCookieValue("login") !== undefined && getCookieValue("login") !== null) {
        window.location.replace("authVoting.html");
    } else {
        window.location.replace("index.html");
    }
}