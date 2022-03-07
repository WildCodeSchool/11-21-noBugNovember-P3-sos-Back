const express = require('express')

const telechargementsRouter = express.Router()
const Telechargement = require('../models/telechargements')




//READ ALL
telechargementsRouter.get('/', (req, res) => {
  Telechargement.findMany()
    .then(telechargements => {
      res.json(telechargements)
    })
    .catch(err => {
      res.status(500).send('Error retrieving telechargements from database')
    })
})

//READ ONE
telechargementsRouter.get('/:id', (req, res) => {
    Telechargement.findOne(req.params.id)
      .then(telechargement => {
        if (telechargement) {
          res.status(200).json(telechargement)
        } else {
          res.status(404).send('telechargement not found')
        }
      })
      .catch(err => {
        res.status(500).send('Error retrieving telechargement from database')
      })
  }) 


// ADD ONE
telechargementsRouter.post('/', (req, res) => {
  const error = Telechargement.validate(req.body)
  if (error) {
    res.status(422).json({ validation: error.details })
  } else {
    Telechargement.create(req.body)
      .then(createdtelechargement => {
        res.status(201).json(createdtelechargement)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send('Error saving the telechargement')
      })
  }
})



// UPDATE ONE
telechargementsRouter.put('/:id', (req, res) => {
  let existingtelechargement = null
  let validationErrors = null
  Telechargement.findOne(req.params.id)
    .then(telechargement => {
      existingtelechargement = telechargement
      if (!existingtelechargement) return Promise.reject('RECORD_NOT_FOUND')
      validationErrors = telechargement.validate(req.body, false)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return telechargement.update(req.params.id, req.body)
    })
    .then(() => {
      res.status(200).json({ ...existingtelechargement, ...req.body })
    })
    .catch(err => {
      console.error(err)
      if (err === 'RECORD_NOT_FOUND') {
        res.status(404).send(`telechargement with id ${req.params.id} not found.`)
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors: validationErrors.details })
      } else {
        res.status(500).send('Error updating a telechargement')
      }
    })
})



// DELETE ONE
telechargementsRouter.delete('/:id', (req, res) => {
  Telechargement.destroy(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).send('🎉 telechargement deleted!')
      } else {
        res.status(404).send(`telechargement with id ${req.params.id}not found`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting a telechargement')
    })
})

// router.get('/', (req, res) => {
//     const sql = 'SELECT * FROM telechargements'
//     mysql.query(sql, (err, result) => {
//         if (err) {
//             res.status(500).send('Error retrieving data from telechargements')
//             console.error(err)
//         } else {
//             console.table(result)
//             res.status(200).json(result)
//         }
//     })
// })

// // Routes POST

// router.post('/', (req, res)=>{
//     const { prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id } = req.body

//     const sql = 'INSERT INTO telechargements ( prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id ) VALUES (?,?,?,?,?);'
//     mysql.query(sql, [ prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id ], (err, result)=>{
//         if (err) {
//             console.log(err)
//             res.status(500).send('Error saving telechargements')
//         } else {
//             console.log(result)
//             const id = result.insertId
//             const createdTelechargements = { id, prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id }
//             res.status(201).json(createdTelechargements)
//         }
//     })
// })

// // routes PUT

// router.put('/:id', (req,res)=>{
//     const telechargementId = req.params.id
//     const telechargementPropsUpdate = req.body
//     const sql ='UPDATE telechargements SET ? WHERE id_telechargement= ?'
//     mysql.query ( sql, [ telechargementPropsUpdate,telechargementId ], (err,result)=>{
//         if (err){
//             console.log(err)
//             res.status(500).send('Error update telechargement')
//         } else {
//             console.log(result)
//             const updateTelechargements = { telechargementId, telechargementPropsUpdate}
//             res.status(200).json(updateTelechargements)
//         }
//     })
// })

// //routes DELETE

// router.delete('/:id', (req,res)=>{
//     const telechargementId = req.params.id
//     const sql ='DELETE FROM telechargements WHERE id_telechargement= ?'
//     mysql.query ( sql, [ telechargementId ], (err,result)=>{
//         if (err){
//             console.log(err)
//             res.status(500).send('Error delete telechargement')
//         } else {
//             console.log(result)
//             res.status(200).json(`the id ${telechargementId} was successfully delete`)
//         }
//     })
// })

module.exports = telechargementsRouter