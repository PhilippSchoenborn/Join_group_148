function setupDropdowns() {
    setupDropdownToggle();
    setupDropdownBehavior();
    setupDropdownCloseOnClickOutside();
    setupCategoryDropdownCloseBehavior();

}

function setupButtons() {
    setupCreateTaskBtn();
    setupBtnInteraction();
    setupCloseButtonForFloatingTask();
    setupOpenButtonForFloatingTask();
}

function setupInputFields(event) {
    setupCheckboxInteraction();
    setupSearchInputFilter();
    setupCheckboxInteractionForInputField();
    setupInputListeners();
    setupDateValidation();
    addSubTask();
}

document.addEventListener('DOMContentLoaded', function () {
    setupButtons();
});


function setupBtnInteraction() {
    // Zugriff auf den Button
    const btnCreatTask = document.querySelector('.btn-createTask');

    // Zugriff auf das Bild innerhalb des Buttons
    const iconCheck = btnCreatTask.querySelector('.btn-icon');

    // Funktion zum Ändern des Icons beim Start des Klicks
    function changeIconOnStart() {
        iconCheck.src = 'img/buttonIcons/check-blue.svg';
    }

    // Funktion zum Zurücksetzen des Icons beim Ende des Klicks
    function resetIconOnEnd() {
        iconCheck.src = 'img/buttonIcons/check.svg';
    }

    // Event-Listener für den Beginn des Klicks (entspricht :active in CSS)
    btnCreatTask.addEventListener('mousedown', changeIconOnStart);

    // Optional: Event-Listener für das Ende des Klicks
    btnCreatTask.addEventListener('mouseup', resetIconOnEnd);

    // Für Touch-Geräte (touchstart und touchend entsprechend hinzufügen)
    btnCreatTask.addEventListener('touchstart', changeIconOnStart);
    btnCreatTask.addEventListener('touchend', resetIconOnEnd);
}

function setupCreateTaskBtn() {
    // Event-Listener für den Klick auf den 'createTaskBtn' hinzufügen
    document.getElementById('createTaskBtn').addEventListener('click', function () {
        // Zugriff auf das Eingabefeld für den Titel
        let inputTitle = document.getElementById('titleInput');

        // Zugriff auf das Element für die Fehlermeldung
        let errorMessage = document.getElementById('errorMessageTitle');

        // Überprüfen, ob das Eingabefeld leer ist
        if (!inputTitle.value) {
            // Hinzufügen der Klasse 'required', falls kein Titel eingegeben wurde
            inputTitle.classList.add('required');

            // Anzeigen der Fehlermeldung
            errorMessage.style.display = 'block';
        } else {
            // Entfernen der Klasse 'required', falls ein Titel vorhanden ist
            inputTitle.classList.remove('required');

            // Ausblenden der Fehlermeldung
            errorMessage.style.display = 'none';
        }
    });
}

function setupDateValidation() {
    // Event-Listener für den Klick auf den 'createTaskBtn' hinzufügen
    document.getElementById('createTaskBtn').addEventListener('click', function () {
        // Zugriff auf das Eingabefeld für das Datum
        let inputDate = document.getElementById('inputDate');

        // Zugriff auf das Element für die Fehlermeldung beim Datum
        let errorMessage = document.getElementById('errorMessageDate');

        // Überprüfen, ob das Eingabefeld für das Datum leer ist
        if (!inputDate.value) {
            // Hinzufügen der Klasse 'required', falls kein Datum eingegeben wurde
            inputDate.classList.add('required');

            // Anzeigen der Fehlermeldung
            errorMessage.style.display = 'block';
        } else {
            // Entfernen der Klasse 'required', falls ein Datum vorhanden ist
            inputDate.classList.remove('required');

            // Ausblenden der Fehlermeldung
            errorMessage.style.display = 'none';
        }
    });
}

function setupInputListeners() {
    // Funktion zur Überprüfung und Anpassung der Klassen basierend auf dem Wert des Eingabefelds
    function checkValueAndToggleClass(inputElement) {
        if (inputElement.value) {
            inputElement.classList.add('hasValue');
        } else {
            inputElement.classList.remove('hasValue');
        }
    }

    // Event-Listener für das Titel-Eingabefeld
    document.getElementById('titleInput').addEventListener('input', function () {
        checkValueAndToggleClass(this);
    });

    // Event-Listener für das Beschreibungs-Eingabefeld
    document.getElementById('description').addEventListener('input', function () {
        checkValueAndToggleClass(this);
    });

    // Event-Listener für das Datums-Eingabefeld
    document.getElementById('inputDate').addEventListener('input', function () {
        checkValueAndToggleClass(this);
    });
}

