const express = require('express')
const router = express.Router()
const mysql = require('../config/db')


// Routes GET
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM secteurs'
    mysql.query(sql, (err, result) => {
    if (err) {
        res.status(500).send('Error retrieving data from secteur')
        console.error(err)
    } else {
        console.table(result)
        res.status(200).json(result)
    }
    })
})

// Routes POST

router.post('/', (req, res) => {
    const { nom_secteur } = req.body
    sql = 'INSERT INTO secteurs (nom_secteur) VALUES (?);'
  
    mysql.query(sql, [nom_secteur], (err, result) => {
      if (err) {
        res.status(500).send('Error saving secteur')
      } else {
        console.log(result)
        const id = result.insertId
        const createdSecteur = { id, nom_secteur }
        res.status(200).json(createdSecteur)
        // 
      }
    })
  })
  
  module.exports = router