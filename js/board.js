function filterFunction() {
    var input, filter, div, label, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownList");
    label = div.getElementsByTagName("label");
    for (i = 0; i < label.length; i++) {
        txtValue = label[i].textContent || label[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            label[i].style.display = "";
        } else {
            label[i].style.display = "none";
        }
    }
}

// Event-Listener für das Suchfeld
document.getElementById("searchInput").addEventListener('click', function (event) {
    // Verhindert, dass das Dropdown sich schließt, wenn darauf geklickt wird
    event.stopPropagation();
    document.getElementById("dropdownList").style.display = "block";
});

// Event-Listener für das Schließen-Icon
document.getElementById("closeIcon").addEventListener('click', function () {
    document.getElementById("dropdownList").style.display = "none";
});

// Event-Listener für das Fenster, um das Dropdown zu schließen, wenn außerhalb geklickt wird
window.onclick = function(event) {
    if (!event.target.matches('#searchInput')) {
        document.getElementById("dropdownList").style.display = "none";
    }
}

// Verhindert das Schließen des Dropdowns beim Klicken auf Elemente innerhalb des Dropdowns
document.getElementById("dropdownList").addEventListener('click', function (event) {
    event.stopPropagation();
});

