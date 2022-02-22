const express = require('express')
const router = express.Router()
const mysql = require('../config/db')

// Routes GET
router.get('/', (req, res) => {
  const sql = 'SELECT nom_ville FROM villes'
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from villes')
      console.error(err)
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})

// Routes POST

router.post('/', (req, res) => {
  const { nom_ville, region_id } = req.body
  sql = 'INSERT INTO villes (nom_ville, region_id) VALUES (?,?);'

  mysql.query(sql, [nom_ville, region_id], (err, result) => {
    if (err) {
      res.status(500).send('Error saving ville')
    } else {
      console.log(result)
      const id = result.insertId
      const createdVille = { id, nom_ville, region_id }
      res.status(201).json(createdVille)
    }
  })
})




module.exports = router
