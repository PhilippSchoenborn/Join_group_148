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



const beautifulColors = [
    'rgb(255, 46, 46)', 'rgb(255, 161, 46)', 'rgb(255, 238, 46)', 'rgb(51, 224, 42)', 'rgb(42, 203, 224)',
    'rgb(42, 115, 224)', 'rgb(139, 42, 224)', 'rgb(218, 42, 224)', 'rgb(232, 58, 133)', 'rgb(232, 58, 58)',
];

function renderContacts() {
    load()
    createContactList();
}

// Funktion zum Erstellen der Kontaktliste
function createContactList() {
    // Sortiere die Kontakte nach Namen
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    // Element, in dem die Kontaktliste eingefügt wird
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    let currentLetter = null;
    extractInitials(name);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const initials = extractInitials(contact.name);
        // Wenn der Anfangsbuchstabe des Kontakts neu ist, füge einen Buchstaben-Header hinzu
        const firstLetter = initials.charAt(0);
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            const letterHeading = document.createElement('div');
            letterHeading.textContent = currentLetter;
            letterHeading.classList.add('letter-heading');
            contactList.appendChild(letterHeading);
        }

        // Erstelle ein Div-Element für den Kontakt
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact');

        // Wähle eine Farbe aus der Liste beautifulColors basierend auf der Position des Kontakts
        const colorIndex = i % beautifulColors.length;
        const profileColor = beautifulColors[colorIndex];

        // Erstelle das Profilbild mit den Anfangsbuchstaben des Vor- und Nachnamens
        const profilePicture = document.createElement('div');
        profilePicture.classList.add('profile-picture');
        profilePicture.style.backgroundColor = profileColor;
        profilePicture.textContent = initials;
        contactItem.appendChild(profilePicture);

        // Füge den Namen und die E-Mail-Adresse des Kontakts hinzu
        const contactDetails = document.createElement('div');
        contactDetails.classList.add('oneContact');
        contactDetails.innerHTML = `
     <h2>${contact.name}</h2>
     <p class="blueColor" >${contact.email}</p>

   `;
        contactItem.appendChild(contactDetails);

        // Füge den Kontakt zur Kontaktliste hinzu
        contactList.appendChild(contactItem);

        // Füge dem Kontakt und den Kontaktinformationen einen Click-Event-Listener hinzu
        contactItem.addEventListener('click', (event) => {
            // Stelle sicher, dass nur das geklickte Element behandelt wird
            if (event.target === contactItem) {
                // Rufe die Kontaktinformationen mit dem aktuellen Kontakt ab
                contactClickHandler(contact);
            }
        });

        contactDetails.addEventListener('click', (event) => {
            // Stelle sicher, dass nur das geklickte Element behandelt wird
            if (event.target === contactDetails) {
                // Rufe die Kontaktinformationen mit dem aktuellen Kontakt ab
                contactClickHandler(contact);
            }
        });
    }

}

// Funktion, die beim Klicken auf den Kontakt oder Kontaktinformationen aufgerufen wird
function contactClickHandler(contact) {
    alert(`Kontakt ${contact.name} wurde angeklickt!`);
}




// Hilfsfunktion zum Extrahieren des ersten Buchstabens des Vornamens und Nachnamens
function extractInitials(name) {
    const names = name.split(' ');
    let initials = '';
    for (let i = 0; i < names.length; i++) {
        initials += names[i].charAt(0).toUpperCase();
    }
    return initials;
}

function getNewContact() {
    let name = document.getElementById('fullName');
    let email = document.getElementById('emailAdress');
    let phone = document.getElementById('phoneNumber');
    contacts.push({
        name: name.value,
        email: email.value,
        phone: phone.value,
    });
    save()
    createContactList();
}


function showContact() {


}


function deleteContact() {


}

function save() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


function load() {
    let storageAsText = localStorage.getItem("contacts");

    if (storageAsText) {
        contacts = JSON.parse(storageAsText);
    }
}




// Schließt die Box 'Add new Contact'
function cancelAddContact() {
    document.getElementById('addNewContact').classList.remove('addnewContactActive');
    document.getElementById('blurBackground').classList.add('d-none');
    document.getElementById('buttonActiveImg').classList.remove('buttonActiveImg');
    document.getElementById('addContactButton').classList.remove('buttonActive');
}

// Schließt die Box 'Edit Contact'
function cancelEditContact() {
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