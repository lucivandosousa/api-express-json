const express = require("express")
const { v4: uuidv4 } = require('uuid')
const fs = require("fs")
require("dotenv").config() 

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API CRUD com Express e Persistência em JSON")
})

app.post("/produtos", async (req, res) => {
  const id = uuidv4()
  const newProduct = {id, ...req.body}
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  fs.writeFileSync("db.json", JSON.stringify([...produtos, newProduct]))
  res.status(201).send("Produto cadastrado com sucesso.")
})

app.get("/produtos", async (req, res) => {
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  res.status(200).json(produtos)
})

app.get("/produtos/:id", async (req, res) => {
  const {id} = req.params
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  const produto = produtos.filter((item) => item.id == id)
  res.status(200).json(produto)
})

app.put("/produtos/:id", async (req, res) => {
  const {id} = req.params
  const data = req.body
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  const index = produtos.findIndex((item) => item.id == id)
  produtos[index] = {...produtos[index], ...data}
  fs.writeFileSync("db.json", JSON.stringify(produtos))
  res.status(200).send("Produto atualizado com sucesso.")
})

app.delete("/produtos/:id", async (req, res) => {
  const {id} = req.params
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  const index = produtos.findIndex((item) => item.id == id)
  produtos.splice(index, 1)
  fs.writeFileSync("db.json", JSON.stringify(produtos))
  res.status(200).send("Produto excluído com sucesso.")
})

app.listen(port, () => console.log(`Server listening on port ${port}`))