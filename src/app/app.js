const express = require("express")
const ProductRoutes = require("../routes/ProductsRoutes")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger.json")

const app = express()

const productRoutes = new ProductRoutes()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(productRoutes.getRoutes())

module.exports = app
