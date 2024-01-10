const express = require("express")
const ProductController = require("../controllers/ProductsController")

class ProductRoutes {
  constructor() {
    this.routes = express.Router()
    this.setupRoutes()
  }

  setupRoutes() {
    this.routes.get("/", (req, res) => {
      res.send("API CRUD com express e persistência de dados em JSON")
    })
    
    this.routes.post("/produtos", ProductController.cadastrarProduto)
    
    this.routes.get("/produtos", ProductController.buscarProdutos)
    
    this.routes.get("/produtos/:id", ProductController.buscarProdutoPorID)
    
    this.routes.put("/produtos/:id", ProductController.atualizarProduto)
    
    this.routes.delete("/produtos/:id", ProductController.excluirProduto)
  }

  getRoutes() {
    return this.routes
  }  
}

module.exports = ProductRoutes
