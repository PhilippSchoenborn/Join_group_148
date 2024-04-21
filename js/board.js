


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

    addSubtask();
}



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

function addSubTask() {
    let subtaskInput = document.getElementById('subtaskInput');
    let subtaskValue = subtaskInput.value.trim();
    if (subtaskValue !== '') {
        let listItem = document.createElement('li');
        listItem.textContent = subtaskValue;
        listItem.classList.add('subtaskItem'); // Hier wird die Klasse hinzugefügt
        let dropdownSubtaskList = document.getElementById('dropdownSubtaskList');
        dropdownSubtaskList.appendChild(listItem);
        subtaskInput.value = '';
    }
}

setupPriorityButtons();

function addSubtask() {
    // Get the input field and the ul list
    const input = document.getElementById('subtaskInput');
    const list = document.getElementById('dropdownSubtaskList');

    // Check if the input field is not empty
    if (input.value.trim() !== '') {
        // Create a new li element
        const newSubtask = document.createElement('li');
        newSubtask.textContent = input.value.trim();  // Use the trimmed input value

        // Append the new subtask to the list
        list.appendChild(newSubtask);

        // Clear the input field after adding the subtask
        input.value = '';
    }
}

/* function handleKeyPress(event) {
    // Check if the key pressed is the Enter key
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent the default action to avoid submitting the form
        addSubtask();  // Call the addSubtask function to add the subtask
    }
} */


















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

function resetForm() {
    document.getElementById('titleInput').value = '';
    document.getElementById('inputDate').value = '';
    document.getElementById('description').value = '';
    document.getElementById('categoryInput').value = '';
    document.getElementById('searchInput').value = '';
    clearSubtasks();
}

function collectTaskData() {
    const title = document.getElementById('titleInput').value;
    const date = document.getElementById('inputDate').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('categoryInput').value;
    const selectedContacts = getSelectedContacts();
    const subtasks = getSubtasks();

    return {
        title: title,
        date: date,
        description: description,
        priority: currentPriority,
        category: category,
        assignedTo: selectedContacts,
        subtasks: subtasks
    };
}


function validateTaskInput(task) {
    if (!task.title || !task.date) {
        console.error('Alle Felder müssen ausgefüllt sein.');
        return false; // Oder eine visuelle Benachrichtigung für den Benutzer anzeigen.
    }
    return true;
}


async function saveTaskData(task) {
    try {
        await setItem('tasks', JSON.stringify(tasks));
        console.log('Task erfolgreich gespeichert:', task);
        console.log(tasks.length)
        resetForm();
    } catch (e) {
        console.error('Fehler beim Speichern der To-Do:', e);
        return false;
    }
}


function getSelectedContacts() {
    const selectedContacts = [];
    document.querySelectorAll('#dropdownContacts .checkboxContacts:checked').forEach(checkbox => {
        selectedContacts.push(checkbox.value);
    });
    return selectedContacts;
}


async function saveTask() {
    const task = collectTaskData();
    if (validateTaskInput(task)) {
        return await saveTaskData(task);
    }
    return false;
}








