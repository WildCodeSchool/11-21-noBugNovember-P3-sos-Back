const express = require('express')

const sousCategoriesRouter = express.Router()
const SousCategorie = require('../models/sousCategories')



//READ ALL
sousCategoriesRouter.get('/', (req, res) => {
  const{categorie}=req.query
  let sousCategorie = []
  SousCategorie.findMany({filters:{categorie}}).then(result => {
      result.forEach(la =>
        sousCategorie.push({
          id: la.id_sous_categorie,
          value: la.nom_sous_categorie,
          label: la.nom_sous_categorie,
          idCat:la.categorie_id,
          nomCat: la.nom_categorie
        })
      )
      res.status(200).json(sousCategorie)
    })
    .catch(err => {
      res.status(500).send('Error retrieving sous-categories from database')
    })
})

//READ ONE
sousCategoriesRouter.get('/:id', (req, res) => {
  SousCategorie.findOne(req.params.id)
    .then(sousCategorie => {
      if (sousCategorie) {
        res.status(200).json(sousCategorie)
      } else {
        res.status(404).send('sous-categories not found')
      }
    })
    .catch(err => {
      res.status(500).send('Error retrieving sous-categorie from database')
    })
})



// ADD ONE
sousCategoriesRouter.post('/', (req, res) => {
  let existingsousCat = null
  let validationErrors = null
  SousCategorie.findSousCat(req.body)
    .then(sousCat => {
      existingsousCat = sousCat
      if (existingsousCat) return Promise.reject('DUPLICATE_DATA')
      validationErrors = SousCategorie.validate(req.body)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return SousCategorie.create(req.body)
    })
    .then(createdsousCat => {
      res.status(201).json(createdsousCat)
    })
    .catch(err => {
      console.error(err)
      if (err === 'DUPLICATE_DATA') {
        res.status(409).send('sous-categorie already exist')
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({
          validationErrors: validationErrors.details
        })
      } else {
        res.status(500).send('Error saving the sous-categorie')
      }
    })
})



// UPDATE ONE
sousCategoriesRouter.put('/:id', (req, res) => {
  let existingsousCat = null
  let validationErrors = null
  let duplicateErrors = null

  Promise.all([
    SousCategorie.findOne(req.params.id),
    SousCategorie.findBySousCatWithDifferentId(
      req.body.nom_sous_categorie,
      req.params.id
    )
  ])
    .then(([sousCat, otherWithDifferentId]) => {
      existingsousCat = sousCat
      if (!existingsousCat) return Promise.reject('RECORD_NOT_FOUND')
      if (otherWithDifferentId) return Promise.reject('DUPLICATE_DATA')
      validationErrors = SousCategorie.validate(req.body, false)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return SousCategorie.update(req.params.id, req.body)
    })
    .then(() => {
      res.status(200).json({ ...existingsousCat, ...req.body })
    })
    .catch(err => {
      console.error(err)
      if (err === 'RECORD_NOT_FOUND') {
        res
          .status(404)
          .send(`Sous-categorie with id ${req.params.id} not found.`)
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors: validationErrors.details })
      } else if (err === 'DUPLICATE_DATA') {
        res.status(409).send('already exist')
      } else {
        res.status(500).send('Error updating a sous-categorie')
      }
    })
})


// DELETE ONE
sousCategoriesRouter.delete('/:id', (req, res) => {
  SousCategorie.destroy(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).send('🎉 Sous Categorie deleted!')
      } else {
        res.status(404).send(`Sous Categorie with id ${req.params.id}not found`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting a sous categorie')
    })
})

module.exports = sousCategoriesRouter
