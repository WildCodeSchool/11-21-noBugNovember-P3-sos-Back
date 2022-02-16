//Dependences
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/index')
const connection = require('./config/db')

require('dotenv').config()

//Variables
const app = express()
const port = process.env.PORT || 3030

// pre-routes middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
// app.use("/api/exemple", routes.exemple);

app.get('/', (req, res) => {
  res.status(200).send('Yo !')
})

app.listen(port, () => {
  console.log(`Server listing on http://localhost:${port}`)
})