function setupCloseButtonForFloatingTask() {
    // Event-Listener für den Schließ-Button
    document.getElementById('closeAddTaskFloating').addEventListener('click', function () {
        // Zugriff auf das schwebende Element für das Hinzufügen von Aufgaben
        let addTaskFloating = document.getElementById('addTaskFloating');

        // Verstecken des addTaskFloating Elements
        addTaskFloating.style.display = 'none';
    });
}

function setupOpenButtonForFloatingTask() {
    // Event-Listener für den Öffnungs-Button
    document.getElementById('addTaskBtn').addEventListener('click', function () {
        // Zugriff auf das schwebende Element für das Hinzufügen von Aufgaben
        var addTaskFloating = document.getElementById('addTaskFloating');

        // Anzeigen des schwebenden Elements
        addTaskFloating.style.display = 'block';
    });
}

function setupDropdownBehavior() {
    // Event-Listener für das Sucheingabefeld
    document.querySelector('.searchInput').addEventListener('click', function (e) {
        e.stopPropagation(); // Verhindert, dass das Dropdown schließt, wenn man in das Suchfeld klickt

        // Zugriff auf die Dropdown-Liste und Anzeigen dieser Liste
        document.querySelector('.dropdown-list').style.display = 'block';
    });
}

function setupDropdownToggle() {
    // Event-Listener für das Toggle-Icon
    document.querySelector('.toggleIcon').addEventListener('click', function (e) {
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
}

function setupDropdownCloseOnClickOutside() {
    // Globales Klick-Event, das überprüft, ob außerhalb des Dropdowns geklickt wurde
    window.addEventListener('click', function (e) {
        // Suche nach dem Container des Dropdowns
        const customDropdown = document.querySelector('.custom-dropdown');
        // Suche nach der Dropdown-Liste
        const dropdownList = document.querySelector('.dropdown-list');

        // Überprüfen, ob das geklickte Element außerhalb des Dropdown-Containers ist
        if (!customDropdown.contains(e.target)) {
            // Schließen des Dropdowns, indem die Anzeige auf 'none' gesetzt wird
            dropdownList.style.display = 'none';
        }
    });
}

function setupCategoryDropdownCloseBehavior() {
    // Event-Listener für Klicks auf das Dropdown
    document.getElementById('categoryDropdown').addEventListener('click', function (e) {
        // Überprüfen, ob das geklickte Ziel nicht innerhalb der Dropdown-Liste ist
        const dropdownList = document.getElementById('dropdownList');

        if (!dropdownList.contains(e.target)) {
            // Zugriff auf die sichtbare Dropdown-Liste und Verstecken dieser
            document.querySelector('.dropdown-list').style.display = 'none';
        }
    });
}

function setupSearchInputFilter() {
    // Event-Listener für das Eingabefeld 'searchInput'
    document.querySelector('.searchInput').addEventListener('input', function (e) {
        // Eingegebenen Wert aus dem Suchfeld holen und in Kleinbuchstaben umwandeln
        const searchValue = e.target.value.toLowerCase();

        // Alle Dropdown-Elemente auswählen
        const items = document.querySelectorAll('.dropdown-item');

        // Durch alle Dropdown-Elemente iterieren
        items.forEach(item => {
            // Textinhalt des Labels im Dropdown-Element holen und in Kleinbuchstaben umwandeln
            const name = item.querySelector('label').textContent.toLowerCase();

            // Überprüfen, ob der Name den Suchtext enthält
            if (name.includes(searchValue)) {
                item.style.display = ''; // Element anzeigen
            } else {
                item.style.display = 'none'; // Element verbergen
            }
        });
    });
}

function setupCheckboxInteraction() {
    // Checkboxen innerhalb der Dropdown-Elemente selektieren
    const checkboxes = document.querySelectorAll('.dropdown-item input[type="checkbox"]');

    // Event-Listener zu jeder Checkbox hinzufügen
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateAssignedProfiles(checkboxes);
        });
    });
}

function updateAssignedProfiles(checkboxes) {
    // Container für zugewiesene Profile auswählen
    const assignedContainer = document.getElementById('profileAssigned');
    assignedContainer.innerHTML = ''; // Container leeren

    // Durch jede ausgewählte Checkbox iterieren
    Array.from(checkboxes).filter(checkbox => checkbox.checked).forEach(checkbox => {
        // Bildquelle und Alt-Text aus dem Elternelement der Checkbox holen
        const imgSrc = checkbox.parentElement.querySelector('img').src;
        const imgAlt = checkbox.parentElement.querySelector('img').alt;

        // Neues Div-Element für das Profil erstellen
        const profileDiv = document.createElement('div');
        profileDiv.className = 'assigned-profile';
        profileDiv.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}"/>`;

        // Profil-Div zum Container hinzufügen
        assignedContainer.appendChild(profileDiv);
    });
}

