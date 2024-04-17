let contacts = [
    {
        "name": "Julia Schäffer",
        "email": "julia.sch@hotmail.de",
        "phone": "+491778965144"
    },
    {
        "name": "Phillip Schönborn",
        "email": "philipp@schoenborn-home.de",
        "phone": "+49438721221"
    },
    {
        "name": "Tobias Mueller",
        "email": "webstor21@gmail.com",
        "phone": "+49152341609"
    },
    {
        "name": "Nathalie Strauchmann",
        "email": "strauchmann89@yahoo.de",
        "phone": "+49151338395"
    },
    {
        "name": "Melanie Müller",
        "email": "m.muellerstreich@gmail.com",
        "phone": "+491760152757"
    },
    {
        "name": "Herbert Peter",
        "email": "Petermann@hotmail.de",
        "phone": "+491723687234"
    },
    {
        "name": "Heiko Lee",
        "email": "h.lee99@home.com",
        "phone": ""
    },

];

// Schließt die Box 'Add new Contact'
function cancelAddContact() {
    document.getElementById('addNewContact').classList.remove('addnewContactActive');
    document.getElementById('blurBackground').classList.add('d-none');
    document.getElementById('buttonActiveImg').classList.remove('buttonActiveImg');
    document.getElementById('addContactButton').classList.remove('buttonActive');
}

// Schließt die Box 'Edit Contact'
function cancelEditContact(){
    document.getElementById('editContact').classList.remove('editContactActive');
    document.getElementById('blurBackground').classList.add('d-none');
} 

// Öffnet die Box 'Edit Contact'
function showeditContact() {
    document.getElementById('editContact').classList.add('editContactActive');
    document.getElementById('blurBackground').classList.remove('d-none');
}

// Öffnet die Box 'Add new Contact'
function showAddContact() {
    document.getElementById('addNewContact').classList.add('addnewContactActive');
    document.getElementById('blurBackground').classList.remove('d-none');
    document.getElementById('buttonActiveImg').classList.add('buttonActiveImg');
    document.getElementById('addContactButton').classList.add('buttonActive');
}

// fügt der InputBox den Effekt 'blaue Linie' hinzu
function writeContact(event) {
    document.getElementById('inputBox1').classList.add('blueborder');
}

// Entfernt der InputBox den Effekt 'blaue Linie' 
function StopPropergation() {
    document.getElementById('inputBox1').classList.remove('blueborder');
} 