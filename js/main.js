'use strict'

var button = document.getElementById('button');
var nameContent = document.getElementById('name-content');
var surnameContent = document.getElementById('surname-content');
var dataContent = document.getElementById("data-content");

//name
button.addEventListener('click', function(e) {
    
    if (nameContent.value.match(/^[a-ząśżźćęółń]/i) == null) {
        e.preventDefault;
        nameContent.setCustomValidity('Powinieneś wpisać imię!');
    } else {
        nameContent.setCustomValidity('');
    }
});


button.addEventListener('click', function(e) {
  if (nameContent.value.length > 40) {
  nameContent.setCustomValidity('Zbyt duża ilość znaków!');
      return false
  }
});


//surname

button.addEventListener('click', function(e) {
    
    if (surnameContent.value.match(/^[a-ząśżźćęółń]/i) == null) {
        e.preventDefault;
        surnameContent.setCustomValidity('Powinieneś wpisać nazwisko!');
    } else {
        surnameContent.setCustomValidity('');
    }
});


button.addEventListener('click', function(e) {
  if (surnameContent.value.length > 40) {
  surnameContent.setCustomValidity('Zbyt duża ilość znaków!');
      return false
  }
});



function checkPesel(pesel)
{
    //date
    var year     = parseInt(pesel.substring(0,2),10);
    var month = parseInt(pesel.substring(2,4),10)-1;
    var day   = parseInt(pesel.substring(4,6),10);
 
    if(month > 80)
    {
        year += 1800;
        month = month - 80;
    }
    else if(month >= 60)
    {
        year += 2200;
        month = month - 60;
    }
    else if (month >= 40)
    {
        year += 2100;
        month = month-40;
    }
    else if (month >= 20)
    {
        year += 2000;
        month = month - 20;
    }
    else
    {
        year += 1900;
    }
    
    var dateOfBirth = new Date();
    dateOfBirth.setFullYear(year, month, day);
     
    //PESEL
    var wagi = [9,7,3,1,9,7,3,1,9,7];
    var sum = 0;
 
    for(var i=0;i < wagi.length; i++)
    {
        sum+=(parseInt(pesel.substring(i,i+1),10)*wagi[i]);
    }
 
    sum=sum % 10;
 
    var cyfraKontr = parseInt(pesel.substring(10,11),10);
    var poprawnosc = (sum === cyfraKontr);
    
 
    return {
        valid: poprawnosc,
        date: dateOfBirth
    };
}




$('#button-check').bind('click', function (e) { 
    
    e.preventDefault();

    var numerPesel = $("#pesel").val();
    var resultToCheck = checkPesel(numerPesel)

    if (resultToCheck.valid) {
        $('#result').html('poprawność: OK');
    } else {
        $('#result').html('poprawność: ERROR');
    }

    dataContent.valueAsDate = resultToCheck.date;

});


