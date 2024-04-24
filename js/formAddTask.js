document.addEventListener('DOMContentLoaded', function() {
    let searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener('click', function (event) {
            event.stopPropagation();
            let dropdownList = document.getElementById("dropdownList");
            if (dropdownList.style.display === "block") {
                dropdownList.style.display = "none";
            } else {
                dropdownList.style.display = "block";
            }
        });
    }

    let closeIcon = document.getElementById("closeIcon");
    if (closeIcon) {
        closeIcon.addEventListener('click', function () {
            if (dropdownList.style.display === "block") {
                dropdownList.style.display = "none";
            } else {
                dropdownList.style.display = "block";
            }
        });
    }

    window.addEventListener('click', function(event) {
        let dropdownList = document.getElementById("dropdownList");
        if (dropdownList && event.target !== searchInput && !dropdownList.contains(event.target)) {
            dropdownList.style.display = "none";
        }
    });

    // Verhindert das Schließen des Dropdowns beim Klicken auf Elemente innerhalb des Dropdowns
    let dropdownList = document.getElementById("dropdownList");
    if (dropdownList) {
        dropdownList.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
});

// Zugriff auf den Button
const btnCreatTask = document.querySelector('.btn-createTask');

// Zugriff auf das Bild innerhalb des Buttons
const iconCheck = btnCreatTask.querySelector('.btn-icon');

// Event-Listener für den Beginn des Klicks (entspricht :active in CSS)
btnCreatTask.addEventListener('mousedown', function () {
    // Ändere das Bild zu dem blauen Icon, wenn der Button geklickt wird
    iconCheck.src = 'img/buttonIcons/check-blue.svg';
});

// Optional: Event-Listener für das Ende des Klicks
btnCreatTask.addEventListener('mouseup', function () {
    // Setze das Bild zurück zum Standard, wenn der Klick beendet wird
    iconCheck.src = 'img/buttonIcons/check.svg';
});

// Für Touch-Geräte (touchstart und touchend entsprechend hinzufügen)
btnCreatTask.addEventListener('touchstart', function () {
    iconCheck.src = 'img/buttonIcons/check-blue.svg';
});

btnCreatTask.addEventListener('touchend', function () {
    iconCheck.src = 'img/buttonIcons/check.svg';
});

document.getElementById('titleInput').addEventListener('input', function() {
    if(this.value){
        this.classList.add('hasValue');
    } else{
        this.classList.remove('hasValue');
    }
})

document.getElementById('description').addEventListener('input', function() {
    if(this.value){
        this.classList.add('hasValue');
    } else{
        this.classList.remove('hasValue');
    }
})

document.getElementById('inputDate').addEventListener('input', function() {
    if(this.value){
        this.classList.add('hasValue');
    } else{
        this.classList.remove('hasValue');
    }
})


document.getElementById('createTaskBtn').addEventListener('click', function(){
    let inputTitle = document.getElementById('titleInput');
    let errorMessage = document.getElementById('errorMessageTitle');

    if(!inputTitle.value){
        inputTitle.classList.add('required');
        errorMessage.style.display = 'block';
    } else {
        inputTitle.classList.remove('required');
        errorMessage.style.display = 'none'
    }
})

document.getElementById('createTaskBtn').addEventListener('click', function(){
    let inputDate = document.getElementById('inputDate');
    let errorMessage = document.getElementById('errorMessageDate');

    if(!inputDate.value){
        inputDate.classList.add('required');
        errorMessage.style.display = 'block';
    } else {
        inputDate.classList.remove('required');
        errorMessage.style.display = 'none'
    }
})

//close closeAddTaskFloating
document.getElementById('closeAddTaskFloating').addEventListener('click', function() {
    document.getElementById('addTaskFloating').style.display = 'none';
});

//open closeAddTaskFloating
document.getElementById('addTaskBtn').addEventListener('click', function() {
    document.getElementById('addTaskFloating').style.display = 'block';
});


//dropdown
document.querySelector('.searchInput').addEventListener('click', function(e) {
    e.stopPropagation(); // Verhindert, dass das Dropdown schließt, wenn man in das Suchfeld klickt
    
    document.querySelector('.dropdown-list').style.display = 'block';
    
});

document.querySelector('.toggleIcon').addEventListener('click', function(e) {
    e.stopPropagation(); // Verhindert, dass das Dropdown durch andere Click-Events geschlossen wird
    const dropdownList = document.querySelector('.dropdown-list');
    const toggleIcon = document.querySelector('.toggleIcon');

    // Prüfen des aktuellen Zustands und Umschalten
    if (dropdownList.style.display === 'block') {
        dropdownList.style.display = 'none';
        toggleIcon.classList.remove('open'); // Icon zurückdrehen
    } else {
        dropdownList.style.display = 'block';
        toggleIcon.classList.add('open'); // Icon drehen
    }
});


