const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateEntries = notes.filter((note) => note.title === title);
    if(duplicateEntries.length === 0){
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
    // let flag = 0;
    // notes.filter((note) => {
    //     if(note.title === title){
    //         notes.pop(note);
    //         console.log(`Note removed: ${note.title}`);
    //         flag = flag + 1;
    //     }
    // saveNotes(notes);
    // });
    // if(flag === 0) {
    //     console.log("No such note exists");
    // }
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

module.exports = {
    addNote,
    removeNote,
    listNotes
};