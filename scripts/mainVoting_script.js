document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);


// window.addEventListener('load', () => {
//     check()
// });

window.addEventListener('load', () => {
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/viewCandidates", false);
    let dataCreators = {
        "master": getCookieValue("masterChain"),
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(dataCreators));
    const toParseSecond = JSON.parse(req.responseText);
    let delChild= select.lastChild;
    while (delChild) {
        select.removeChild(delChild);
        delChild = select.lastChild;
    }
    for (let index = 0; index < toParseSecond.candidatesList.electionSubjects.length; ++index) {
        console.log(toParseSecond.candidatesList.electionSubjects[index]);
        let opt = document.createElement('option');
        opt.value = toParseSecond.candidatesList.electionSubjects[index].Description;
        opt.innerHTML = toParseSecond.candidatesList.electionSubjects[index].Description;
        select.appendChild(opt);
    }
});

const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const letsVote = document.getElementById('letsVote');
const select = document.getElementById("objectsList");

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;
letsVote.onclick = letsVoteClick;

function letsVoteClick() {
    let objectIdOfDescription;
    let value = select.value;
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/viewCandidates", false);
    let data = {
        "master": getCookieValue("masterChain"),
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    for (let index = 0; index < toParse.candidatesList.electionSubjects.length; ++index) {
        console.log(toParse.candidatesList.electionSubjects[index]);
        if (toParse.candidatesList.electionSubjects[index].Description === value) {
            objectIdOfDescription = toParse.candidatesList.electionSubjects[index]
            alert("THIS")
        }
    }

    req.open("POST", "http://localhost:8199/vote", false);
    let dataCreators = {
        "sender": getCookieValue("valPublicKey"),
        "receiver": value,
        "master": getCookieValue("masterChain"),
        "num": 1,
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    //TODO create VOTE handler
    req.send(JSON.stringify(dataCreators));
    const toParseSecond = JSON.parse(req.responseText);
    if (toParseSecond.error === undefined) {
        alert("Успешно")
        window.location.replace("showChain.html");
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

function check() {
    console.log(getCookieValue("login"))
    alert(getCookieValue("login"))
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
