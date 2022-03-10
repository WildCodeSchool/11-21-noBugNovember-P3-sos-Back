const express = require('express')
const Joi = require('Joi')
const connection = require('../config/db')
const secteursRouter = express.Router()
const Secteur = require('../models/secteurs')
const mysql = require('../config/db')

// Routes GET
// router.get('/', (req, res) => {
//     const sql = 'SELECT * FROM secteurs'
//     mysql.query(sql, (err, result) => {
//     if (err) {
//         res.status(500).send('Error retrieving data from secteur')
//         console.error(err)
//     } else {
//         console.table(result)
//         res.status(200).json(result)
//     }
//     })
// })

//READ ALL
secteursRouter.get('/', (req, res) => {
  let secteur = []
  Secteur.findMany()
    .then(result => {
      result.forEach(la =>
        secteur.push({
          id: la.id_secteur,
          value: la.nom_secteur,
          label: la.nom_secteur
        })
      )
      console.table(secteur)
      res.status(200).json(secteur)
    })
    .catch(err => {
      res.status(500).send('Error retrieving secteurs from database')
    })
})

//READ ONE
secteursRouter.get('/:id', (req, res) => {
  Secteur.findOne(req.params.id)
    .then(Secteur => {
      if (Secteur) {
        res.status(200).json(Secteur)
      } else {
        res.status(404).send('secteurs not found')
      }
    })
    .catch(err => {
      res.status(500).send('Error retrieving secteur from database')
    })
})

// Routes POST

// router.post('/', (req, res) => {
//     const { nom_secteur } = req.body
//     sql = 'INSERT INTO secteurs (nom_secteur) VALUES (?);'

//     mysql.query(sql, [nom_secteur], (err, result) => {
//       if (err) {
//         res.status(500).send('Error saving secteur')
//       } else {
//         console.log(result)
//         const id = result.insertId
//         const createdSecteur = { id, nom_secteur }
//         res.status(200).json(createdSecteur)
//         //
//       }
//     })
//   })

secteursRouter.post('/', (req, res) => {
  let existingsecteur = null
  let validationErrors = null
  Secteur.findSecteur(req.body)
    // console.log(req.body,"7")
    .then(secteur => {
      // console.log(sousCat,"6")
      existingsecteur = secteur
      if (existingsecteur) return Promise.reject('DUPLICATE_DATA')
      validationErrors = Secteur.validate(req.body)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return Secteur.create(req.body)
    })
    .then(createdsecteur => {
      res.status(201).json(createdsecteur)
    })
    .catch(err => {
      console.error(err)
      if (err === 'DUPLICATE_DATA') {
        res.status(409).send('secteur already exist')
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({
          validationErrors: validationErrors.details
        })
      } else {
        res.status(500).send('Error saving the secteur')
      }
    })
})

// router.put("/:id", (req, res) => {
//   const secteurId = req.params.id;
//   const secteurPropsToUpdate = req.body;
//     mysql.query(
//     "UPDATE secteurs SET ? WHERE id_secteur = ?",
//     [secteurPropsToUpdate, secteurId],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error updating a secteur");
//       } else {
//         res.status(200).send("secteur updated successfully 🎉");
//       }
//     }
//   )
// });

// UPDATE ONE
secteursRouter.put('/:id', (req, res) => {
  let existingsecteur = null
  let validationErrors = null
  let duplicateErrors = null

  Promise.all([
    Secteur.findOne(req.params.id),
    Secteur.findBySecteurtWithDifferentId(req.body.nom_secteur, req.params.id)
  ])
    .then(([secteur, otherWithDifferentId]) => {
      existingsecteur = secteur
      if (!existingsecteur) return Promise.reject('RECORD_NOT_FOUND')
      if (otherWithDifferentId) return Promise.reject('DUPLICATE_DATA')
      validationErrors = Secteur.validate(req.body, false)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return Secteur.update(req.params.id, req.body)
    })
    .then(() => {
      res.status(200).json({ ...existingsecteur, ...req.body })
    })
    .catch(err => {
      console.error(err)
      if (err === 'RECORD_NOT_FOUND') {
        res.status(404).send(`Secteur with id ${req.params.id} not found.`)
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors: validationErrors.details })
      } else if (err === 'DUPLICATE_DATA') {
        console.log(req.body, '8')
        res.status(409).send('already exist')
      } else {
        res.status(500).send('Error updating a secteur')
      }
    })
})

secteursRouter.delete('/:id', (req, res) => {
  const secteurId = req.params.id
  console.log(secteurId)
  mysql.query(
    'DELETE FROM secteurs WHERE id_secteur = ?',
    [secteurId],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('😱 Error deleting an secteur')
      } else {
        res.sendStatus(204)
      }
    }
  )
})

module.exports = secteursRouter
