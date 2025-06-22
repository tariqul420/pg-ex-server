const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'First time postgresql' });
});

// create a book
app.post('/students', async (req, res) => {
  try {
    const { first_name, last_name, date_of_birth, email, phone_number } = req.body;

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ message: 'first_name, last_name, and email are required' });
    }

    const result = await pool.query('INSERT INTO students(first_name, last_name, date_of_birth, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      first_name,
      last_name,
      date_of_birth,
      email,
      phone_number,
    ]);

    res.status(201).json({ student: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get /students --> return all the students
app.get('/students', async (req, res) => {
  try {
    const students = await pool.query('SELECT * FROM students');
    res.status(200).json({ message: 'get all students', students: students.rows });
  } catch (error) {
    throw new Error(error);
  }
});

// get students/:id --> return a specific book
app.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: 'get specific students' + 'book id ' + id });
  } catch (error) {
    throw new Error(error);
  }
});

// get students/:id --> return a specific book
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: 'get specific students' + 'book id ' + id });
  } catch (error) {
    throw new Error(error);
  }
});

app.put('/students/:id', async (req, res) => {
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

app.listen(3000, () => {
  return console.log(`server is running at http://localhost:${3000}`);
});
