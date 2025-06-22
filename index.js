const express = require('express');

const app = express();

app.listen(7000, () => {
  return console.log(`server is running at http://localhost:${7000}`);
});

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'First time postgresql' });
});

// create a book
app.post('/books', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    res.status(201).json({ message: 'Book created successfully', book: { title, description } });
  } catch (error) {
    throw new Error(error);
  }
});

// get /books --> return all the books
app.get('/books', async (req, res) => {
  try {
    res.status(200).json({ message: 'get all books' });
  } catch (error) {
    throw new Error(error);
  }
});

// get books/:id --> return a specific book
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: 'get specific books' + 'book id ' + id });
  } catch (error) {
    throw new Error(error);
  }
});

// get books/:id --> return a specific book
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: 'get specific books' + 'book id ' + id });
  } catch (error) {
    throw new Error(error);
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    res.status(200).json({ message: 'Book updated successfully', book: { id, title, description } });
  } catch (error) {
    throw new Error(error);
  }
});
