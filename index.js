const express = require('express');
const app = express();
app.use(express.json()); 
const notesRouter = require('./routes/notes');

app.get('/', (req, res) => {
    res.send('server is running from this...');
})

app.use('/notes', notesRouter);

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})