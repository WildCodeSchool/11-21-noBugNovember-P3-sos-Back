const express = require('express')
const router = express.Router()
const mysql = require('../config/db')
const Joi = require('joi')

// router.get('/', (req,res) => {
//     res.status(200).send("Dans régions")
// })

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

// Routes PUT

router.put('/:id', (req, res) => {
  const regionId = req.params.id
  const db = mysql.promise() //Utiliser les promesses
  let existingRegion = null //Variable pour check si existe

  db.query('SELECT * FROM regions WHERE id_region = ? ', [regionId])
    .then(([result]) => {
      existingRegion = result[0]
      if (!existingRegion) return Promise.reject('RECORD_NOT_FOUND')
      return db.query('UPDATE regions SET ? WHERE id_region = ?', [
        req.body,
        regionId
      ])
    })
    .then(() => {
      res.status(200).json({ ...existingRegion, ...req.body })
    })
    .catch(err => {
      console.error(err)
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Region with id ${regionId} not found.`)
      else res.status(500).send('Error updating a user')
    })
})


// Route Delete 

router.delete('/:id',(req,res) => {
  const regionId= req.params.id
  const sql = 'DELETE FROM regions WHERE id_region=?'
  mysql.query(sql , [regionId], (err, result) => {
    if (err ){
      console.error(err)
      res.status(500).send('Error deleting a Region')
    } else {
      if (result.affectedRows) { res.status(200).send('🎉 Région effacée !')}
      else res.status(404).send(`La région avec l'Id ${regionId} n'existe pas`)
    }
  }

  )
})

module.exports = router
