document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);


// window.addEventListener('load', () => {
//     check()
// });

const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const voteFromAccount = document.getElementById('voteFromAccount');


const PublicKeyFieldProfile = document.getElementById('PublicKeyFieldProfile');
const PrivateKeyFieldProfile = document.getElementById('PrivateKeyFieldProfile');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;
PrivateKeyFieldProfile.onclick = showPrivate;
voteFromAccount.onclick = navigateVoteCLick;

// let pop = document.getElementById("privateKeyField");
// pop.innerHTML = "Привет, Мир!" +"<br/>";
// pop.innerHTML += "Сказал Джек и поднял ошейник" +"<br/>";
// pop.innerHTML += "своего Дога" +"<br/>";
PublicKeyFieldProfile.innerHTML = getCookieValue("valPublicKey")
PrivateKeyFieldProfile.innerHTML = "СКРЫТО"

function showPrivate() {
    console.log(getCookieValue("privateKey"))
    PrivateKeyFieldProfile.innerHTML = getCookieValue("privateKey")
}

function check() {
    if (getCookieValue("login") !== undefined) {
        window.location.replace("authVoting.html");
    } else {
        window.location.replace("index.html");
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
