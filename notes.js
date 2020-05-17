const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        const note = {
            title,
            body
        };
        notes.push(note);
        saveNotes(notes);
        console.log('Note added to the list');
    }
    else {
        console.log("Note with similar title already exists ");
    }
};


const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title != title);
    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(`Note removed: ${title}`);
    }
    else{
        console.log("No such note exists");
    }
};

const saveNotes = (notes) => fs.writeFileSync('notes.txt',JSON.stringify(notes));

const loadNotes = () => {
    try{
        const notesBuffer = fs.readFileSync('notes.txt');
        const notesString = notesBuffer.toString();
        const notesJSON = JSON.parse(notesString);
        return notesJSON;
    } catch (error) {
        return [];
    }
};

const listNotes = () =>{
    const notes = loadNotes();
    if(notes.length>0){
        console.log(chalk.green.bold("List of your notes"));
        notes.forEach( (note) => console.log(`-> ${note.title}`));
    }
    else{
        console.log(chalk.red("Your list doesn't have any notes"));
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    const noteSelected = notes.find((note) => note.title === title);
    if(noteSelected){
        console.log(chalk.red.bold.inverse(noteSelected.title),"\n" + noteSelected.body);
    }
    else {
        console.log(chalk.red("Note not found in list"));
    }
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};