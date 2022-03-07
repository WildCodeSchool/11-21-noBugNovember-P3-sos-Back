//Dependences
const cors = require('cors')
const express = require('express')
//import express from 'express'
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
