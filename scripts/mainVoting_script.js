document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);

let navigateCreateBtn = document.getElementById('navigateCreateBtn');
let navigateVoteBtn = document.getElementById('navigateVoteBtn');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;

function navigateCreateCLick() {
    window.location.replace("creators.html");
    return false;
}

function navigateVoteCLick() {
    window.location.replace("authVoting.html");
    return false;
}
