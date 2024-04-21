const STORAGE_TOKEN = 'D27C7VHM5527E2YM6SNX0MENK48ANZKJ394WDZQY';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let todos = [];
let currentPriority = null; 



/* async function setItem(key, value){
    const payload = {key, value, token:STORAGE_TOKEN};
     return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)})
     .then(res => res.json());
} */

/* async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`
    return fetch(url).then(res => res.json()).then(res => res.data.value);
} */



async function loadToDos() {
    try {
        const storedToDos = await getItem('todos');
        if (storedTasks) {
            tasks = JSON.parse(storedToDos);
            console.log('Geladene Aufgaben:', taskstodos);
            // Hier könntest du eine Funktion aufrufen, die diese Aufgaben im UI anzeigt.
        }
    } catch (e) {
        console.error('Fehler beim Laden der Aufgaben:', e);
    }
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }).then(res => res.data.value);
}

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    });
}