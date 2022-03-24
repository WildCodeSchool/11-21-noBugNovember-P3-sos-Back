const express = require('express')

const regionsRouter = express.Router()
const Region = require('../models/regions')

// router.get('/', (req,res) => {
//     res.status(200).send("Dans régions")
// })

// regionRouter.get('/', (req, res) => {
//   const sql = 'SELECT * FROM regions'
//   mysql.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).send('Error retrieving data from regions')
//       console.error(err)
//     } else {
//       console.table(result)
//       res.status(200).json(result)
//     }
//   })
// })




/***************************** AJOUT DE REGION NE MARCHE PAS ******** */
// regionsRouter.get('/', (req, res) => {
//     Region.findMany()

//   const sql = 'SELECT id_region,nom_region FROM region'
//   const region=[]
//   mysql.query(sql, (err, result) => {
//       if (err) {
//           res.status(500).send('Error retrieving data from regions')
//           console.error(err)
//       } else {
//           result.forEach(region=>
//             region.push({
//               id:region.id_region,
//               value:region.nom_region,
//               label: region.nom_region})
//               )
//           console.log(region)
//           res.status(200).json(region)
//       }
//   })
// })
/***************************** NE MARCHE PAS ******** */



//READ ALL
regionsRouter.get('/', (req, res) => {
  Region.findMany()
    .then(regions => {
      res.json(regions)
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

// Routes POST

// regionsRouter.post('/', (req, res) => {
//   const { nom_region } = req.body
//   sql = 'INSERT INTO regions (nom_region) VALUES (?);'

//   mysql.query(sql, [nom_region], (err, result) => {
//     if (err) {
//       res.status(500).send('Error saving region')
//     } else {
//       console.log(result)
//       const id = result.insertId
//       const createdRegion = { id, nom_region }
//       res.status(201).json(createdRegion)
//     }
//   })
// })

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

// Routes PUT

// regionsRouter.put('/:id', (req, res) => {
//   const regionId = req.params.id
//   const db = mysql.promise() //Utiliser les promesses
//   let existingRegion = null //Variable pour check si existe

//   db.query('SELECT * FROM regions WHERE id_region = ? ', [regionId])
//     .then(([result]) => {
//       existingRegion = result[0]
//       if (!existingRegion) return Promise.reject('RECORD_NOT_FOUND')
//       return db.query('UPDATE regions SET ? WHERE id_region = ?', [
//         req.body,
//         regionId
//       ])
//     })
//     .then(() => {
//       res.status(200).json({ ...existingRegion, ...req.body })
//     })
//     .catch(err => {
//       console.error(err)
//       if (err === 'RECORD_NOT_FOUND')
//         res.status(404).send(`Region with id ${regionId} not found.`)
//       else res.status(500).send('Error updating a user')
//     })
// })

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

// Route Delete

// regionsRouter.delete('/:id', (req, res) => {
//   const regionId = req.params.id
//   const sql = 'DELETE FROM regions WHERE id_region=?'
//   mysql.query(sql, [regionId], (err, result) => {
//     if (err) {
//       console.error(err)
//       res.status(500).send('Error deleting a Region')
//     } else {
//       if (result.affectedRows) {
//         res.status(200).send('🎉 Région effacée !')
//       } else
//         res.status(404).send(`La région avec l'Id ${regionId} n'existe pas`)
//     }
//   })
// })

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
