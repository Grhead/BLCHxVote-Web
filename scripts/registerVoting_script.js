document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);
const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateRegisterVotingBtn = document.getElementById('submitBasicRegBtn');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateRegisterVotingBtn.onclick = baseRegTransCLick;


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