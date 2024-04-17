const contactInput = document.getElementById('searchInput');
const dropdownContactsList = document.getElementById('dropdownContacts');

// Funktion zum Öffnen des Dropdown-Menüs für Kontakte
function openContactsDropdown() {
    dropdownContactsList.classList.add("show");
}

// Funktion zum Schließen des Dropdown-Menüs für Kontakte
function closeContactsDropdown() {
    dropdownContactsList.classList.remove("show");
}

// Funktion zum Aktualisieren der ausgewählten Kontakte
function updateSelectedContacts(clickedItem) {
    const contactName = clickedItem.textContent.trim();
    console.log("Selected contact:", contactName);
    const isChecked = clickedItem.querySelector('input[type="checkbox"]').checked;
    
    // Wenn die Checkbox ausgewählt ist und der Kontakt noch nicht hinzugefügt wurde
    if (isChecked && !contactInput.value.includes(contactName)) {
        if (contactInput.value === '') {
            contactInput.value += contactName;
        } else {
            contactInput.value += ', ' + contactName; // Kontakt im Eingabefeld anzeigen
        }
    } 
    // Wenn die Checkbox nicht ausgewählt ist und der Kontakt im Eingabefeld vorhanden ist
    else if (!isChecked && contactInput.value.includes(contactName)) {
        contactInput.value = contactInput.value.replace(contactName, ''); // Kontakt aus Eingabefeld entfernen
        contactInput.value = contactInput.value.replace(', , ', ', '); // Bereinige doppelte Kommas
        contactInput.value = contactInput.value.replace(/(^, |, $)/g, ''); // Entferne führendes und abschließendes Komma
    }
}

// Event-Handler für Klicks auf das Kontaktfeld
contactInput.addEventListener('click', function(e) {
    e.stopPropagation();
    openContactsDropdown(); // Öffne das Kontakte-Dropdown-Menü
});

// Event-Handler für Klicks auf das Fenster, um das Kontakte-Dropdown-Menü zu schließen
window.addEventListener('click', function(event) {
    closeContactsDropdown();
});

// Event-Handler für Klicks auf das Dropdown-Menü für Kontakte, um das Dropdown-Menü zu schließen
dropdownContactsList.addEventListener('click', function(event) {
    event.stopPropagation();
});

// Event-Handler für Klicks auf die Dropdown-Liste der Kontakte, um ausgewählte Kontakte zu aktualisieren
dropdownContactsList.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        updateSelectedContacts(item);
    });
});

// Funktion zum Öffnen des Kontakte-Dropdown-Menüs und Schließen des Kategorien-Dropdown-Menüs
function openContactsAndCloseCategoriesDropdown() {
    openContactsDropdown();
    closeCategoriesDropdown();
}

contactInput.previousElementSibling.onclick = function(e) {
    openContactsAndCloseCategoriesDropdown();
    e.stopPropagation();
};

document.getElementById('contactDropdown').onclick = function(e) {
    openContactsAndCloseCategoriesDropdown();
    e.stopPropagation();
};

// Klick-Handler für die Dropdown-Liste der Kontakte, um ausgewählte Kontakte zu aktualisieren
dropdownContactsList.querySelectorAll('.dropdown-item').forEach(item => {
    item.onclick = function(e) {
        updateSelectedContacts(item);
        e.stopPropagation();
    };
});