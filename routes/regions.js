const express = require('express')

const regionsRouter = express.Router()
const Region = require('../models/regions')


// READ ALL

regionsRouter.get('/', (req, res) => {
  const listeRegions = []
  Region.findMany()
    .then(regions => {
      regions.forEach(region =>
        listeRegions.push({
          id: region.id_region,
          value: region.nom_region,
          label: region.nom_region
        })
      )
      res.json(listeRegions)
    })
    .catch(err => {
      res.status(500).send('Error retrieving regions from database')
    })
})

//READ ONE
regionsRouter.get('/:id', (req, res) => {
  Region.findOne(req.params.id)
    .then(region => {
      if (region) {
        res.status(200).json(region)
      } else {
        res.status(404).send('Region not found')
      }
    })
    .catch(err => {
      res.status(500).send('Error retrieving Region from database')
    })
})


// ADD ONE
regionsRouter.post('/', (req, res) => {
  const error = Region.validate(req.body)
  if (error) {
    res.status(422).json({ validation: error.details })
  } else {
    Region.create(req.body)
      .then(createdRegion => {
        res.status(201).json(createdRegion)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send('Error saving the region')
      })
  }
})


// UPDATE ONE
regionsRouter.put('/:id', (req, res) => {
  let existingRegion = null
  let validationErrors = null
  Region.findOne(req.params.id)
    .then(region => {
      existingRegion = region
      if (!existingRegion) return Promise.reject('RECORD_NOT_FOUND')
      validationErrors = Region.validate(req.body, false)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return Region.update(req.params.id, req.body)
    })
    .then(() => {
      res.status(200).json({ ...existingRegion, ...req.body })
    })
    .catch(err => {
      console.error(err)
      if (err === 'RECORD_NOT_FOUND') {
        res.status(404).send(`Region with id ${req.params.id} not found.`)
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors: validationErrors.details })
      } else {
        res.status(500).send('Error updating a region')
      }
    })
})


// DELETE ONE
regionsRouter.delete('/:id', (req, res) => {
  Region.destroy(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).send('🎉 Region deleted!')
      } else {
        res.status(404).send(`Region with id ${req.params.id}not found`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting a region')
    })
})

module.exports = regionsRouter
