import fs from 'fs';


export function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0, por eso sumamos 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

export function syncData(document) {
    var json = JSON.stringify(document);
    fs.writeFile('./bd.json', json, 'utf8', function (err) {
        if (err) throw err;
        console.log('complete');
    });
}