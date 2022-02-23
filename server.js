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
app.use('/articles',routes.articles)
app.use('/regions', routes.regions)
app.use('/villes', routes.villes) 
app.use('/secteurs',routes.secteurs) //BY BALROG
app.use('/sousCategories',routes.sousCategories) //BY BALROG
app.use('/categories', routes.categories)

app.get('/', (req, res) => {
  res.status(200).send('Yo !')
})

app.listen(port, () => {
  console.log(`Server listing on http://localhost:${port}`)
})
