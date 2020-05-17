const chalk = require('chalk');
const yargs = require('yargs');
const notesHandler = require('./notes.js');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Content of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notesHandler.addNote(argv.title, argv.body)
});

yargs.command({
    command: 'remove',
    describe: 'Removing the specified note',
    handler: (argv) => notesHandler.removeNote(argv.title)
});

yargs.command({
    command: 'list',
    describe: 'Listing out all the notes',
    handler: () => console.log("List of notes")
});

yargs.command({
    command: 'read',
    describe: 'Read a particular node',
    handler: () => console.log("Notes")
});

yargs.parse();