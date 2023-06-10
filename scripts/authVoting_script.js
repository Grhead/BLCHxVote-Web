document.addEventListener('DOMContentLoaded', function() {
    check()
}, false);

let navigateCreateBtn = document.getElementById('navigateCreateBtn');
let navigateVoteBtn = document.getElementById('navigateVoteBtn');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;

// function navigateCreateCLick(){
//     window.location.replace("creators.html");
//     return false;
// }
//
// function navigateVoteCLick(){
//     window.location.replace("authVoting.html");
//     return false;
// }


function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    const res = cookies.find(c => c.startsWith(name + '='));
    if (res) {
        return res.substring(res.indexOf('=') + 1);
    }
}
function check() {
    if (getCookieValue("login") !== undefined) {
        window.location.replace("authVoting.html");
    } else {
        window.location.replace("index.html");
    }
}