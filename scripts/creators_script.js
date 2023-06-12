document.addEventListener('DOMContentLoaded', function() {
    check()
}, false);


const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const createVoteBtnElement = document.getElementById("createVoteBtn");
const numberCountSetterElement = document.getElementById("numberCountSetter");
const voteNamingElement = document.getElementById("voteNaming");
const datetimeSetterElement = document.getElementById("datetimeSetter");

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;
createVoteBtnElement.onclick = requestNewChain;


function requestNewChain() {
    if (voteNamingElement.innerHTML !== "" || numberCountSetterElement.innerHTML !== "" || datetimeSetterElement.value !== "" && Number(numberCountSetterElement.innerHTML) > 1) {
        console.log(datetimeSetterElement.value)
        console.log(typeof datetimeSetterElement.value)
        let date = new Date(datetimeSetterElement.value);
        const req = new XMLHttpRequest();
        req.open("POST", "http://localhost:8199/newChain", false);
        let data = {
            "master": voteNamingElement.innerHTML,
            "count": Number(numberCountSetterElement.innerHTML),
            "limitTime": {
                "seconds": date.getTime(),
                "nanos": 0
            },
            "auth": {
                "login": getCookieValue("login"),
                "password": getCookieValue("password")
            }
        }
        req.send(JSON.stringify(data));
        const toParse = JSON.parse(req.responseText);
        if (toParse.status === 'Access Denied') {
            alert("You are not entered to system")
        }
        if (toParse.partOfChain.CreateHelpProto.Status !== "") {
            console.log(toParse.partOfChain.CreateHelpProto.Status)
            window.location.replace("personalAccount.html");
        }
    }
    else {
        if (voteNamingElement.innerHTML === "") {
            alert("empty name")
        }
        if (numberCountSetterElement.innerHTML  === "") {
            alert("invalid count")
        }
        if (datetimeSetterElement.value  === "") {
            alert("empty date")
        }
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
function navigateAccountClick() {
    window.location.replace("personalAccount.html");
    return false;
}

