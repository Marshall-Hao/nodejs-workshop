const express = require('express')
const app = express()
const faker =  require('faker')
const bodyParser = require('body-parser')
const _ = require('lodash')

app.use(express.json()) // get body info #middle where no const then its globally

let db = [
]

for (var i = 0; i < 50; i++) {
  db.push({
    id: i + 1,
    name: faker.name.findName(),
    company: faker.company.companyName()
  })
}

app.get('/',(req, res) => {
  res.json(db)
})

app.get('/:id',(req, res) => {
  const id = req.params.id
  const person = db.find(element => element.id == id)
  if (person != null) {
    res.json(person)
  } else {
    console.log('okkk')
    res.json('No such person')
  }
})

app.delete('/:id', (req, res) => {
  _.remove(db, (element => element.id == req.params.id))
  res.json(db)
})

app.post('/', (req, res) => {
  const newId = db[db.length -1].id + 1
  const body = req.body
  const newItem = Object.assign({id: newId}, body)
  db.push(newItem)
  res.json(db)
})

app.put('/:id', (req,res) => {
  const id = req.params.id
  var person = db.find(element => element.id == id)
  var body = req.body
  if(person != null) {
    const editItem = Object.assign({id:id}, body)
    db[id-1].name = body.name
    db[id-1].company = body.company
    res.json(db)
  } else {
    res.json('No such person')
  }
})

app.listen(5000, () => {
  console.log('I am running on port 5000')
})