function setupCheckboxInteractionForInputField() {
    // Checkboxen innerhalb der Dropdown-Elemente selektieren
    const checkboxes = document.querySelectorAll('.dropdown-item input[type="checkbox"]');

    // Event-Listener zu jeder Checkbox hinzufügen
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateInputField(checkboxes);
        });
    });
}

function updateInputField(checkboxes) {
    // Array von Namen der ausgewählten Checkboxen erstellen
    const selectedNames = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.parentElement.querySelector('label').textContent.trim()); // `.trim()` entfernt überflüssige Leerzeichen

    // Referenz auf das Eingabefeld bekommen
    const inputField = document.getElementById('searchInput');

    // Überprüfen, ob Namen ausgewählt wurden und das Eingabefeld entsprechend aktualisieren
    if (selectedNames.length > 0) {
        inputField.value = 'An: ' + selectedNames.join(', '); // Zusammengeführte Namen ins Feld setzen
    } else {
        inputField.value = ''; // Feld leeren, wenn keine Auswahl besteht
        inputField.placeholder = 'Select contacts to assign'; // Platzhaltertext wiederherstellen, optional
    }
}

function setupCategoryDropdown() {
    document.addEventListener('DOMContentLoaded', function () {
        // Elemente für das Eingabefeld und das Dropdown-Menü
        const inputField = document.getElementById('categoryInput');
        const dropdownList = document.getElementById('dropdownList');

        // Elemente für spezifische Dropdown-Optionen
        const itemTechnical = document.getElementById('itemTechnical');
        const itemUserStory = document.getElementById('itemUserStory');

        // Öffnet das Dropdown, wenn das Eingabefeld angeklickt wird
        inputField.addEventListener('click', function () {
            dropdownList.style.display = 'block';
        });

        // Funktion zum Setzen des Eingabefeldes und Schließen des Dropdowns
        function selectItem(item) {
            inputField.value = item.textContent;
            dropdownList.style.display = 'none';
        }

        // Event-Listener für technisches Item
        itemTechnical.addEventListener('click', function () {
            selectItem(this);
        });

        // Event-Listener für User Story Item
        itemUserStory.addEventListener('click', function () {
            selectItem(this);
        });

        // Schließt das Dropdown, wenn außerhalb geklickt wird
        document.addEventListener('click', function (e) {
            if (!inputField.contains(e.target) && !dropdownList.contains(e.target)) {
                dropdownList.style.display = 'none';
            }
        });
    });
}

setupCategoryDropdown();

