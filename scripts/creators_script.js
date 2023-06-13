document.addEventListener('DOMContentLoaded', function() {
    check()
}, false);

const navigateCreateBtn = document.getElementById('navigateCreateBtn');
const navigateVoteBtn = document.getElementById('navigateVoteBtn');
const navigateAccountBtn = document.getElementById('navigateAccountBtn');
const createVoteBtnElement = document.getElementById("createVoteBtn");
const datetimeSetterElement = document.getElementById("datetimeSetter");
const select = document.getElementById("candidatesList");
const selectVoters = document.getElementById("setsList");
const selectVotersPass = document.getElementById("setsListPass");
const finishCreateVoteBtn = document.getElementById("finishCreateVoteBtn");

let numberCountSetter;
let voteNamingElement;
let creatorsObjectInput;
let creatorsVoterInput;
let master;

const objectsBtn = document.getElementById("objectsBtn");
const votersBtn = document.getElementById("votersBtn");

navigateCreateBtn.onclick = navigateCreateCLick;
navigateVoteBtn.onclick = navigateVoteCLick;
navigateAccountBtn.onclick = navigateAccountClick;
createVoteBtnElement.onclick = requestNewChain;
finishCreateVoteBtn.onclick = navigatefinishCreateVoteBtn;

function navigatefinishCreateVoteBtn() {
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/viewCandidates", false);
    let dataCreators = {
        "master": master,
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(dataCreators));
    const toParseSecond = JSON.parse(req.responseText);
    if (voteNamingElement === undefined) {
        window.location.replace("personalAccount.html");
    } else {
        window.location.replace("personalAccount.html");
    }
}

objectsBtn.onclick = createCandidate;
votersBtn.onclick = createVoters;

