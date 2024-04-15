function cancelAddContact() {
    document.getElementById('addNewContact').classList.remove('addnewContactActive');
}


function showAddContact() {
    document.getElementById('addNewContact').classList.add('addnewContactActive');
}

function writeContact(event) {
    document.getElementById('inputBox1').classList.add('blueborder');
}

function StopPropergation() {
    document.getElementById('inputBox1').classList.remove('blueborder');
} 