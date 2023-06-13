document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);

const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateRegisterVotingBtn = document.getElementById('submitBasicRegBtn');
const submitBasicAuthBtn = document.getElementById('submitAuthBtn');

navigateAccountBtn.onclick = navigateAccountClick;
navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateRegisterVotingBtn.onclick = baseRegTransCLick;
submitBasicAuthBtn.onclick = VotingAuth;

let valPublicKey;
let valPrivateKey;


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
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    if (toParse.error === 'rpc error: code = Unknown desc = invalid master voting') {
        alert("invalid Public or Private Key")
    }
    if (toParse.status === 'Access Denied') {
        alert("You are not entered to system")
    }
    console.log(toParse.acceptLoadUserResponse)
    if (toParse.acceptLoadUserResponse !== "") {
        document.cookie = "valPublicKey=" + valPublicKey + "; path=/";
        document.cookie = "masterChain=" + toParse.acceptLoadUserResponse.Affiliation + "; path=/";
        window.location.replace("mainVoting.html");
    }
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
function navigateAccountClick() {
    window.location.replace("personalAccount.html");
    return false;
}
