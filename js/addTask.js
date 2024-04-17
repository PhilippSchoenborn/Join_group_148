document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById("searchInput");
  const dropdownList = document.getElementById("dropdownList");

  searchInput && searchInput.addEventListener('click', function (event) {
      event.stopPropagation();
      dropdownList.style.display = (dropdownList.style.display === "block") ? "none" : "block";
  });

  window.addEventListener('click', function(event) {
      if (dropdownList && event.target !== searchInput && !dropdownList.contains(event.target)) {
          dropdownList.style.display = "none";
      }
  });

  dropdownList && dropdownList.addEventListener('click', function (event) {
      event.stopPropagation();
  });
});

const btnCreatTask = document.querySelector('.btn-createTask');
const iconCheck = btnCreatTask.querySelector('.btn-icon');
btnCreatTask.addEventListener('mousedown', function () {
    iconCheck.src = 'img/buttonIcons/check-blue.svg';
});

btnCreatTask.addEventListener('mouseup', function () {
    iconCheck.src = 'img/buttonIcons/check.svg';
});

btnCreatTask.addEventListener('touchstart', function () {
    iconCheck.src = 'img/buttonIcons/check-blue.svg';
});

btnCreatTask.addEventListener('touchend', function () {
    iconCheck.src = 'img/buttonIcons/check.svg';
});

['titleInput', 'description', 'inputDate'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
      if (this.value) {
          this.classList.add('hasValue');
      } else {
          this.classList.remove('hasValue');
      }
  });
});

document.getElementById('createTaskBtn').addEventListener('click', function(){
  let inputTitle = document.getElementById('titleInput');
  let inputDate = document.getElementById('inputDate');
  let errorMessageTitle = document.getElementById('errorMessageTitle');
  let errorMessageDate = document.getElementById('errorMessageDate');
  if(!inputTitle.value){
      inputTitle.classList.add('required');
      errorMessageTitle.style.display = 'block';
  } else {
      inputTitle.classList.remove('required');
      errorMessageTitle.style.display = 'none';
  } if(!inputDate.value){
      inputDate.classList.add('required');
      errorMessageDate.style.display = 'block';
    } else {
      inputDate.classList.remove('required');
      errorMessageDate.style.display = 'none';
    }
})

document.querySelector('.searchInput').addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelector('.dropdown-list').style.display = 'block';
});

document.querySelector('.toggleIcon').addEventListener('click', function(e) {
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
                               .map(checkbox => checkbox.parentElement.querySelector('label').textContent.trim());
    const inputField = document.getElementById('searchInput');
    if (selectedNames.length > 0) {
        inputField.value = 'An: ' + selectedNames.join(', ');
    } else {
        inputField.value = '';
        inputField.placeholder = 'Select contacts to assign';
    }
}

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btnPrio');
  let activePriority = null;

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const img = this.querySelector('img');
          if (activePriority) {
              activePriority.button.classList.remove('red', 'orange', 'green');
              activePriority.img.src = activePriority.originalSrc;
          }
          activePriority = {
              button: this,
              img: img,
              originalSrc: img.getAttribute('data-original') || img.src,
              activeSrc: img.getAttribute('data-active')
          };
          const priorityClass = this.id === 'btnPrioHigh' ? 'red' : (this.id === 'btnPrioMedium' ? 'orange' : 'green');
          this.classList.add(priorityClass);
          img.src = activePriority.activeSrc;
      });
  });
});

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

function saveTask(title, discription, dueDate, assignedTo, category, subTask){
  title = document.getElementById('titleInput');
  discription = document.getElementById('description');
  dueDate = document.getElementById('inputDate');

  assignedTo = document.getElementById('searchInput');
  category = document.getElementById('categoryInput');
  subTask = document.getElementById('subtaskInput');

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


function updateInputField() {
  const selectedNames = Array.from(document.querySelectorAll('.dropdown-item input[type="checkbox"]:checked'))
                             .map(checkbox => checkbox.parentElement.querySelector('label').textContent.trim());
  const inputField = document.getElementById('categoryInput');
  if (selectedNames.length > 0) {
      inputField.value = 'Selected categories: ' + selectedNames.join(', ');
  } else {
      inputField.value = '';
      inputField.placeholder = 'Select task category';
  }
}