'use strict';

renderTypeSelectOptions(petType);
renderTable(petArr, '.table-search #tbody', { actionName: '', context: '', className: 'warning d-none' });


const uniqueData = [];
const seenValues = new Set(); // Set to store seen 'value' properties

petBreed.forEach(obj => {
    if (!seenValues.has(obj.value)) {
        uniqueData.push(obj);
        seenValues.add(obj.value);
    }
});

for (let i = 0; i < uniqueData.length; i++) {
    const option = document.createElement("option");
    option.value = uniqueData[i].value;
    option.textContent = uniqueData[i].name;
    breedInput.appendChild(option);
}


const searchPet = (data) =>{
    const filtered = petArr.filter(pet => {
        const matchesId = data.id === '' || pet.id.toLowerCase().includes(data.id.toLowerCase());
        const matchesName = data.name === '' || pet.name.toLowerCase().includes(data.name.toLowerCase());
        const matchesType = data.type === 'Select Type' || pet.type.toLowerCase() === data.type.toLowerCase();
        const matchesBreed = data.breed === 'Select Breed' || pet.breed.toLowerCase() === data.breed.toLowerCase();
        const matchesVaccinated = data.vaccinated === false  || pet.vaccinated === data.vaccinated;
        // console.log(pet.vaccinated, data.vaccinated);
        const matchesDewormed = data.dewormed === false  || pet.dewormed === data.dewormed;
        const matchesSterilized = data.sterilized === false  || pet.sterilized === data.sterilized;

        return matchesId && matchesName && matchesType && matchesBreed && matchesVaccinated && matchesDewormed && matchesSterilized;
    });
    renderTable(filtered, '.table-search #tbody', { actionName: '', context: '', className: 'warning d-none' });
}

// console.log(petArr.filter(item => item.vaccinated === true));
