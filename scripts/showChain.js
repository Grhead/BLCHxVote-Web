document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);
window.addEventListener('load', () => {
    const currentHash = document.getElementById('currentHash');
    const previousHash = document.getElementById('previousHash');
    const dateTime = document.getElementById('dateTime');
    const BalanceMap = document.getElementById('BalanceMap');
    const Nonce = document.getElementById('Nonce');
    // check()
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/getPart", false);
    let data = {
        "master": getCookieValue("masterChain"),
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    thisElement = toParse.partOfChain.blocks.length-1
    currentHash.innerHTML = toParse.partOfChain.blocks[thisElement].CurrHash;
    previousHash.innerHTML = toParse.partOfChain.blocks[thisElement].PrevHash;
    dateTime.innerHTML = new Date(toParse.partOfChain.blocks[thisElement].TimeStamp.seconds);
    console.log(toParse.partOfChain.blocks[thisElement].BalanceMap)
    var txt;
    var x;
    for (x in toParse.partOfChain.blocks[thisElement].BalanceMap) {
        txt += x + " " + toParse.partOfChain.blocks[thisElement].BalanceMap[x] + ": " + "\n";
    }
    BalanceMap.innerHTML = txt.replace('undefined','');
    Nonce.innerHTML = "GENERIC";
    //Nonce.innerHTML = toParse.partOfChain.blocks[0].Nonce.replace('undefined','');
});

const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');

const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const currentHash = document.getElementById('currentHash');
const previousHash = document.getElementById('previousHash');
const dateTime = document.getElementById('dateTime');
const BalanceMap = document.getElementById('BalanceMap');
const Nonce = document.getElementById('Nonce');

let thisElement;

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;

backBtn.onclick = backBtnClick;
forwardBtn.onclick = forwardBtnClick;

function backBtnClick() {
    console.log(thisElement)
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/getPart", false);
    let data = {
        "master": getCookieValue("masterChain"),
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    if (thisElement+1 !== toParse.partOfChain.blocks.length) {
        thisElement += 1;
        Nonce.innerHTML = "GENERIC";
    }
    currentHash.innerHTML = toParse.partOfChain.blocks[thisElement].CurrHash;
    previousHash.innerHTML = toParse.partOfChain.blocks[thisElement].PrevHash;
    dateTime.innerHTML = new Date(toParse.partOfChain.blocks[thisElement].TimeStamp.seconds);
    console.log(toParse.partOfChain.blocks[thisElement].BalanceMap)
    var txt;
    var x;
    for (x in toParse.partOfChain.blocks[thisElement].BalanceMap) {
        txt += x + " " + toParse.partOfChain.blocks[thisElement].BalanceMap[x] + ": " + "\n";
    }
    BalanceMap.innerHTML = txt.replace('undefined','');
    return false;
}
function forwardBtnClick() {
    console.log(thisElement)
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/getPart", false);
    let data = {
        "master": getCookieValue("masterChain"),
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(data));
    const toParse = JSON.parse(req.responseText);
    if (thisElement-1 >= 0) {
        thisElement -= 1;
    }
    currentHash.innerHTML = toParse.partOfChain.blocks[thisElement].CurrHash;
    previousHash.innerHTML = toParse.partOfChain.blocks[thisElement].PrevHash;
    dateTime.innerHTML = new Date(toParse.partOfChain.blocks[thisElement].TimeStamp.seconds);
    console.log(toParse.partOfChain.blocks[thisElement].BalanceMap)
    var txt;
    var x;
    for (x in toParse.partOfChain.blocks[thisElement].BalanceMap) {
        txt += x + " " + toParse.partOfChain.blocks[thisElement].BalanceMap[x] + ": " + "\n";
    }
    BalanceMap.innerHTML = txt.replace('undefined','');
    Nonce.innerHTML = toParse.partOfChain.blocks[thisElement].Nonce;
    return false;
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