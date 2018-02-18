'use strict'

var button = document.getElementById('button');
var nameContent = document.getElementById('name-content');
var surnameContent = document.getElementById('surname-content');
var dataContent = document.getElementById('data-content');
var peselContent = document.getElementById('pesel')
//imie
button.addEventListener('click', function (e) {

    if (nameContent.value.match(/^[a-ząśżźćęółń]/i) == null) {
        e.preventDefault;
        nameContent.setCustomValidity('Powinieneś wpisać imię!');
    } else {
        nameContent.setCustomValidity('');
    }
});


button.addEventListener('click', function (e) {
    if (nameContent.value.length > 40) {
        nameContent.setCustomValidity('Zbyt duża ilość znaków!');
        return false
    }
});


//nazwisko

button.addEventListener('click', function (e) {

    if (surnameContent.value.match(/^[a-ząśżźćęółń]/i) == null) {
        e.preventDefault;
        surnameContent.setCustomValidity('Powinieneś wpisać nazwisko!');
    } else {
        surnameContent.setCustomValidity('');
    }
});


button.addEventListener('click', function (e) {
    if (surnameContent.value.length > 40) {
        surnameContent.setCustomValidity('Zbyt duża ilość znaków!');
        return false
    }
});



function checkPesel(pesel) {
    //data
    var year = parseInt(pesel.substring(0, 2), 10);
    var month = parseInt(pesel.substring(2, 4), 10) - 1;
    var day = parseInt(pesel.substring(4, 6), 10);

    if (month > 80) {
        year += 1800;
        month = month - 80;
    } else if (month >= 60) {
        year += 2200;
        month = month - 60;
    } else if (month >= 40) {
        year += 2100;
        month = month - 40;
    } else if (month >= 20) {
        year += 2000;
        month = month - 20;
    } else {
        year += 1900;
    }

    var dateOfBirth = new Date();
    dateOfBirth.setFullYear(year, month, day);

    //PESEL
    var wagi = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7];
    var sum = 0;

    for (var i = 0; i < wagi.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1), 10) * wagi[i]);
    }

    sum = sum % 10;

    var cyfraKontr = parseInt(pesel.substring(10, 11), 10);
    var poprawnosc = (sum === cyfraKontr);


    return {
        valid: poprawnosc,
        date: dateOfBirth
    };
}

var resultToCheck;

$('#button-check').bind('click', function (e) {

    e.preventDefault();

    var numerPesel = $("#pesel").val();
    resultToCheck = checkPesel(numerPesel)

    if (resultToCheck.valid) {
        $('#result').html('poprawność: OK');
    } else {
        $('#result').html('poprawność: ERROR');
    }

    dataContent.valueAsDate = resultToCheck.date;

});


button.addEventListener('click', function (e) {

    if (resultToCheck && resultToCheck.valid === false) {
        e.preventDefault;
        peselContent.setCustomValidity('Powinieneś wpisać poprawny pesel');
    } else {
        nameContent.setCustomValidity('');
    }
});

// wyświetlenie danych

function showData() {
    var displayName = document.getElementById('name-box');
    displayName.textContent = "Imię: " + nameContent.value;

    var displaySurname = document.getElementById('surname-box');
    displaySurname.textContent = "Nazwisko: " + surnameContent.value;

    var displayPesel = document.getElementById('pesel-box');
    displayPesel.textContent = "Pesel: " + peselContent.value;

    var displayData = document.getElementById('data-box');
    displayData.textContent = "Data urodzenia: " + dataContent.value;

}

button.addEventListener('click', showData);

//wyświetlenie danych w konsoli z url

var url_string = window.location.href; 
var url = new URL(url_string);
var imie = url.searchParams.get("imie");
var surname = url.searchParams.get("surname");
var pesel = url.searchParams.get("pesel");
var data = url.searchParams.get("data");


//

console.log(imie);
console.log(surname);
console.log(pesel);
console.log(data);