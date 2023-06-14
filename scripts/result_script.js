document.addEventListener('DOMContentLoaded', function () {
    check()
}, false);
// window.addEventListener('load', () => {
//     check()
// });

window.addEventListener('load', () => {
    check()
    const navigateCreateBtn = document.getElementById('navigateCreateBtn');
    const navigateVoteBtn = document.getElementById('navigateVoteBtn');
    const navigateAccountBtn = document.getElementById('navigateAccountBtn');
    const soloWinnerTag = document.getElementById('soloWinnerTag');
    navigateCreateBtn.onclick = navigateCreateCLick;
    navigateVoteBtn.onclick = navigateVoteCLick;
    navigateAccountBtn.onclick = navigateAccountClick;
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8199/list", false);
    let dataCreators = {
        "master": getCookieValue("masterChain"),
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(dataCreators));
    const toParseSecond = JSON.parse(req.responseText);
    let delChild= [];
    // while (delChild) {
    //     select.removeChild(delChild);
    //     delChild = select.lastChild;
    // }
    console.log(toParseSecond.winnersList)
    for (let index = 0; index < toParseSecond.winnersList.electionList.length; ++index) {
        delChild[index] = toParseSecond.winnersList.electionList[index].electionSubjects.Description;
    }
    let delChild2= [];
    for (let index = 0; index < toParseSecond.winnersList.electionList.length; ++index) {
        delChild2[index] = toParseSecond.winnersList.electionList[index].Balance;
    }
    let ctx = document.getElementById('myChart').getContext('2d');
    const dataSales2020 = {
        label: "Результаты голосования",
        data: delChild2, // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Цвет фона
        borderColor: 'rgba(54, 162, 235, 1)', // Цвет границ
        borderWidth: 1,// Толщина границ
    };
    new Chart(ctx, {
        type: 'bar',// Тип графики - изменяем тип здесь.
        data: {
            labels: delChild,
            datasets: [
                dataSales2020,
                // Больше данных ...
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
            },
            responsive: false,
        }
    });
    req.open("POST", "http://localhost:8199/solo", false);
    let dataCreatorsList = {
        "master": getCookieValue("masterChain"),
        "auth": {
            "login": getCookieValue("login"),
            "password": getCookieValue("password")
        }
    }
    req.send(JSON.stringify(dataCreatorsList));
    const toParseThird = JSON.parse(req.responseText);
    console.log(toParseThird.soloWinnerObject)
    console.log(toParseThird.soloWinnerObject.soloWinnerObject.electionSubjects.Description)
    soloWinnerTag.innerHTML = toParseThird.soloWinnerObject.soloWinnerObject.electionSubjects.Description

});

function check() {
    if (getCookieValue("login") !== undefined) {
        //window.location.replace("resultPage.html");
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