const express = require('express')
const villesRouter = express.Router()
const Ville = require('../models/villes')
const mysql = require('../config/db')

// // Routes GET
// villesRouter.get('/', (req, res) => {
//   const sql = 'SELECT id_ville, nom_ville, region_id FROM villes'
//   //Rajout romain v
//   let ville = []

//   mysql.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).send('Error retrieving data from villes')
//       console.error(err)
//     } else {
//       //rajout romain v
//       // Le map du front s'est fait remplacé par le for EACH
//     }
//   })
// })

// READ ALL
villesRouter.get('/', (req, res) => {
  const ville = []
  const { regions, region } = req.query
  // const{region}=req.query.id
  Ville.findMany({ filters: { regions, region } })
    .then(result => {
      result.forEach(la =>
        ville.push({
          id: la.id_ville,
          value: la.nom_ville,
          label: la.nom_ville,
          id_region: la.region_id,
          nom_region: la.nom_region
        })
      )
      console.table(ville)
      res.status(200).json(ville)
    })
    .catch(err => {
      res.status(500).send('Error retrieving villes from database')
    })
})

//READ ONE
villesRouter.get('/:id', (req, res) => {
  Ville.findOne(req.params.id)
    .then(villes => {
      if (villes) {
        res.status(200).json(villes)
      } else {
        res.status(404).send('Ville not found')
      }
    })
    .catch(err => {
      res.status(500).send('Error retrieving Ville from database')
    })
})

//ADD ONE
villesRouter.post('/', (req, res) => {
  console.log(req.body, '2')
  let existingVille = null
  let validationErrors = null
  Ville.findVille(req.body)
    // console.log(req.body,"7")
    .then(ville => {
      console.log(ville, '6')
      existingVille = ville
      if (existingVille) return Promise.reject('DUPLICATE_DATA')
      validationErrors = Ville.validate(req.body)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return Ville.create(req.body)
    })
    .then(createdVille => {
      res.status(201).json(createdVille)
    })
    .catch(err => {
      console.error(err)
      if (err === 'DUPLICATE_DATA') {
        res.status(409).send('Ville already exist')
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({
          validationErrors: validationErrors.details
        })
      } else {
        res.status(500).send('Error saving the ville')
      }
    })
})

//UPDATE ONE
villesRouter.put('/:id', (req, res) => {
  let existingVille = null
  let validationErrors = null
  Ville.findOne(req.params.id)
    .then(ville => {
      existingVille = ville
      if (!existingVille) return Promise.reject('RECORD_NOT_FOUND')
      validationErrors = Ville.validate(req.body, false)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return Ville.update(req.params.id, req.body)
    })
    .then(() => {
      res.status(200).json({ ...existingVille, ...req.body })
    })
    .catch(err => {
      console.error(err)
      if (err === 'RECORD_NOT_FOUND') {
        res.status(422).json({ validationErrors: validationErrors.details })
      } else {
        res.status(500).send('Error updating this ville')
      }
    })
})

villesRouter.delete('/:id', (req, res) => {
  Ville.destroy(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).send('🎉 Ville successfully deleted!')
      } else {
        res.status(404).send(`Ville with id ${req.params.id} not found`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting this ville')
    })
})

module.exports = villesRouter
