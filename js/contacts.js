function cancelAddContact() {
    document.getElementById('addNewContact').classList.remove('addnewContactActive');
    document.getElementById('blurBackground').classList.add('d-none');
}

function cancelEditContact(){
    document.getElementById('editContact').classList.remove('editContactActive');
    document.getElementById('blurBackground').classList.add('d-none');
} 

function showeditContact() {
    document.getElementById('editContact').classList.add('editContactActive');
    document.getElementById('blurBackground').classList.remove('d-none');
}

function showAddContact() {
    document.getElementById('addNewContact').classList.add('addnewContactActive');
    document.getElementById('blurBackground').classList.remove('d-none');
}

function writeContact(event) {
    document.getElementById('inputBox1').classList.add('blueborder');
}

function StopPropergation() {
    document.getElementById('inputBox1').classList.remove('blueborder');
} 