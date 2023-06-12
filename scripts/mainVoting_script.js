document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);

let navigateCreateBtn = document.getElementById('navigateCreateBtn');
let navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');


navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;

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
