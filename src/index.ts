import express from 'express';
const app = express();
import cors from 'cors';
import * as fs from 'fs';
const PORT = 3001 || process.env.PORT

app.use(cors())

app.get('/messages', (req, res) => {
  try {
    const jsonString = fs.readFileSync('./db.json')
    const parsedFile = JSON.parse(jsonString.toString())

    res.json(parsedFile.messages)
  } catch(err) {
    console.log(err);
  }
});

app.get('/numbers', (req, res) => {
  try {
    const jsonString = fs.readFileSync('./db.json')
    const parsedFile = JSON.parse(jsonString.toString())

    res.json(parsedFile.numbers)
  } catch(err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port`)
});
