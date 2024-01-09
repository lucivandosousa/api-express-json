const express = require("express")
const productController = require("../controllers/productsController")

const routes = express.Router()

routes.get("/", (req, res) => {
  res.send("API CRUD com express e persistência de dados em JSON")
})

routes.post("/produtos", productController.cadastrarProduto)

routes.get("/produtos", productController.buscarProdutos)

routes.get("/produtos/:id", productController.buscarProdutoPorID)

routes.put("/produtos/:id", productController.atualizarProduto)

routes.delete("/produtos/:id", productController.excluirProduto)

module.exports = {routes}