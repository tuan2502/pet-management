'use strict';

handleTypeChange();
handleTypeChange(true);
renderTypeSelectOptions(petType);
renderTable(petArr, '.table-edit #tbody', { actionName: 'editPet', context: 'Edit', className: 'warning' });
const petFormEdit = document.getElementById("pet__form--edit")
petFormEdit.classList.add('hide');

const renderBreedSelector = (value) => {
    if (value === 'cat' || value === 'dog') {
        let newBreed = petBreed
            .filter(item => item.type === value)
            .map(item => {
                const option = document.createElement('option');
                option.value = item.value;
                option.textContent = item.name;
                breedInput.appendChild(option)
            });
        return newBreed;
    }
}
/* Xử lý edit pet
* 1. Tìm kiếm thông tin của pet cần edit khi nhấn edit
* 2. In giá trị của chúng lên form
*/
const editPet = (petId) => {
    petFormEdit.classList.remove('hide');
    petArr.findIndex(item => {
        if (item.id === petId) {
            let inputs = petFormEdit.querySelectorAll('[name]');
            for (let input of inputs) {
                const key = input.name.slice(3).toLowerCase();
                // 1. Kiểm tra type input là gì - select-one thì gán value phù hợp vào
                // 2. select type xuất hiện thì in giá trị của value type và in danh sách breed continue; để chuyển sang vòng lặp tiếp theo
                // 3. Nếu select breed thì gán giá trị cho input value;
                // 4. Tương tự cho checkbox
                if (input.type === 'select-one') {
                    input.value = convertToCamelCase(item[key]);
                    if (input.id === 'input-type') {
                        breedInput.innerHTML = '';
                        petBreed.filter(item => item.type === input.value)
                            .map(item => {
                                const option = document.createElement('option');
                                option.value = item.value;
                                option.textContent = item.name;
                                breedInput.appendChild(option)
                            }
                        );
                    }
                    continue;
                }else if(input.type === 'checkbox'){
                    input.checked = item[key];
                    continue;
                }
                input.value = item[key];
            }
        };
    });
    return;
}
