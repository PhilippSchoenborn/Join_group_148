function toggleDropdown() {
    document.getElementById("dropdown").classList.toggle("active");
  }

  document.addEventListener("click", function(event) {
    let dropdown = document.getElementById("dropdown");
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("active");
    }
  });

  document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(item => {
    item.addEventListener('change', function() {
      let selectedOptions = [];
      document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked').forEach(checkbox => {
        selectedOptions.push(checkbox.value);
      });
      document.getElementById('selectedOptions').value = selectedOptions.join(', ');
    });
  });