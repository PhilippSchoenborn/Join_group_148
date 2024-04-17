document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('searchInput');
    const dropdownContacts = document.getElementById('dropdownContacts');
    const dropdownContactsList = dropdownContacts.querySelector('.dropdown-list');
  
    inputField.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown(dropdownContactsList);
    });
  
    dropdownContacts.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown(dropdownContactsList);
    });
  
    document.addEventListener('click', function() {
      closeDropdown(dropdownContactsList);
    });
  
    function toggleDropdown(dropdown) {
      dropdown.classList.toggle("show");
    }
  
    function closeDropdown(dropdown) {
      dropdown.classList.remove("show");
    }
  
    function selectContact(item) {
      const contactInputField = document.getElementById('searchInput');
      contactInputField.value = item.textContent;
      closeDropdown(dropdownContactsList);
    }
  
    document.querySelectorAll('#dropdownContacts .dropdown-item').forEach(item => {
      item.addEventListener('click', function() {
        selectContact(this);
      });
    });
  });