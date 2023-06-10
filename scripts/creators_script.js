let navigateCreateBtn = document.getElementById('navigateCreateBtn');
let navigateVoteBtn = document.getElementById('navigateVoteBtn');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;

function navigateCreateCLick(){
    window.location.href = 'creators.html';
    return false;
}

function navigateVoteCLick(){
    window.location.href = 'authVoting.html';
    return false;
}
