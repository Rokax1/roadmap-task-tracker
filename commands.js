import {getCurrentDate,syncData} from './utils.js';
import fs from 'fs';

let DOCUMENT = {
    rows: []
};

const addTask = (task) => {
    DOCUMENT.rows.push({ id: DOCUMENT.rows.length + 1, description: task, status: "todo", createdAt: getCurrentDate(), updatedAt: getCurrentDate() });
    console.log(DOCUMENT, "document");
    syncData(DOCUMENT);
    console.log(`Nueva tarea agregada: ${task}`);
};

const listTasks = (status) => {
    if (status == undefined) {
        console.log(DOCUMENT);
    }

    let filteredTasks = DOCUMENT.rows.filter(taks => taks.status == status);
    console.log(filteredTasks);
};
const updateTask = (id, text) => {
    let taksIndex = DOCUMENT.rows.findIndex(item => item.id == id);
    if (taksIndex == -1) {
        console.log("no se ha podido encontrar la tarea");
    }
    DOCUMENT.rows[taksIndex].description = text;
    DOCUMENT.rows[taksIndex].updatedAt = getCurrentDate();
    syncData(DOCUMENT);
    console.log("Tarea actualizada correctamente");
};

const deleteTask = (id) => {
    let filteredTasks = DOCUMENT.rows.filter(taks => taks.id != id);
    DOCUMENT.rows = filteredTasks;
    console.log(filteredTasks, "filter");
    syncData(DOCUMENT);
    console.log("Tarea eliminada correctamente");

};
const updateStatus = (id, status) => {
    let taksIndex = DOCUMENT.rows.findIndex(item => item.id == id);
    if (taksIndex == -1) {
        console.log("no se ha podido encontrar la tarea");
    }
    DOCUMENT.rows[taksIndex].status = status;
    syncData(DOCUMENT);
    console.log("Tarea actualizada correctamente");

};

export const commands = {
    add: (args) => {
        if (args.length > 2) {
            const task = args.slice(2).join(' ');
            addTask(task);
        } else {
            console.log('Debes especificar el nombre de la tarea.');
        }
    },
    list: (args) => {
        const status = args[2];
        if (!['in-progress', 'todo', 'done', undefined].includes(status)) {
            console.log("El estado no es válido.");
        } else {
            listTasks(status);
        }
    },
    update: (args) => {
        if (args[2] && args[3]) {
            updateTask(args[2], args[3]);
        } else {
            console.log('Debes especificar el ID de la tarea y el nuevo estado.');
        }
    },
    delete: (args) => {
        if (args[2]) {
            deleteTask(args[2]);
        } else {
            console.log('Debes especificar el ID de la tarea a eliminar.');
        }
    },
    mark: (args) => {
        const [command, id] = [args[1], args[2]];
        let status = args[1].split('-').slice(1).join('-');
        console.log(status);
        if (['in-progress', 'todo', 'done'].includes(status)) {
            updateStatus(id, status);
        } else {
            console.log("El estado no es válido.");
        }
    }
};

export function createFile() {
    console.log("init");
    if (fs.existsSync('./bd.json')) {
        loadData();
        return;
    }
    var json = JSON.stringify(DOCUMENT);
    fs.writeFile('./bd.json', json, 'utf8', function (err) {
        if (err) throw err;
        console.log('complete');
    });
}

 function loadData() {

    let data = fs.readFileSync('./bd.json', 'utf8');
    let tasks;
    try {
        tasks = JSON.parse(data);
        DOCUMENT = tasks;
    } catch (parseError) {
        console.error('Error al parsear el archivo JSON:', parseError);
        return;
    }
}

