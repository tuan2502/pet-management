'use strict';

/**
 * Xử lý lưu dữ liệu dưới localStorage
 * 
 */

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultVal) {
    return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
}


const dataType = [{ "value": "", "name": "Select Type" }, { "value": "cat", "name": "Cat" }, { "value": "dog", "name": "Dog" }];
const dataBreed = [{ "value": "", "type": "", "name": "Select Breed" }, { "value": "tabby", "type": "cat", "name": "Tabby" }, { "value": "domesticMediumHair", "type": "cat", "name": "Domestic Medium Hair" }, { "value": "mixedBreed", "type": "cat", "name": "Mixed Breed" }, { "value": "domesticShortHair", "type": "cat", "name": "Domestic Short Hair" }, { "value": "terrier", "type": "cat", "name": "Terrier" }, { "value": "greyHound", "type": "cat", "name": "Greyhound" }, { "value": "persian", "type": "cat", "name": "Persian" }, { "value": "tabby", "type": "dog", "name": "Tabby" }, { "value": "domesticMediumHair", "type": "dog", "name": "Domestic Medium Hair" }, { "value": "mixedBreed", "type": "dog", "name": "Mixed Breed" }, { "value": "domesticShortHair", "type": "dog", "name": "Domestic Short Hair" }, { "value": "husky", "type": "dog", "name": "Husky" }];
const dataPet = [{"id":"P001","name":"Money","age":"12","type":"Cat","weight":"12","length":"20","color":"#000000","breed":"Domestic Medium Hair","vaccinated":true,"dewormed":false,"sterilized":false,"date":"06/07/2024"},{"id":"P002","name":"Tyke","age":"5","type":"Dog","weight":"3","length":"40","color":"#00aa00","breed":"Mixed Breed","vaccinated":true,"dewormed":false,"sterilized":true,"date":"07/07/2024"},{"id":"P003","name":"Tom","age":"5","type":"Dog","weight":"3","length":"40","color":"#00aa00","breed":"Mixed Breed","vaccinated":true,"dewormed":true,"sterilized":true,"date":"07/07/2024"}];
//Lưu lên localStorage khi khởi động

document.addEventListener('DOMContentLoaded', function() {
    saveToStorage('petArr', dataPet);
    saveToStorage('petType', dataType);
    saveToStorage('petBreed', dataBreed);
});



