const express = require('express')

const categoriesRouter = express.Router()
const Categorie = require('../models/categories')




//READ ALL
categoriesRouter.get('/', (req, res) => {
  Categorie.findMany()
    .then(categories => {
      res.json(categories)
    })
    .catch(err => {
      res.status(500).send('Error retrieving categories from database')
    })
})

//READ ONE
categoriesRouter.get('/:id', (req, res) => {
    Categorie.findOne(req.params.id)
      .then(categorie => {
        if (categorie) {
          res.status(200).json(categorie)
        } else {
          res.status(404).send('Categorie not found')
        }
      })
      .catch(err => {
        res.status(500).send('Error retrieving categorie from database')
      })
  }) 


// ADD ONE
categoriesRouter.post('/', (req, res) => {
    let existingCategorie=null
    let validationErrors=null
    Categorie.findCat(req.body)
      .then (categorie => {
         existingCategorie=categorie
        if(existingCategorie) return Promise.reject('DUPLICATE_DATA')
        validationErrors = Categorie.validate(req.body)
        if(validationErrors) return Promise.reject('INVALID_DATA')
        return Categorie.create(req.body)
      })
      .then(createdCategorie =>{
        res.status(201).json(createdCategorie)
      })
      .catch(err => {
        console.error(err)
        if (err === 'DUPLICATE_DATA'){
          res.status(409).send('Categorie already exist')
        }else if (err === 'INVALID_DATA'){
          res.status(422).json({
            validationErrors : validationErrors.details })
        }else{
          res.status(500).send('Error saving the categorie')
        }
      })
    }) 



// UPDATE ONE
categoriesRouter.put('/:id', (req, res) => {
  let existingCategorie = null
  let validationErrors = null
  Categorie.findOne(req.params.id)
    .then(categorie => {
      existingCategorie = categorie
      if (!existingCategorie) return Promise.reject('RECORD_NOT_FOUND')
      validationErrors = categorie.validate(req.body, false)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return categorie.update(req.params.id, req.body)
    })
    .then(() => {
      res.status(200).json({ ...existingCategorie, ...req.body })
    })
    .catch(err => {
      console.error(err)
      if (err === 'RECORD_NOT_FOUND') {
        res.status(404).send(`categorie with id ${req.params.id} not found.`)
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors: validationErrors.details })
      } else {
        res.status(500).send('Error updating a categorie')
      }
    })
})



// DELETE ONE
categoriesRouter.delete('/:id', (req, res) => {
  Categorie.destroy(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).send('🎉 Categorie deleted!')
      } else {
        res.status(404).send(`Categorie with id ${req.params.id}not found`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting a categorie')
    })
})

// // INSERT INTO categories (nom_categorie)
// // VALUES (?);
// const express = require('express')
// const router = express.Router()
// const mysql = require('../config/db')

// // router.get('/', (req,res) => {
// //     res.status(200).send("Dans régions")
// // })

// router.get('/', (req, res) => {
//     const sql = 'SELECT * FROM categories'
//     mysql.query(sql, (err, result) => {
//         if (err) {
//             res.status(500).send('Error retrieving data from categories')
//             console.error(err)
//         } else {
//             console.table(result)
//             res.status(200).json(result)
//         }
//     })
// })

// // Routes POST

// router.post('/', (req, res) => {
//     const { nom_categorie } = req.body
//     sql = 'INSERT INTO categories (nom_categorie) VALUES (?);'
    
//     mysql.query(sql, [nom_categorie], (err, result) => {
//         if (err) {
//             res.status(500).send('Error saving categorie')
//         } else {
//             console.log(result)
//             const id = result.insert
//             const createdCategorie = { id, nom_categorie }
//             res.status(201).json(createdCategorie)

//         }
//     })
// })

module.exports = categoriesRouter