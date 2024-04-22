let contacts = [
    {
        "name": "Julia Schäffer",
        "email": "julia.sch@hotmail.de",
        "phone": "+491778965144",
        "profileColor": "rgb(255, 161, 46)",
        "initialien": "JS"
    },
    {
        "name": "Phillip Schönborn",
        "email": "philipp@schoenborn-home.de",
        "phone": "+49438721221",
        "profileColor": "yellow",
        "initialien": "PS"
    },
    {
        "name": "Tobias Mueller",
        "email": "webstor21@gmail.com",
        "phone": "+49152341609",
        "profileColor": "rgb(232, 58, 58)",
        "initialien": "TM"
    },
    {
        "name": "Nathalie Strauchmann",
        "email": "strauchmann89@yahoo.de",
        "phone": "+49151338395",
        "profileColor": "rgb(139, 42, 224)",
        "initialien": "NS"
    },
    {
        "name": "Melanie Müller",
        "email": "m.muellerstreich@gmail.com",
        "phone": "+491760152757",
        "profileColor": "rgb(255, 46, 46)",
        "initialien": "MM"
    },
    {
        "name": "Herbert Peter",
        "email": "Petermann@hotmail.de",
        "phone": "+491723687234",
        "profileColor": "rgb(232, 58, 133)",
        "initialien": "HP"
    },
    {
        "name": "Heiko Lee",
        "email": "h.lee99@home.com",
        "phone": "",
        "profileColor": "rgb(232, 58, 58)",
        "initialien": "HL"
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
        const initials = contact['initialien'];
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
        const profileColor = contact['profileColor'];

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
        contactItem.addEventListener('click', handleClick);
        function handleClick(event) {
            // Stelle sicher, dass nur das geklickte Element behandelt wird
            if (event.target === contactItem || event.target.parentElement === contactDetails) {
                // Rufe die Kontaktinformationen mit dem aktuellen Kontakt ab
                contactClickHandler(contact, i);
            }
        }
    }
}


// Funktion, die beim Klicken auf den Kontakt oder Kontaktinformationen aufgerufen wird
function contactClickHandler(contact, i) {
    let contactSection = document.getElementById('contacts');
    contactSection.innerHTML ='';
    contactSection.innerHTML = ` <div id="contactInfo">
    <div id="whiteCircle">
      <div id="initials" style="background-color: ${contact.profileColor}">
        <h1>${contact.initialien}</h1>
      </div>
    </div>
    <div id="nameAndEditButton">
      <h1>${contact.name}</h1>
      <div id="editDiv">
        <div id="edit" onclick="showeditContact(${i})"><img src="img/edit.png" alt="edit">
          <p>Edit</p>
        </div>
        <div onclick="deleteContact(${i})" id="delete"> <img src="img/delete.png" alt="delete">
          <p>Delete</p>
        </div>
      </div>
    </div>
  </div>
  <div id="contactInformation">
    <h2>Contact Information</h2>
  </div>
  <div id="contactContent">
    <div id="emailBox">
      <h3>Email</h3>
      <a href="mailto:julia.sch@hotmail.de">${contact.email}</a>
    </div>
    <div id="phoneBox">
      <h3>Phone</h3>
      <p>${contact.phone}</p>
    </div>
  </div>`;
}

function deleteContact(i){
        contacts.splice(i, 1);
        save();
        renderContacts();
        document.getElementById('contacts').innerHTML = '';
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
    if (name.value == '' || email.value == '' || phone.value == '') {
        document.getElementById('addNewContactAlert').innerHTML = '';
        document.getElementById('addNewContactAlert').innerHTML = '<p>the fields must be filled</p>';
    } else {
        const colorIndx = Math.floor(Math.random() * beautifulColors.length); // Zufälliger Index für Farbe
        const color = beautifulColors[colorIndx];
        const initial = extractInitials(name.value);
        const newContact = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            profileColor: color,
            initialien : initial,
        };
        contacts.push(newContact);
        contactClickHandler(newContact);
        save();
        createContactList();
        name.value = '';
        email.value = '';
        phone.value = '';
        cancelAddContact();
        slideSuccessfully();
    }
}


function slideSuccessfully() {
    let container = document.getElementById('successfullyContainer');
    let successfully = document.getElementById('successfully');

    // Stellen Sie sicher, dass der Container sichtbar ist, um die Animation zu zeigen
    container.style.display = 'flex';

    // Fügen Sie die Klasse für die Animation hinzu
    successfully.classList.add('slide-in-bottom');

    // Setzen Sie eine Verzögerung, um der Animation Zeit zum Abspielen zu geben
    setTimeout(() => {
        // Entfernen Sie die Animation, nachdem sie abgespielt wurde
        successfully.classList.remove('slide-in-bottom');

        // Verstecken Sie den Container wieder
        container.style.display = 'none';
    
    }, 1000); // Warten Sie z.B. 1000 Millisekunden (1 Sekunde)
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
function showeditContact(i) {
    document.getElementById('editContact').classList.add('editContactActive');
    document.getElementById('blurBackground').classList.remove('d-none');
    const contact = contacts[i];
    const color = contact['profileColor'];
    document.getElementById('editSecondSectione').innerHTML = '';
    document.getElementById('editSecondSectione').innerHTML = editContactHTML(i);
    document.getElementById('editName').value =`${contact.name}`;
    document.getElementById('editEmail').value =`${contact.email}`;
    document.getElementById('editPhone').value =`${contact.phone}`;
    document.getElementById('initialsEditContact').style = `background-color: ${color};`;
    document.getElementById('initialsText').innerHTML =`${contact.initialien}`;
}

function editContactHTML(i) {
    return `<div id="contactInput" class="contactInput">
    <div id="profilepicture">
      <div id="whiteCircle">
        <div id="initialsEditContact">
          <h1 id="initialsText"></h1>
        </div>
      </div>
    </div>
    <div id="inputDiv" onclick="writeContact(event.stopPropagation())">
      <div id="inputBox1" class="inputBox inputBox1"><input id="editName" required type="text" placeholder="Name"> <img
          src="img/person.png" alt=""></div>
      <div class="inputBox"><input type="text" id="editEmail" required placeholder="Email"> <img src="img/mail.png" alt=""></div>
      <div class="inputBox"><input type="text" id="editPhone" required placeholder="Phone"> <img src="img/call.png" alt=""></div>
    </div>
    <div id="btnDiv">
      <button onclick="cancelEditContact();deleteContact(${i}) " id="deleteButton">Delete</button>
      <button onclick="editContactToArray(${i})" id="safeButton">Safe <img src="img/check_whitepng.png" alt=""></button>
    </div>
  </div>`;
}

function editContactToArray(i) {
    let contact = contacts[i];
    let name = document.getElementById('editName');
    let email = document.getElementById('editEmail');
    let phone = document.getElementById('editPhone');
    const initial = extractInitials(name.value);
    const newContact = {
        "name": name.value,
        "email": email.value,
        "phone": phone.value,
        "profileColor": contact.profileColor,
        "initialien": initial
    };
    contacts.splice(i, 1, newContact);
    contactClickHandler(newContact);
    cancelEditContact();
    createContactList();
    save();
    
}


// Öffnet die Box 'Add new Contact'
function showAddContact() {
    document.getElementById('addNewContactAlert').innerHTML = '';
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