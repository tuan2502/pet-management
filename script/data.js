'use strict';


const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');

function saveDynamicDataToFile() {
    let input = JSON.stringify(petArr)
    let blob = new Blob([input], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "data.json");
}

exportBtn.onclick = () =>{
    saveDynamicDataToFile();
}


importBtn.onclick = () =>{
    let file = document.getElementById("input-file").files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (e) {
            const petArr = e.target.result;
            saveToStorage('petArr', JSON.parse(petArr));
            alert("Import Successfully!");
            window.location.reload();
        }
        reader.onerror = function (evt) {
            alert("Error reading file");
        }
        return;
    }
    return alert('Please import files');
}

