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

// get all the students
app.get('/students', async (req, res) => {
  try {
    const students = await pool.query('SELECT * FROM students');
    res.status(200).json({ message: 'get all students', students: students.rows });
  } catch (error) {
    throw new Error(error);
  }
});

// get  a specific student data
app.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const student = await pool.query('SELECT * FROM students WHERE student_id = $1', [id]);

    res.status(200).json({ student: student.rows[0] });
  } catch (error) {
    throw new Error(error);
  }
});

// delete a specific student
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM students WHERE student_id = $1 RETURNING *', [id]);

    res.status(200).json({ message: 'Student deleted successfully', student: result.rows[0] });
  } catch (error) {
    throw new Error(error);
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, date_of_birth, email, phone_number } = req.body;

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ message: 'first_name, last_name, and email are required' });
    }

    const result = await pool.query('UPDATE students SET first_name = $1, last_name = $2, date_of_birth = $3, email = $4, phone_number = $5 WHERE student_id = $6 RETURNING *', [
      first_name,
      last_name,
      date_of_birth,
      email,
      phone_number,
      id,
    ]);

    res.status(200).json({ message: 'Student updated successfully', student: result.rows });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(3000, () => {
  return console.log(`server is running at http://localhost:${3000}`);
});
