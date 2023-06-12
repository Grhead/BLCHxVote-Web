document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);

const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');

navigateAccountBtn.onclick = navigateAccountClick;

let pop = document.getElementById("privateKeyField");
pop.innerHTML = "Привет, Мир!" +"<br/>";
pop.innerHTML += "Сказал Джек и поднял ошейник" +"<br/>";
pop.innerHTML += "своего Дога" +"<br/>";


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