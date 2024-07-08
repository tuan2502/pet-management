


handleTypeChange();
renderTypeSelectOptions(petType);
renderTable(petArr);
renderBreedTable(petBreed);
// Xử lý khi ấn show healthy pet
showHealthyBtn.onclick = () => {
    healthyCheck = !healthyCheck;
    if(!healthyCheck){
        showHealthyBtn.textContent = 'Show Healthy Pet';
        return renderTable(petArr);
    }
    showHealthyBtn.textContent = 'Show All Pet';
    const tableBodyEl = petArr.filter(item => item.vaccinated && item.dewormed && item.sterilized).map((item, index) => {
        return `
            <tr key=${index}>
				<th scope="row">${item.id}</th>
				<td>${item.name}</td>
				<td>${item.age}</td>
				<td>${item.type}</td>
				<td>${item.weight} kg</td>
				<td>${item.length} cm</td>
				<td>${item.breed}</td>
				<td>
					<i class="bi bi-square-fill" style="color: ${item.color}"></i>
				</td>
				<td><i class="${item.vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
				<td><i class="${item.dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
				<td><i class="${item.sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
                <td>${item.bmi ? item.bmi : '?'}</td>
				<td>${item.date}</td>
				<td><button type="button" class="btn btn-danger" onclick="deletePet('${item.id}')">Delete</button>
				</td>
			</tr>
        `
    })
    return tableBody.innerHTML = tableBodyEl.join('');
}

const deletePet = (petId) => {
	// Confirm before deletePet
	if (confirm('Are you sure?')) {
		const index = petArr.findIndex(item => item.id === petId);
        // Nếu tìm được
        if(index !== -1){
            petArr.splice(index, 1);
            saveToStorage('petArr', petArr);
            renderTable(petArr);
            return true;
        }
        return false;
	}
}

bmiBtn.onclick = () => {
    //Lọc qua mảng arr tìm type
    petArr.forEach(item => {
        if(item.type.toLowerCase() === 'cat'){
            item.bmi = ((item.weight * 886) / item.length ** 2).toFixed(2);
        }else{
            item.bmi = ((item.weight * 703) / item.length ** 2).toFixed(2);
        }
    })
    return renderTable(petArr);
}


