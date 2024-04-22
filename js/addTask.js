function saveTask() {
    const title = document.getElementById('titleInput').value.trim();
    const description = document.getElementById('description').value.trim();
    const dueDate = document.getElementById('inputDate').value.trim();
    const assignedTo = document.getElementById('searchInput').value.trim();
    const category = document.getElementById('categoryInput').value.trim();
    const subTask = document.getElementById('subtaskInput').value.trim();
}

function clearTaskInput() {
    document.getElementById('titleInput').value = '';
    document.getElementById('description').value = '';
    document.getElementById('inputDate').value = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryInput').value = '';
    document.getElementById('subtaskInput').value = '';
    let dropdownSubtaskList = document.getElementById('dropdownSubtaskList');
    while (dropdownSubtaskList.firstChild) {
        dropdownSubtaskList.removeChild(dropdownSubtaskList.firstChild);
    }
    document.querySelectorAll('.btnPrio').forEach(button => {
        button.classList.remove('red', 'orange', 'green');
        const img = button.querySelector('img');
        img.src = img.getAttribute('data-original') || img.src;
    });
}

function setupDropdowns() {
    setupDropdownToggle();
    setupDropdownBehavior();
    setupDropdownCloseOnClickOutside();
    setupCategoryDropdownCloseBehavior();
}

function setupInputFields(event) {
    setupCheckboxInteraction();
    setupSearchInputFilter();
    setupCheckboxInteractionForInputField();
    setupInputListeners();
    setupDateValidation();
    addSubTask();
}

function setupInputListeners() {
    function checkValueAndToggleClass(inputElement) {
        if (inputElement.value) {
            inputElement.classList.add('hasValue');
        } else {
            inputElement.classList.remove('hasValue');
        }
    }
    document.getElementById('titleInput').addEventListener('input', function () {
        checkValueAndToggleClass(this);
    });
    document.getElementById('description').addEventListener('input', function () {
        checkValueAndToggleClass(this);
    });
    document.getElementById('inputDate').addEventListener('input', function () {
        checkValueAndToggleClass(this);
    });
}

function setupDropdownBehavior() {
    document.querySelector('.searchInput').addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelector('.dropdown-list').style.display = 'block';
    });
}

function setupDropdownToggle() {
    document.querySelector('.toggleIcon').addEventListener('click', function (e) {
        e.stopPropagation();
        const dropdownList = document.querySelector('.dropdown-list');
        const toggleIcon = document.querySelector('.toggleIcon');
        if (dropdownList.style.display === 'block') {
            dropdownList.style.display = 'none';
            toggleIcon.classList.remove('open');
        } else {
            dropdownList.style.display = 'block';
            toggleIcon.classList.add('open');
        }
    });
}

function setupDropdownCloseOnClickOutside() {
    window.addEventListener('click', function (e) {
        const customDropdown = document.querySelector('.custom-dropdown');
        const dropdownList = document.querySelector('.dropdown-list');
        if (!customDropdown.contains(e.target)) {
            dropdownList.style.display = 'none';
        }
    });
}

function setupDateValidation() {
    document.getElementById('createTaskBtn').addEventListener('click', function () {
        let inputDate = document.getElementById('inputDate');
        let errorMessage = document.getElementById('errorMessageDate');
        if (!inputDate.value) {
            inputDate.classList.add('required');
            errorMessage.style.display = 'block';
        } else {
            inputDate.classList.remove('required');
            errorMessage.style.display = 'none';
        }
    });
}

function setupCategoryDropdownCloseBehavior() {
    document.getElementById('categoryDropdown').addEventListener('click', function (e) {
        const dropdownList = document.getElementById('dropdownList');
        if (!dropdownList.contains(e.target)) {
            document.querySelector('.dropdown-list').style.display = 'none';
        }
    });
}

function setupSearchInputFilter() {
    document.querySelector('.searchInput').addEventListener('input', function (e) {
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
}

function setupCheckboxInteraction() {
    const checkboxes = document.querySelectorAll('.dropdown-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateAssignedProfiles(checkboxes);
        });
    });
}

function updateAssignedProfiles(checkboxes) {
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

function setupCheckboxInteractionForInputField() {
    const checkboxes = document.querySelectorAll('.dropdown-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateInputField(checkboxes);
        });
    });
}

function updateInputField(checkboxes) {
    const selectedNames = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.parentElement.querySelector('label').textContent.trim());
    const inputField = document.getElementById('searchInput');
    if (selectedNames.length > 0) {
        inputField.value = 'An: ' + selectedNames.join(', ');
    } else {
        inputField.value = '';
        inputField.placeholder = 'Select contacts to assign';
    }
}

function setupCategoryDropdown() {
    document.addEventListener('DOMContentLoaded', function () {
        const inputField = document.getElementById('categoryInput');
        const dropdownList = document.getElementById('dropdownList');
        const itemTechnical = document.getElementById('itemTechnical');
        const itemUserStory = document.getElementById('itemUserStory');
        inputField.addEventListener('click', function () {
            dropdownList.style.display = 'block';
        });
        function selectItem(item) {
            inputField.value = item.textContent;
            dropdownList.style.display = 'none';
        }
        itemTechnical.addEventListener('click', function () {
            selectItem(this);
        });
        itemUserStory.addEventListener('click', function () {
            selectItem(this);
        });
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
        const buttons = document.querySelectorAll('.btnPrio');
        let activePriority = null;
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const img = this.querySelector('img');
                if (activePriority) {
                    activePriority.button.classList.remove('red', 'orange', 'green');
                    const activeImg = activePriority.button.querySelector('img');
                    activeImg.src = activeImg.getAttribute('data-original') || activeImg.src;
                }
                if (activePriority && activePriority.button === this) {
                    activePriority = null;
                } else {
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
                    if (!img.getAttribute('data-original')) {
                        img.setAttribute('data-original', img.src);
                    }
                    img.src = img.getAttribute('data-active');
                }
            });
        });
    });
}

function createSubtaskHTML(taskText) {
    return `
      <li class="subtaskItem">
        ${taskText}
        <div class="deleteIcon"></div>
        <div class="vectorIcon"></div>
        <div class="editIcon"></div>
        <div class="deleteHoverIcon" style="display:none !important"></div>
        <div class="vectorHoverIcon" style="display:none !important"></div>
        <div class="editHoverIcon" style="display:none !important"></div>
      </li>
    `;
}


function addSubTask() {
    const input = document.getElementById('subtaskInput');
    const list = document.getElementById('dropdownSubtaskList');
    if (input.value.trim() !== '') {
        const newSubtaskHTML = createSubtaskHTML(input.value.trim());
        list.innerHTML += newSubtaskHTML;
        input.value = '';
        hideIcons();
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

