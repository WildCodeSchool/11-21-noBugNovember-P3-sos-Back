// INSERT INTO sous_categories (nom_sous_categorie, categorie_id)
// VALUES (?, ?);

const express = require('express')
const router = express.Router()
const mysql = require('../config/db')

// Routes GET
router.get('/', (req, res) => {
  const sql =
    'SELECT id_sous_categorie, nom_sous_categorie, nom_categorie FROM sous_categories LEFT JOIN categories ON id_categorie = categorie_id'
  //Rajout romain v
  let sousCategorie = []

  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from sous_categorie')
      console.error(err)
    } else {
      result.forEach(la =>
        sousCategorie.push({
          id: la.id_sous_categorie,
          value: la.nom_sous_categorie,
          label: la.nom_sous_categorie,
          nomCat: la.nom_categorie
        })
      )
      console.table(sousCategorie)
      res.status(200).json(sousCategorie)
    }
  })
})

// Routes POST
router.post('/', (req, res) => {
  const { nom_sous_categorie, categorie_id } = req.body
  sql =
    'INSERT INTO sous_categories (nom_sous_categorie, categorie_id) VALUES (?,?);'

  mysql.query(sql, [nom_sous_categorie, categorie_id], (err, result) => {
    if (err) {
      res.status(500).send('Error saving sous_categorie')
    } else {
      console.log(result)
      const id = result.insertId
      const createdSousCategorie = { id, nom_sous_categorie, categorie_id }
      res.status(201).json(createdSousCategorie)
    }
  })
})

router.put('/:id', (req, res) => {
  const sous_categorieId = req.params.id
  const sous_categoriePropsToUpdate = req.body
  mysql.query(
    'UPDATE sous_categories SET ? WHERE id_sous_categorie = ?',
    [sous_categoriePropsToUpdate, sous_categorieId],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error updating a sous_categorie')
      } else {
        res.status(200).send('sous_categories updated successfully 🎉')
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const sousCatId = req.params.id
  mysql.query(
    'DELETE FROM sous_categories WHERE id_sous_categorie=?',
    [sousCatId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting a sous-categorie')
      } else {
        if (result.affectedRows) {
          res.status(200).send('🎉 SousCat deleted!')
        } else {
          res.status(404).send('SousCat not found.')
        }
      }
    }
  )
})
module.exports = router
