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

//http://localhost:3000/notes/edit-note/3
// {
//     "title": "Six Note",
//     "content": "Updated content"
// }
//with put we will have to pass the whole request model with all properties whatever is updated or not updated
router.put('/edit-note/:id', (req, res) => {
    const noteIndex = notes.findIndex(x => x.id == req.params.id);
    if(noteIndex !== -1){
        notes[noteIndex] = {
            id: notes[noteIndex].id,
            title: req.body.title,
            content: req.body.content
        }
        res.status(200).json(notes);
    } else {
        res.status(404).json({erorr: "note not found."})
    }
})

//http://localhost:3000/notes/update-note/4
//{
//      "title": "Fifth Note"
//}
//with patch we can update only one property of result model as well, if not the whole model change needed
router.patch('/update-note/:id', (req, res) => {
    const noteIndex = notes.findIndex(x => x.id == req.params.id);
    if(noteIndex){
        notes[noteIndex] = {
            ...notes[noteIndex],
            ...req.body
        }
        res.status(200).json(notes)
    } else {
        res.status(404).json({error: "note not found."})
    }
})

//http://localhost:3000/notes/delete-note/3
router.delete('/delete-note/:id', (req, res) => {
    const noteIndex = notes.findIndex(x => x.id == req.params.id);
    if(noteIndex != -1){
        notes.splice(noteIndex, 1);
        res.status(200).json(notes);
    } else {
        res.status(404).json({erorr: "note not found."})
    }
})

module.exports = router;