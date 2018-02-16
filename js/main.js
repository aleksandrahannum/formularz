'use strict'

var button = document.getElementById('button');
var nameContent = document.getElementById('name-content');
var surnameContent = document.getElementById('surname-content');


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
  if (surnameContentContent.value.length > 40) {
  surnameContent.setCustomValidity('Zbyt duża ilość znaków!');
      return false
  }
});
