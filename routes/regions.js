const express = require('express')
const router = express.Router()
const mysql = require('../config/db')

// router.get('/', (req,res) => {
//     res.status(200).send("Dans régions")
// })

// Routes GET

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM regions'
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from regions')
      console.error(err)
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})

// Routes POST

router.post('/', (req, res) => {
  const { nom_region } = req.body
  sql = 'INSERT INTO regions (nom_region) VALUES (?);'

  mysql.query(sql, [nom_region], (err, result) => {
    if (err) {
      res.status(500).send('Error saving region')
    } else {
      console.log(result)
      const id = result.insertId
      const createdRegion = { id, nom_region }
      res.status(201).json(createdRegion)
    }
  })
})

module.exports = router
