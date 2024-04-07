const STORAGE_TOKEN = 'D27C7VHM5527E2YM6SNX0MENK48ANZKJ394WDZQY';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item'

async function setItem(key, value){
    const payload = {key, value, token:STORAGE_TOKEN};
     return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)});
}

async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`
    return fetch(STORAGE_URL);
}