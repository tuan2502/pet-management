'use strict';

const showHealthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBody = document.getElementById("tbody");



let healthyCheck = false;

/**
 * Xử lý Animation cho Sidebar
 * 1. Xóa class active cho Sidebar khi click open
 * 2. Xóa class active khi chuyển trang
 */
const wrapper = document.querySelector('.wrapper');
const sideBar = document.getElementById('sidebar');
sideBar.querySelector('.sidebar-header').style.cursor = 'pointer';
/* Đoạn code này xử lý khi mà click vào i navbar thì thực hiện add và remove active class
Nhưng khi áp dụng nó thì xảy ra lỗi ở điểm là trang index.html không remove class active. Em muốn xin thêm ý kiến về điều này */

// sideBar.querySelector('.sidebar-header').addEventListener('click', (e) => {
//     if( sideBar.classList.contains('active')){
//         sideBar.classList.remove('active');
//     }else{
//         sideBar.classList.add('active')
//     }
// });

// Xử lý khi nhấn vào navbar thì hiển thị
sideBar.addEventListener('click', (e) => {
    sideBar.classList.toggle('active');
});

// In ra petArr từ localStorage
const petArr = getFromStorage('petArr', []);

// Dữ liệu pet type
const petType = getFromStorage('petType', [])

// Dữ liệu pet breed
const petBreed = getFromStorage('petBreed', []);

//Hàm capitalize
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Hàm để chuyển đổi string
function convertToCamelCase(inputString) {
    const string = capitalize(inputString).replace(/\s/g, ''); 
    return string.charAt(0).toLowerCase() + string.slice(1);
}
  

function renderTypeSelectOptions(petType) {
    for (let i = 0; i < petType.length; i++) {
        // tạo ra các <option></option> và thêm value và name
        const option = document.createElement("option");
        option.value = petType[i].value;
        option.textContent = petType[i].name;
        typeInput.appendChild(option);
    }
}

