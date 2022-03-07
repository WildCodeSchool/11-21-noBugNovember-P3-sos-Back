// INSERT INTO categories (nom_categorie)
// VALUES (?);
const express = require('express')
const router = express.Router()
const mysql = require('../config/db')

// router.get('/', (req,res) => {
//     res.status(200).send("Dans régions")
// })

// Routes GET

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM categories'
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from categories')
      console.error(err)
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})

// Routes POST

router.post('/', (req, res) => {
  const { nom_categorie } = req.body
  sql = 'INSERT INTO categories (nom_categorie) VALUES (?);'

  mysql.query(sql, [nom_categorie], (err, result) => {
    if (err) {
      res.status(500).send('Error saving categorie')
    } else {
      console.log(result)
      const id = result.insert
      const createdCategorie = { id, nom_categorie }
      res.status(201).json(createdCategorie)
    }
  })
})

router.put('/:id', (req, res) => {
  const categorieId = req.params.id
  const categoriePropsToUpdate = req.body
  mysql.query(
    'UPDATE categories SET ? WHERE id_categorie = ?',
    [categoriePropsToUpdate, categorieId],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating a categorie')
      } else {
        res.status(200).send('Categorie updated successfully 🎉')
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const userId = req.params.id
  console.log(userId)
  mysql.query(
    'DELETE FROM categories WHERE id_categorie = ?',
    [userId],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('😱 Error deleting an user')
      } else {
        res.sendStatus(204)
      }
    }
  )
})

module.exports = router
