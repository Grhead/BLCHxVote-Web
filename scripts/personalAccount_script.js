document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);

window.addEventListener('load', () => {
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/history", false);
    let dataCreators = {
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
    console.log(toParseSecond)
    if (toParseSecond.historyList !== null) {
        for (let index = 0; index < toParseSecond.historyList.length; ++index) {
            let opt = document.createElement('option');
            opt.value = toParseSecond.historyList[index].master + "\n" +
                toParseSecond.historyList[index].size + "\n" +
                toParseSecond.historyList[index].effectivity.toString() + "\n"
                toParseSecond.historyList[index].soloWinner;
            opt.innerHTML = toParseSecond.historyList[index].master + "\n" +
                toParseSecond.historyList[index].size + "\n" +
                toParseSecond.historyList[index].effectivity.toString() + "\n" +
                toParseSecond.historyList[index].soloWinner;
            select.appendChild(opt);
        }
    } else {
        let opt = document.createElement('option');
        opt.value = "У вас ещё нет истории"
        opt.innerHTML = "У вас ещё нет истории";
        select.appendChild(opt);
    }

});

const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const voteFromAccount = document.getElementById('voteFromAccount');
const select = document.getElementById("votingList");

const PublicKeyFieldProfile = document.getElementById('PublicKeyFieldProfile');
const PrivateKeyFieldProfile = document.getElementById('PrivateKeyFieldProfile');

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;
PrivateKeyFieldProfile.onclick = showPrivate;
voteFromAccount.onclick = navigateVoteCLick;

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