//Hàm thay đổi button
const changeButton = ( id , actionName, context, className ) => {
    return `<button type="button" class="btn btn-${className}" onclick="${actionName}('${id}')">${context}</button>`
}
// Pet Table
const renderTable = (petArr, selector, action) => {
    changeButton('deletePet', '1', 'Delete', 'btn btn-danger')
    const table = document.querySelector(selector || '.table-pet #tbody')
    if(!table) return;
    const tableBodyEl = petArr?.map((item, index) => {
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
                <td class="${selector ? 'd-none' : ''}">${item.bmi ? item.bmi : '?'}</td>
				<td>${item.date}</td>
				<td>${changeButton(item.id, action ? action.actionName : 'deletePet',  action ? action.context : 'Delete', action ? action.className : 'danger')}</td>
			</tr>
        `;
    });
    return table.innerHTML = tableBodyEl.join('');
}

//Render Breed Table
function renderBreedTable(breedArr, input) {
    let tableBread = document.querySelector(".table-breed #tbody");
    /* Tạo mảng thành loại riêng cho mỗi con vật */
    if(!tableBread) return;
    const tableBodyEl = breedArr?.filter(item => !input ? item.value : item.value && item.type === input).map((item, index) => {
        return `
            <tr key=${index}>
				<th scope="row">${index + 1}</th>
				<td>${item.name}</td>
				<td>${capitalize(item.type)}</td>
				<td><button type="button" class="btn btn-danger" onclick="deleteBreed('${item.name}')">Delete</button>
				</td>
			</tr>
        `
    })
    return tableBread.innerHTML = tableBodyEl.join('');
}

const deleteBreed = (name) => {
	// Confirm before deletePet
	if (confirm('Are you sure?')) {
		const index = petBreed.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
        // Nếu tìm được
        if(index !== -1){
            petBreed.splice(index, 1);
            saveToStorage('petBreed', petBreed);
            renderBreedTable(petBreed);
            return true;
        }
        return false;
	}
}

const handleTypeChange = (active = false) => {
    if (active) return;
    typeInput.onchange = (e) => {
        const selectedOption = e.target.value;
        breedInput.innerHTML = '';
        if (selectedOption === 'cat' || selectedOption === 'dog') {
            let newBreed = petBreed
                .filter(item => item.type === selectedOption)
                .map(item => {
                    const option = document.createElement('option');
                    option.value = item.value;
                    option.textContent = item.name;
                    return breedInput.appendChild(option)
                });
            renderBreedTable(petBreed, selectedOption);
            return newBreed;
        } else {
            renderBreedTable(petBreed, selectedOption);
        }
        return;
    }
}

// Phương thức Validator để có thể tái sử dụng
function Validator(options) {
    // Tạo Object để lưu rules vào
    let selectorRules = {};
    let formElement = document.querySelector(options.form);
    let errorElement;

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        let errorMessage;
        // Lấy các rule của selectorRules
        let rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng kiểm tra
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        };

        if (errorMessage) {
            errorElement.innerText = errorMessage;
        } else {
            errorElement.innerText = '';
        };
        return !errorMessage;
    }

    // Hàm thực hiện clear form
    function clearForm(enableInputs) {
        for (let enableInput of enableInputs) {
            if (enableInput.type === 'checkbox') {
                enableInput.checked = false;
            } else if (enableInput.type === 'color') {
                enableInput.value = '#000000';
            } else {
                enableInput.value = '';
            }
        }
    }

    //Hàm thêm ngày nhập dữ liệu
    function formattedDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    if (formElement) {
        // Submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();
            let isFormValid = true;
            options.rules.forEach(function (rule) {
                const inputElement = formElement.querySelector(rule.selector);
                const isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('[name]');
                    let formValues = Array.from(enableInputs).reduce((values, input) => {
                        // Xử lý type của đầu vào là gì
                        let inputName = input.name.slice(3).toLowerCase();
                        if (input.type === 'checkbox') {
                            values[inputName] = input.checked;
                        }else if(input.type === 'select-one'){
                            values[inputName] = input.options[input.selectedIndex].textContent;
                        }else{
                            values[inputName] = input.value
                        }
                        return values;
                    }, {});
                    formValues.date = formattedDate();
                    options.onSubmit(formValues);
                    clearForm(enableInputs);
                } else {
                    // submit với mặc định của trình duyệt
                    formElement.submit()
                }
            }

        }

        options.rules.forEach(rule => {
            // Lưu lại các rules cho mỗi input
            // Nếu rule.test là mảng thì lưu giá trị rule.test thứ 2 trở lên vào
            // Nếu không tạo mảng và lưu giá trị vào
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            const inputElement = formElement.querySelector(rule.selector);
            // Xử lý khi người dùng blur thì xác định value có lỗi hay không và trả ra msg
            inputElement.onblur = () => {
                validate(inputElement, rule);
            }

            // Xử lý khi người dùng nhập vào input
            inputElement.oninput = () => {
                let errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                errorElement.innerHTML = '';
            }
        })
    }
}

/**
 * Tạo rules để xác định validate cần thực hiện
 * Định nghĩa và Nguyên tắc rules
 * 1. Khi có lỗi => trả ra msg lỗi
 * 2. Khi hợp lệ => Không trả ra gì cả (undefined)
 */
Validator.isRequired = function (selector, message) {
    return {
        selector, test: function (value) {
            return value.trim() ? undefined : message || 'Please input!';
        }
    }
}

Validator.isMinMax = function (selector, min, max, message) {
    return {
        selector, test: function (value) {
            return value >= min && value <= max ? undefined : message || `Must be between ${min} and ${max}`;
        }
    }
}

Validator.isDuplicate = function (selector, list, message) {
    return {
        selector, test: function (value) {
            return !list?.some(item => item.id === value) ?  undefined : message || `${value} is existed`;
        }
    }
}











