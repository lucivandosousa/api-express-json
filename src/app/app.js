const express = require("express")
const { routes: routesProducts } = require("../routes/productsRoutes") 

const app = express()

app.use(express.json())

app.use(routesProducts)

module.exports = app
