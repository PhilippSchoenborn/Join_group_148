const categoryInput = document.getElementById('categoryInput');
const dropdownCategoriesList = document.getElementById('dropdownList');

function openCategoriesDropdown() {
    dropdownCategoriesList.classList.add("show");
}

function closeCategoriesDropdown() {
    dropdownCategoriesList.classList.remove("show");
}

// Öffnen oder Schließen des Kategorien-Dropdown-Menüs beim Klicken auf das Eingabefeld
categoryInput.onclick = function(e) {
    e.stopPropagation();
    if (!dropdownCategoriesList.classList.contains("show")) {
        openCategoriesDropdown();
    } else {
        closeCategoriesDropdown();
    }
};

// Schließen des Kategorien-Dropdown-Menüs, wenn außerhalb des Dropdowns geklickt wird
window.onclick = function(event) {
    closeCategoriesDropdown();
};

// Verhindern, dass Klicks innerhalb des Dropdown-Menüs das Schließen des Menüs auslösen
dropdownCategoriesList.onclick = function(event) {
    event.stopPropagation();
};

// onclick-Handler für Klicks auf die Dropdown-Liste der Kategorien
dropdownCategoriesList.querySelectorAll('.dropdown-item').forEach(item => {
    item.onclick = function() {
        console.log("Selected category:", item.innerHTML.trim());
        categoryInput.value = item.innerHTML.trim(); // Kategorie im Eingabefeld anzeigen
        closeCategoriesDropdown(); // Dropdown-Menü schließen
    };
});

// Funktion zum Öffnen des Kategorien-Dropdown-Menüs und Schließen des Kontakte-Dropdown-Menüs
function openCategoriesAndCloseContactsDropdown() {
    openCategoriesDropdown();
    closeContactsDropdown();
}

categoryInput.previousElementSibling.onclick = function(e) {
    openCategoriesAndCloseContactsDropdown();
    e.stopPropagation();
};


document.getElementById('categoryDropdown').onclick = function(e) {
    openCategoriesAndCloseContactsDropdown();
    e.stopPropagation();
};


// Klick-Handler für die Dropdown-Liste der Kategorien, um ausgewählte Kategorien zu aktualisieren
dropdownCategoriesList.querySelectorAll('.dropdown-item').forEach(item => {
    item.onclick = function(e) {
        updateSelectedCategory(item);
        e.stopPropagation();
    };
});
