
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

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btnPrio');
    let activePriority = null;  // Store the current active priority

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const img = this.querySelector('img');
            // If there's an active priority, clear it
            if (activePriority) {
                activePriority.button.classList.remove('red', 'orange', 'green');
                const activeImg = activePriority.button.querySelector('img');
                activeImg.src = activeImg.getAttribute('data-original') || activeImg.src;  // Use the original src if previously set
            }

            // Check if the same button was clicked
            if (activePriority && activePriority.button === this) {
                // If the same button is clicked, just deactivate
                activePriority = null;
            } else {
                // Set new active button and add appropriate color
                activePriority = { button: this, value: this.getAttribute('data-value') };
                switch (this.id) {
                    case 'btnPrioHigh':
                        this.classList.add('red');
                        break;
                    case 'btnPrioMedium':
                        this.classList.add('orange');
                        break;
                    case 'btnPrioLow':
                        this.classList.add('green');
                        break;
                }
                // Update the image to active and store the original src if not already stored
                if (!img.getAttribute('data-original')) {
                    img.setAttribute('data-original', img.src);  // Store the original src only once
                }
                img.src = img.getAttribute('data-active');
            }
        });
    });
});