function createCandidate(){
    console.log(master)
    creatorsObjectInput = document.getElementById("creatorsObjectInput").value;
    console.log(creatorsObjectInput)
    if (master !== undefined && master !== "") {
        if (creatorsObjectInput !== ""){
            const req = new XMLHttpRequest();
            req.open("POST", "http://localhost:8199/newCandidate", false);
            let data = {
                "description": creatorsObjectInput,
                "affiliation": master,
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
            if (toParse.error !== '' && toParse.error !== undefined) {
                alert("elections already exist")
            } else {
                if (toParse.electionsObject !== "") {
                    req.open("POST", "http://localhost:8199/viewCandidates", false);
                    let dataCreators = {
                        "master": master,
                        "auth": {
                            "login": getCookieValue("login"),
                            "password": getCookieValue("password")
                        }
                    }
                    console.log(dataCreators)
                    req.send(JSON.stringify(dataCreators));
                    const toParseSecond = JSON.parse(req.responseText);
                    console.log(toParseSecond.candidatesList.electionSubjects)
                    var delChild = select.lastChild;
                    while (delChild) {
                        select.removeChild(delChild);
                        delChild = select.lastChild;
                    }
                    for (index = 0; index < toParseSecond.candidatesList.electionSubjects.length; ++index) {
                        console.log(toParseSecond.candidatesList.electionSubjects[index]);
                        var li = document.createElement("li");
                        select.appendChild(document.createTextNode(toParseSecond.candidatesList.electionSubjects[index].Description));
                        select.appendChild(li);
                    }

                }
            }

        } else {
            alert("empty description")
        }
    } else {
        alert("empty voting")
    }
}
function createVoters(){
    creatorsVoterInput = document.getElementById("creatorsVoterInput").value;
    console.log(creatorsVoterInput)
    if (master !== undefined && master !== "") {
        const req = new XMLHttpRequest();
        req.open("POST", "http://localhost:8199/createVoters", false);
        let data = {
            "master": master,
            "voter": creatorsVoterInput,
            "auth": {
                "login": getCookieValue("login"),
                "password": getCookieValue("password")
            }
        }
        req.send(JSON.stringify(data));
        const toParse = JSON.parse(req.responseText);
        console.log(toParse)
        if (toParse.status === 'Access Denied') {
            alert("You are not entered to system")
        }
        if (toParse.voterObjects.length > 0) {
            var delChild = selectVoters.lastChild;
            while (delChild) {
                selectVoters.removeChild(delChild);
                delChild = selectVoters.lastChild;
            }
            for (index = 0; index < toParse.voterObjects.length; ++index) {
                console.log(toParse.voterObjects[index]);
                var li = document.createElement("li");
                selectVoters.appendChild(document.createTextNode(toParse.voterObjects[index].PublicKey.toLowerCase()));
                selectVoters.appendChild(li);
            }
            var delChildPass = selectVotersPass.lastChild;
            while (delChildPass) {
                selectVotersPass.removeChild(delChildPass);
                delChildPass = selectVotersPass.lastChild;
            }
            for (index = 0; index < toParse.identities.length; ++index) {
                console.log(toParse.voterObjects[index]);
                var li = document.createElement("li");
                selectVotersPass.appendChild(document.createTextNode(toParse.identities[index].toLowerCase()));
                selectVotersPass.appendChild(li);
            }
        }
    } else {
        alert("empty voting")
    }
}
function requestNewChain() {
    voteNamingElement = document.getElementById("voteNaming").value;
    numberCountSetter = document.getElementById("numberCountSetter").value;
    var delChildPass = selectVotersPass.lastChild;
    while (delChildPass) {
        selectVotersPass.removeChild(delChildPass);
        delChildPass = selectVotersPass.lastChild;
    }
    var delChild = select.lastChild;
    while (delChild) {
        select.removeChild(delChild);
        delChild = select.lastChild;
    }
    let now = new Date();
    if (voteNamingElement !== undefined && voteNamingElement.length >= 16 && numberCountSetter !== "" && datetimeSetterElement.value !== "" && Number(numberCountSetter) > 1) {
        let date = new Date(datetimeSetterElement.value);
        const req = new XMLHttpRequest();
        req.open("POST", "http://localhost:8199/newChain", false);
        let data = {
            "master": voteNamingElement,
            "count": Number(numberCountSetter),
            "limitTime": {
                "seconds": date.getTime(),
                "nanos": 0
            },
            "auth": {
                "login": getCookieValue("login"),
                "password": getCookieValue("password")
            }
        }
        master = voteNamingElement
        req.send(JSON.stringify(data));
        const toParse = JSON.parse(req.responseText);
        console.log(toParse)
        if (toParse.status === 'Access Denied') {
            alert("You are not entered to system")
        }
        if (toParse.error === 'affiliation already exist') {
            alert("voting already exist")
        }
        // if (toParse.partOfChain.CreateHelpProto.Status !== "") {
        //     console.log(toParse.partOfChain.CreateHelpProto.Status)
        //     window.location.replace("personalAccount.html");
        // }
    }
    else {
        if (voteNamingElement === "") {
            alert("empty name")
        }
        if (numberCountSetter  === "") {
            alert("invalid count")
        }
        if (datetimeSetterElement.value  === "") {
            alert("empty date")
        }
        if (Number(numberCountSetter) < 1) {
            alert("count is too small")
        }
        if (datetimeSetterElement.value < now) {
            alert("date is unavailable")
        }
        if (voteNamingElement.length < 16) {
            alert("naming length is too small")
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
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/viewCandidates", false);
    let dataCreators = {
        "master": master,
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(dataCreators));
    const toParseSecond = JSON.parse(req.responseText);
    if (voteNamingElement === undefined) {
        window.location.replace("creators.html");
    } else {
        window.location.replace("creators.html");
    }
    return false;
}
function navigateVoteCLick() {
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/viewCandidates", false);
    let dataCreators = {
        "master": master,
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(dataCreators));
    const toParseSecond = JSON.parse(req.responseText);
    if (voteNamingElement === undefined) {
        window.location.replace("authVoting.html");
    } else {
        window.location.replace("authVoting.html");
    }
    return false;
}
function navigateAccountClick() {
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/viewCandidates", false);
    let dataCreators = {
        "master": master,
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(dataCreators));
    const toParseSecond = JSON.parse(req.responseText);
    if (voteNamingElement === undefined) {
        window.location.replace("personalAccount.html");
    } else {
        window.location.replace("personalAccount.html");
    }
    return false;
}

