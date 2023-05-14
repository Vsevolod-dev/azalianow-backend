import express from 'express';
const app = express();
import cors from 'cors';
import * as fs from 'fs';
import { NumbersResponse, File, Message } from './types';
import * as dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/messages', (req, res) => {
  try {
    const jsonString = fs.readFileSync('./db.json')
    const parsedFile = JSON.parse(jsonString.toString())

    res.json(parsedFile.messages)
  } catch(err) {
    console.log(err);
  }
});

app.post('/messages/add', (req, res) => {
  if (!req.body.text || typeof req.body.text !== 'string') {
    res.json({error: 'Param "text" is missing or not string'})
    return 
  }

  const obj: Message = {
    text: req.body.text,
    author: "Kirill",  // hardcorded author
    id: Date.now()
  }

  try {
    const jsonString = fs.readFileSync('./db.json')
    const parsedFile: File = JSON.parse(jsonString.toString())

    if (parsedFile && parsedFile.messages) parsedFile.messages.push(obj)

    fs.writeFileSync("./db.json", JSON.stringify(parsedFile));
    res.json(parsedFile)
  } catch(err) {
    console.log(err);
  }
})



app.get('/numbers', (req, res) => {
  try {
    const jsonString = fs.readFileSync('./db.json')
    const parsedFile = JSON.parse(jsonString.toString())

    const struct: NumbersResponse[] = []
    
    for (let i = 0; i < parsedFile.numbers.length; i++) {
      if (i === parsedFile.numbers.length - 1) continue
      struct.push({
        prev: parsedFile.numbers[i],
        current: parsedFile.numbers[i + 1],
        average: (parsedFile.numbers[i + 1] + parsedFile.numbers[i]) / 2
      })
    }

    res.json(struct)
  } catch(err) {
    console.log(err);
  }
});

app.post('/numbers/add', (req, res) => {
  if (!req.body.number || typeof req.body.number !== 'number') {
    res.json({error: 'Param "number" is missing or not string'})
    return 
  }

  const number = req.body.number

  try {
    const jsonString = fs.readFileSync('./db.json')
    const parsedFile: File = JSON.parse(jsonString.toString())

    if (parsedFile && parsedFile.numbers) parsedFile.numbers.push(number)

    let average = null
    const numbersLength = parsedFile.numbers!.length

    if (numbersLength === 1) {
      fs.writeFileSync("./db.json", JSON.stringify(parsedFile));
      res.json({
        current: number,
        prev: null,
        average
      })
      return
    }

    const prev = parsedFile.numbers![numbersLength - 2]
    average = (number + prev!) / 2

    fs.writeFileSync("./db.json", JSON.stringify(parsedFile));
    res.json({
      current: number,
      prev,
      average
    })
  } catch(err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port`)
});