window.addEventListener('click', function(e) {
    if (!document.querySelector('.custom-dropdown').contains(e.target)) {
        document.querySelector('.dropdown-list').style.display = 'none';
    }
});

document.getElementById('categoryDropdown').addEventListener('click', function(e){
    if (!document.getElementById('dropdownList').contains(e.target)) {
        document.querySelector('.dropdown-list').style.display = 'none';
    }
})

document.querySelector('.searchInput').addEventListener('input', function(e) {
    const searchValue = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        const name = item.querySelector('label').textContent.toLowerCase();
        if (name.includes(searchValue)) {
            item.style.display = '';            
        } else {
            item.style.display = 'none';
        }
    });
});

const checkboxes = document.querySelectorAll('.dropdown-item input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        updateAssignedProfiles();
    });
});

function updateAssignedProfiles() {
    const assignedContainer = document.getElementById('profileAssigned');
    assignedContainer.innerHTML = ''; 
    Array.from(checkboxes).filter(checkbox => checkbox.checked).forEach(checkbox => {        
        const imgSrc = checkbox.parentElement.querySelector('img').src;
        const imgAlt = checkbox.parentElement.querySelector('img').alt;
        const profileDiv = document.createElement('div');
        profileDiv.className = 'assigned-profile';
        profileDiv.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}"/>`;
        assignedContainer.appendChild(profileDiv);
    });
}

document.querySelectorAll('.dropdown-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        updateInputField();
    });
});

function updateInputField() {
    const selectedNames = Array.from(document.querySelectorAll('.dropdown-item input[type="checkbox"]:checked'))
                               .map(checkbox => checkbox.parentElement.querySelector('label').textContent.trim()); // `.trim()` entfernt überflüssige Leerzeichen

    const inputField = document.getElementById('searchInput');
    if (selectedNames.length > 0) {
        inputField.value = 'An: ' + selectedNames.join(', '); // Fügt ein Leerzeichen nach 'An' und ein Leerzeichen vor jedem Komma ein
    } else {
        inputField.value = ''; // Setzen Sie das Feld zurück, wenn keine Kontakte ausgewählt sind
        inputField.placeholder = 'Select contacts to assign'; // Optional: Platzhaltertext wiederherstellen
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('categoryInput');
    const dropdownList = document.getElementById('dropdownList');
    const itemTechnical = document.getElementById('itemTechnical');
    const itemUserStory = document.getElementById('itemUserStory');

    // Öffnet das Dropdown, wenn das Eingabefeld angeklickt wird
    inputField.addEventListener('click', function() {
        dropdownList.style.display = 'block';
    });

    // Funktion zum Setzen des Eingabefeldes und Schließen des Dropdowns
    function selectItem(item) {
        inputField.value = item.textContent;
        dropdownList.style.display = 'none';
    }

    // Event-Listener für jedes Dropdown-Element
    itemTechnical.addEventListener('click', function() {
        selectItem(this);
    });

    itemUserStory.addEventListener('click', function() {
        selectItem(this);
    });

    // Schließt das Dropdown, wenn außerhalb geklickt wird
    document.addEventListener('click', function(e) {
        if (!inputField.contains(e.target) && !dropdownList.contains(e.target)) {
            dropdownList.style.display = 'none';
        }
    });
});


let tasks = [];

async function deleteAllTasks() {
    tasks = []; // Lokales Array leeren
    try {
        const response = await setItem('tasks', JSON.stringify(tasks)); // Verwende den Schlüssel 'tasks' oder einen anderen, je nachdem wie deine Daten organisiert sind
        console.log('All tasks deleted:', response);
    } catch (error) {
        console.error('Error deleting tasks:', error);
    }
}



function getSelectedPriority() {
    // Mapping von Prioritätsstufen zu Bildpfaden
    const priorityLevels = {
        high: "/img/buttonIcons/prioHigh.svg",
        medium: "/img/buttonIcons/prioMedium.svg",
        low: "/img/buttonIcons/prioLow.svg"
    };
    
    const prioritySelect = document.getElementById('priorityInput'); // Angenommen, du hast ein <select> Element mit der ID 'priorityInput'
    if (prioritySelect) {
        const selectedPriority = prioritySelect.value; // 'high', 'medium' oder 'low'
        return {
            level: selectedPriority,
            imagePath: priorityLevels[selectedPriority] // Pfad zum Bild, basierend auf der ausgewählten Priorität
        };
    } else {
        console.error('Priority select element not found');
        return { level: undefined, imagePath: undefined };
    }
}



