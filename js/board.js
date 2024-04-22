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

document.addEventListener('DOMContentLoaded', function() {
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

let tasks = [];

async function saveTask() {
    let toDoContainer = document.getElementById('toDoContainer');
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('inputDate').value;
    let category = document.getElementById('categoryInput').value;



    if (!Array.isArray(tasks)) {
        tasks = []; // Sicherstellen, dass tasks ein Array ist
    }

    tasks.push({        
        title: title,
        description: description,
        date: date,
        priority: getSelectedPriority(),
        assigned: getSelectedContactNames(),
        profileImage: getSelectedContactImages(),
        category: category,
        subtask: getAllSubtasks()
    });

    try {

        await setItem('tasks', JSON.stringify(tasks));
        console.log(tasks); // user meldung erfolgreich machen
        displayTask(tasks);
    } catch (e) {
        console.error('Fehler beim speichern der Task');
        return false;
    }

    return false;
    
}

function displayTask(tasks) {
    let toDoContainer = document.getElementById('toDoContainer');

    toDoContainer.innerHTML = '';  // Klärt den Container vor dem Hinzufügen neuer Tasks

    for (let i = 0; i < tasks.length; i++) {  // Korrigiere index zu i und i++
        const task = tasks[i];

        // Verwende Backticks für Template Literals
        toDoContainer.innerHTML += `
                <div class="taskCard" draggable="true">
                    <div class="taskCardLabel">${task.category}</div>  
                    <div class="taskCardbody">
                        <div class="taskCardHeadline">${task.title}</div>  
                        <div class="taskCardDescription">${task.description}</div>  
                        <div class="taskCardProgress">
                            <div class="taskCardProgressbar fill50"></div>  
                            <div class="taskCardProgressbarLabel">Subtasks</div>
                        </div>
                        <div class="taskCardFooter">
                            <div class="taskCardUser">${task.assignedTo}</div>  
                            <div class="taskCardPriority">
                                <img src="img/Prioritysymbols.png" />
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}


function setupDragAndDrop() {
    const containers = document.querySelectorAll('.subTaskContainer');
  
    containers.forEach(container => {
      container.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        if (container !== draggable.parentNode) {
          container.appendChild(draggable); // Fügt das Element dem neuen Container hinzu
          saveTaskPositions(); // Speichert die Positionen der Tasks nach jedem Drop
        }
      });
    });
  }


  function setupDragAndDrop() {
    const containers = document.querySelectorAll('.subTaskContainer');
  
    let draggedItem = null;  // Dies hält das gezogene Element.
  
    // Hinzufügen von Event Listeners für alle Container
    containers.forEach(container => {
      container.addEventListener('dragstart', e => {
        if (e.target.className.includes('taskCard')) {
          draggedItem = e.target;  // Speichert das gezogene Element.
          setTimeout(() => {
            e.target.style.display = 'none';  // Verbirgt das Element während des Ziehens.
          }, 0);
        }
      });
  
      container.addEventListener('dragend', e => {
        setTimeout(() => {
          e.target.style.display = 'block';  // Stellt das Element nach dem Ziehen wieder dar.
          draggedItem = null;  // Setzt das gezogene Element zurück.
        }, 0);
      });
  
      container.addEventListener('dragover', e => {
        e.preventDefault();  // Erlaubt das Droppen von Elementen.
      });
  
      container.addEventListener('dragenter', e => {
        e.preventDefault();
        if (container !== draggedItem.parentNode) {
          container.style.backgroundColor = 'lightblue';  // Visualisiert das potenzielle Drop-Ziel.
        }
      });
  
      container.addEventListener('dragleave', e => {
        container.style.backgroundColor = '';  // Setzt den Hintergrund zurück, wenn das Item das Element verlässt.
      });
  
      container.addEventListener('drop', e => {
        if (container !== draggedItem.parentNode) {
          container.style.backgroundColor = '';  // Setzt den Hintergrund zurück.
          container.appendChild(draggedItem);  // Fügt das gezogene Item zum Container hinzu.
        }
      });
    });
  }
  
  // Event Listener, der die Drag-and-Drop-Funktion beim Laden der Seite aufruft
  document.addEventListener('DOMContentLoaded', setupDragAndDrop);
  
  
  function saveTaskPositions() {
    const containers = document.querySelectorAll('.subTaskContainer');
    const tasksState = [];
  
    containers.forEach((container, index) => {
      container.querySelectorAll('.taskCard').forEach(task => {
        const taskId = task.getAttribute('data-task-id'); // Stelle sicher, dass jede Task eine eindeutige ID hat
        tasksState.push({ taskId: taskId, containerId: container.id });
      });
    });
  
    localStorage.setItem('taskPositions', JSON.stringify(tasksState));
  }
  
  
  function restoreTaskPositions() {
    const savedPositions = localStorage.getItem('taskPositions');
    if (savedPositions) {
      const tasksState = JSON.parse(savedPositions);
      tasksState.forEach(taskState => {
        const taskElement = document.querySelector(`[data-task-id="${taskState.taskId}"]`);
        const containerElement = document.getElementById(taskState.containerId);
        if (taskElement && containerElement) {
          containerElement.appendChild(taskElement); // Verschiebt die Task in den gespeicherten Container
        }
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
    restoreTaskPositions(); // Stellt die Positionen der Tasks beim Laden der Seite wieder her
  });
  
  

