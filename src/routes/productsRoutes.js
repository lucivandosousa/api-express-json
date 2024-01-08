const express = require("express")
const { v4: uuidv4 } = require('uuid')
const fs = require("fs")

const routes = express.Router()

routes.get("/", (req, res) => {
  res.send("API CRUD com express e persistência de dados em JSON")
})

routes.post("/produtos", async (req, res) => {
  const id = uuidv4()
  const newProduct = {id, ...req.body}
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  fs.writeFileSync("db.json", JSON.stringify([...produtos, newProduct]))
  res.status(201).send("Produto cadastrado com sucesso.")
})

routes.get("/produtos", async (req, res) => {
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  res.status(200).json(produtos)
})

routes.get("/produtos/:id", async (req, res) => {
  const {id} = req.params
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  const produto = produtos.filter((item) => item.id == id)
  res.status(200).json(produto)
})

routes.put("/produtos/:id", async (req, res) => {
  const {id} = req.params
  const data = req.body
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  const index = produtos.findIndex((item) => item.id == id)
  produtos[index] = {...produtos[index], ...data}
  fs.writeFileSync("db.json", JSON.stringify(produtos))
  res.status(200).send("Produto atualizado com sucesso.")
})

routes.delete("/produtos/:id", async (req, res) => {
  const {id} = req.params
  const produtos = await JSON.parse(fs.readFileSync("db.json"))
  const index = produtos.findIndex((item) => item.id == id)
  produtos.splice(index, 1)
  fs.writeFileSync("db.json", JSON.stringify(produtos))
  res.status(200).send("Produto excluído com sucesso.")
})

module.exports = {routes}