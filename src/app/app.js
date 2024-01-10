const express = require("express")
const ProductRoutes = require("../routes/ProductsRoutes") 

const app = express()

const productRoutes = new ProductRoutes()

app.use(express.json())

app.use(productRoutes.getRoutes())

module.exports = app
