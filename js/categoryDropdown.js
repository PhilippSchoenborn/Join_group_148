document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('categoryInput');
    const dropdownList = document.getElementById('dropdownList');
    const categoryDropdown = document.getElementById('categoryDropdown');
  
    inputField.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown(dropdownList);
    });
  
    categoryDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown(dropdownList);
    });
  
    document.addEventListener('click', function() {
      closeDropdown(dropdownList);
    });
  
    function toggleDropdown(dropdown) {
      dropdown.classList.toggle("show");
    }
  
    function closeDropdown(dropdown) {
      dropdown.classList.remove("show");
    }
  
    function selectCategory(item) {
      inputField.value = item.textContent;
      closeDropdown(dropdownList);
    }
  
    document.querySelectorAll('#dropdownList .dropdown-item').forEach(item => {
      item.addEventListener('click', function() {
        selectCategory(this);
      });
    });
  });