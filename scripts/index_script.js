const submitBasicAuthBtn = document.getElementById('submitBasicAuthBtn');

submitBasicAuthBtn.onclick = baseAuthCLick;

function baseAuthCLick(){
    let valLogin = document.getElementById('loginInput').value;
    let valPassword = document.getElementById('passwordInput').value;
    alert(valLogin);
    alert(valPassword)
}