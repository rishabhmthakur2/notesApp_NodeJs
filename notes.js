const fs = require('fs');

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

module.exports = {
    addNote,
    removeNote
};