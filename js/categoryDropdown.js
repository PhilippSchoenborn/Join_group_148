const categoryInput = document.getElementById('categoryInput');
const dropdownCategoriesList = document.getElementById('dropdownList');

function openCategoriesDropdown() {
    dropdownCategoriesList.classList.add("show");
}

function closeCategoriesDropdown() {
    dropdownCategoriesList.classList.remove("show");
}

categoryInput.onclick = function(e) {
    e.stopPropagation();
    if (!dropdownCategoriesList.classList.contains("show")) {
        openCategoriesDropdown();
    } else {
        closeCategoriesDropdown();
    }
};

window.onclick = function(event) {
    closeCategoriesDropdown();
};

dropdownCategoriesList.onclick = function(event) {
    event.stopPropagation();
};

dropdownCategoriesList.querySelectorAll('.dropdown-item').forEach(item => {
    item.onclick = function() {
        console.log("Selected category:", item.innerHTML.trim());
        categoryInput.value = item.innerHTML.trim();
        closeCategoriesDropdown();
    };
});

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

dropdownCategoriesList.querySelectorAll('.dropdown-item').forEach(item => {
    item.onclick = function(e) {
        updateSelectedCategory(item);
        e.stopPropagation();
    };
});
