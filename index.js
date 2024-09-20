#!/usr/bin/env node
import { commands, createFile } from './commands.js';

function executeCommand(args) {
    createFile();
    const command = args[1].split('-')[0];
    if (commands[command]) {
        commands[command](args);
    } else if (args[1].startsWith('mark') && args[2]) {
        commands.mark(args);
    } else {
        console.log('Comando no válido. Usa: task-cli add "Nombre de la tarea".');
    }
}
const args = process.argv.slice(2);
executeCommand(args);



