const express = require('express');
const router = express.Router();

let notes = require('../data/notes')
const validateNote = require('../middlewares/validateNote')

//http://localhost:3000/notes/all-notes
router.get('/all-notes', (req, res)=>{
    res.json(notes);
})

//http://localhost:3000/notes/7
router.get('/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if(!note){
        return res.status(404).json({error: "Note not found."});
    }
    res.json(note);
})

//http://localhost:3000/notes/create-note
//{
//     "title": "exprsss Note",
//     "content": "test content for this"
// }
router.post('/create-note', validateNote, (req, res) => {
    const newNote = {
        id: notes.length + 1,
        title: req.body.title,
        content: req.body.content
    }
    notes.push(newNote);
    res.status(201).json(notes);
})

module.exports = router;