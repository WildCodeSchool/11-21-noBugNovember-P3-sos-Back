// INSERT INTO categories (nom_categorie)
// VALUES (?);
const express = require('express')
const router = express.Router()
const mysql = require('../config/db')

// router.get('/', (req,res) => {
//     res.status(200).send("Dans régions")
// })

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

module.exports = router