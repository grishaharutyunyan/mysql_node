import express from 'express';

import { getNotes, getNote, createNote } from './database.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Notes API' });
});


app.get('/notes', async (req, res) => {
  try {
    const notes = await getNotes();
    res.send(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const note = await getNote(id);
    if (note) {
      res.send(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/notes', async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title,contents)
  res.send(note)
  console.log(note)
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
