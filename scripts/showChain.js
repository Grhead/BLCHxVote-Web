// document.addEventListener('DOMContentLoaded', function () {
//     check()
// }, false);
window.addEventListener('load', () => {
    // check()
    const mainChain = document.getElementById('mainChain');

});

const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');

const currentHash = document.getElementById('currentHash');
const previousHash = document.getElementById('previousHash');
const dateTime = document.getElementById('dateTime');
const BalanceMap = document.getElementById('BalanceMap');
const Nonce = document.getElementById('Nonce');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;



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
    if (getCookieValue("login") !== undefined) {
        //window.location.replace("resultPage.html");
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



















// 127.0.0.1:8199/getPart