async function saveTask() {
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('inputDate').value;
    let category = document.getElementById('categoryInput').value;

    const priorityData = getSelectedPriority(); // Holt das Prioritätslevel und den Bildpfad

    if (!Array.isArray(tasks)) {
        tasks = [];
    }

    tasks.push({
        id: tasks.length + 1,
        title: title,
        description: description,
        date: date,
        priority: priorityData.level,
        priorityImage: priorityData.imagePath, // Speichert den Pfad zum Bild
        assigned: getSelectedContactNames(),
        profileImage: getSelectedContactImages(),
        category: category,
        subtask: getAllSubtasks(),
        status: 'open'
    });

    try {
        await setItem('tasks', JSON.stringify(tasks));
        console.log(tasks); // Usermeldung, erfolgreich gespeichert
        loadTasks();
    } catch (e) {
        console.error('Fehler beim Speichern der Task');
        return false;
    }

    return false;
}



function displayTask(tasks) {
    let toDoContainer = document.getElementById('toDoContainer');

    toDoContainer.innerHTML = '';  

    for (let i = 0; i < tasks.length; i++) { 
        const task = tasks[i];

        
        toDoContainer.innerHTML += createTaskCardHtml(task);
    }
}

function createTaskCardHtml(task) {
    // Bedingte HTML-Elemente erstellen, falls die entsprechenden Daten vorhanden sind
    const categoryHtml = task.category ? `<div class="taskCardLabel">${task.category}</div>` : '';
    const titleHtml = task.title ? `<div class="taskCardHeadline">${task.title}</div>` : '';
    const descriptionHtml = task.description ? `<div class="taskCardDescription">${task.description}</div>` : '';
    const assignedUserHtml = task.assigned ? `<div class="taskCardUser">${task.assigned}</div>` : '';
    const priorityImageHtml = task.priorityImage ? `<div class="taskCardPriority"><img src="${task.priorityImage}" /></div>` : '';
    const subtasksHtml = (task.subtask && task.subtask.length > 0) ? 
        `<div class="taskCardProgress">
            <div class="taskCardProgressbar fill50"></div>
            <div class="taskCardProgressbarLabel">Subtasks</div>
        </div>` : '';

    // Überprüfe, ob überhaupt Inhalt für den body der Karte vorhanden ist
    const hasBodyContent = titleHtml || descriptionHtml || subtasksHtml;

    // Erstelle das HTML für die Task-Karte
    return `
    <div class="taskCard" draggable="true" ondragstart="startDragging(${task.id})">
        ${categoryHtml}
        ${hasBodyContent ? `<div class="taskCardbody">
            ${titleHtml}
            ${descriptionHtml}
            ${subtasksHtml}
            <div class="taskCardFooter">
                ${assignedUserHtml}
                ${priorityImageHtml}
            </div>
        </div>` : `<div class="taskCardbody">No details provided.</div>`}
    </div>`;
}










// Event Listener für Prioritäts-Buttons
document.querySelectorAll('.btnPrio').forEach(button => {
    button.addEventListener('click', function () {
        currentPriority = this.getAttribute('data-value');
        console.log('Aktuelle Priorität:', currentPriority);
    });
});

// Funktion zum Abrufen der Subtasks aus der UI
function getSubtasks() {
    const subtasks = [];
    const subtaskItems = document.querySelectorAll('#dropdownSubtaskList li');

    subtaskItems.forEach(item => {
        subtasks.push(item.textContent);
    });

    return subtasks;
}
function clearSubtasks() {
    const subtaskList = document.getElementById('dropdownSubtaskList');
    while (subtaskList.firstChild) {
        subtaskList.removeChild(subtaskList.firstChild);
    }
}

function getSelectedPriority() {
    // Zuweisung der Button-IDs zu ihren Farbklassen
    const priorities = {
        btnPrioHigh: 'red',
        btnPrioMedium: 'orange',
        btnPrioLow: 'green'
    };

    // Durchgehe alle Buttons und prüfe die aktive Klasse
    for (let id in priorities) {
        const button = document.getElementById(id);
        if (button && button.classList.contains(priorities[id])) { // Prüfe, ob der Button die entsprechende Farbklasse hat
            return button.dataset.value;
        }
    }
    return null; // Rückgabe von null, wenn keine Priorität ausgewählt ist
}

function getSelectedContactNames() {
    const checkboxes = document.querySelectorAll('.checkboxContacts:checked');
    const selectedNames = Array.from(checkboxes).map(checkbox => checkbox.value);
    console.log(selectedNames);
    return selectedNames;
}

function getSelectedContactImages() {
    const checkboxes = document.querySelectorAll('.checkboxContacts:checked');
    const selectedImages = Array.from(checkboxes).map(checkbox => {
        const label = checkbox.closest('.dropdown-item').querySelector('label');
        const img = label.querySelector('img');
        return img.src; // Die URL des Bildes
    });
    console.log(selectedImages);
    return selectedImages;
}

function getAllSubtasks() {
    const ul = document.getElementById('dropdownSubtaskList');
    const subtasks = Array.from(ul.children).map(li => li.textContent);
    console.log(subtasks); // Zeigt alle Subtasks in der Konsole an
    return subtasks;
}