const contactInput = document.getElementById('searchInput');
const dropdownContactsList = document.getElementById('dropdownContacts');

function openContactsDropdown() {
    dropdownContactsList.classList.add("show");
}

function closeContactsDropdown() {
    dropdownContactsList.classList.remove("show");
}

function updateSelectedContacts(clickedItem) {
    const contactName = clickedItem.textContent.trim();
    console.log("Selected contact:", contactName);
    const isChecked = clickedItem.querySelector('input[type="checkbox"]').checked;
    if (isChecked && !contactInput.value.includes(contactName)) {
        if (contactInput.value === '') {
            contactInput.value += contactName;
        } else {
            contactInput.value += ', ' + contactName;
        }
    } 
    else if (!isChecked && contactInput.value.includes(contactName)) {
        contactInput.value = contactInput.value.replace(contactName, '');
        contactInput.value = contactInput.value.replace(', , ', ', ');
        contactInput.value = contactInput.value.replace(/(^, |, $)/g, '');
    }
}

contactInput.addEventListener('click', function(e) {
    e.stopPropagation();
    openContactsDropdown();
});

window.addEventListener('click', function(event) {
    closeContactsDropdown();
});

dropdownContactsList.addEventListener('click', function(event) {
    event.stopPropagation();
});

dropdownContactsList.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        updateSelectedContacts(item);
    });
});

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

dropdownContactsList.querySelectorAll('.dropdown-item').forEach(item => {
    item.onclick = function(e) {
        updateSelectedContacts(item);
        e.stopPropagation();
    };
});