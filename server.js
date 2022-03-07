//Dependences
const cors = require('cors')
const express = require('express')
<<<<<<< HEAD
=======
//import express from 'express'
>>>>>>> 1d4b6fd0e8eba21bc05fb94c6a545b45faca73f1
const morgan = require('morgan')
// const routes = require('./routes/index')
const {setupRoutes} = require('./routes')
const connection = require('./config/db')

require('dotenv').config()

//Variables
const app = express()
const port = process.env.PORT || 3030


//connection test Mysql
connection.connect((err) => {
	if (err) {
		console.error("error connecting: " + err.stack)
	} else {
		console.log("connected to database with threadId :  " + connection.threadId)
	}
})

// pre-routes middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes

setupRoutes(app);

app.get('/', (req, res) => {
  res.status(200).send('Yo !')
})

app.listen(port, () => {
  console.log(`Server listing on http://localhost:${port}`)
})