function setupPriorityButtons() {
    document.addEventListener('DOMContentLoaded', function () {
        // Select all priority buttons
        const buttons = document.querySelectorAll('.btnPrio');
        let activePriority = null;  // Store the current active priority

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const img = this.querySelector('img');
                // Clear the current active priority if one exists
                if (activePriority) {
                    activePriority.button.classList.remove('red', 'orange', 'green');
                    const activeImg = activePriority.button.querySelector('img');
                    activeImg.src = activeImg.getAttribute('data-original') || activeImg.src;  // Use the original src if previously set
                }

                // Check if the same button was clicked
                if (activePriority && activePriority.button === this) {
                    // Deactivate if the same button is clicked again
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
}

// Subtask -->

function addSubTask() {
    const input = document.getElementById('subtaskInput');
    const list = document.getElementById('dropdownSubtaskList');
    if (input.value.trim() !== '') {
        const newSubtaskHTML = createSubtaskHTML(input.value.trim());
        list.innerHTML += newSubtaskHTML;
        input.value = '';
        setupSubtaskHoverListeners();
    }
}

function setupSubtaskHoverListeners() {
    const subtaskItems = document.querySelectorAll('.subtaskItem');
    subtaskItems.forEach(item => {
        item.addEventListener('mouseover', function (event) {
            const iconElements = this.querySelectorAll('.subTaskIcons > div');
            iconElements.forEach(element => {
                element.style.display = 'block';
            });
        });
        item.addEventListener('mouseout', function () {
            const iconElements = this.querySelectorAll('.subTaskIcons > div');
            iconElements.forEach(element => {
                element.style.display = 'none';
            });
        });
    });
}

let subtaskItemsArray = [];

function createSubtaskHTML(taskText) {
    const id = `subtask_${subtaskItemsArray.length + 1}`;
    const subtaskItem = { id: id, text: taskText };
    subtaskItemsArray.push(subtaskItem);
    const listItemHTML = `
        <li id="${id}" class="subtaskItem">
            ${taskText}
            <div class="subTaskIcons">
                <div class="editIcon" onclick="changeListItem('${id}')"><img src="./img/edit.svg" alt=""></div>
                <div class="vectorIcon"><img src="./img/buttonIcons/vector.svg" alt=""></div>
                <div class="deleteIcon" onclick="deleteListItem('${id}')"><img src="./img/delete.svg" alt=""></div>
            </div>
        </li>
    `;
    return listItemHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    setupSubtaskHoverListeners();
    setupPriorityButtons();
});

function deleteListItem(id) {
    const listItemIndex = subtaskItemsArray.findIndex(item => item.id === id);
    if (listItemIndex !== -1) {
        document.getElementById(id).remove();
        subtaskItemsArray.splice(listItemIndex, 1);
    }
    console.log('gelöscht')
}

function changeListItem(id) {
    const listItem = subtaskItemsArray.find(item => item.id === id);
    if (listItem) {
        const newText = prompt("Enter new text:", listItem.text);
        if (newText !== null) {
            listItem.text = newText;
            const listItemElement = document.getElementById(id);
            listItemElement.textContent = newText;
            console.log('ändern');
            const updatedListItemHTML = createSubtaskHTML(newText);
            listItemElement.outerHTML = updatedListItemHTML;
        }
    }
}

setupPriorityButtons();



function hideIcons() {
    document.getElementById('closeIcon').style.display = 'none';
    document.getElementById('vectorIcon').style.display = 'none';
    document.getElementById('checkIcon').style.display = 'none';
    document.getElementById('subtaskIcon').style.display = 'inline';
}

function showIcons() {
    document.getElementById('closeIcon').style.display = 'inline';
    document.getElementById('vectorIcon').style.display = 'inline';
    document.getElementById('checkIcon').style.display = 'inline';
    document.getElementById('subtaskIcon').style.display = 'none';
}

function deleteSubTask() {
    const subtaskInput = document.getElementById('subtaskInput');
    subtaskInput.value = '';
    hideIcons();
}

document.addEventListener('DOMContentLoaded', function () {
    const closeIcon = document.getElementById('closeIcon');
    if (closeIcon) {
        closeIcon.addEventListener('click', function () {
            deleteSubTask();
        });
    } else {
        console.error("Element mit der ID 'closeIcon' nicht gefunden.");
    }
    const checkIcon = document.getElementById('checkIcon');
    if (checkIcon) {
        checkIcon.addEventListener('click', function () {
            addSubTask();
        });
    } else {
        console.error("Element mit der ID 'checkIcon' nicht gefunden.");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('subtaskIcon').addEventListener('click', function () {
        addSubTask();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('subtaskIcon').addEventListener('click', function () {
        if (document.getElementById('subtaskInput').value.trim() !== '') {
            addSubTask();
            hideIcons();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const subtaskInput = document.getElementById('subtaskInput');
    const subtaskIcon = document.getElementById('subtaskIcon');
    const closeIcon = document.getElementById('closeIcon');
    const vectorIcon = document.getElementById('vectorIcon');
    const checkIcon = document.getElementById('checkIcon');
    checkIcon.addEventListener('click', function () {
        addSubTask();
        hideIcons();
        subtaskIcon.style.display = 'inline';
    });
    updateHtml();
});


//drag and drop function

let currentDraggedElement;

function updateHtml() {
    let openTasksHtml = '';
    let closedTasksHtml = '';

    let openTasks = tasks.filter(task => task.status === 'open');
    let closedTasks = tasks.filter(task => task.status === 'closed');

    openTasks.forEach((task, index) => {
        openTasksHtml += createTaskCardHtml(task, index);
    });

    closedTasks.forEach((task, index) => {
        closedTasksHtml += createTaskCardHtml(task, index);
    });

    document.getElementById('toDoContainer').innerHTML = openTasksHtml;
    document.getElementById('doneContainer').innerHTML = closedTasksHtml || '<div class="noTaskCard">No task Done</div>';
}


function startDragging(taskId) {
    currentDraggedElement = tasks.findIndex(t => t.id === taskId);
}


function allowDrop(event) {
    event.preventDefault();
}


function moveTo(status) {
    if (currentDraggedElement >= 0 && tasks[currentDraggedElement]) {
        tasks[currentDraggedElement].status = status;
        updateHtml();
    } else {
        console.error('Task does not exist');
    }
}

