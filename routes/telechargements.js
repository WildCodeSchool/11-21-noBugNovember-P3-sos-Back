const express = require('express')
const router = express.Router()
const mysql = require('../config/db')

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM telechargements'
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

router.post('/', (req, res)=>{
    const { prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id } = req.body

    const sql = 'INSERT INTO telechargements ( prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id ) VALUES (?,?,?,?,?);'
    mysql.query(sql, [ prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id ], (err, result)=>{
        if (err) {
            console.log(err)
            res.status(500).send('Error saving telechargements')
        } else {
            console.log(result)
            const id = result.insertId
            const createdTelechargements = { id, prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id }
            res.status(201).json(createdTelechargements)
        }
    })
})

// routes PUT

router.put('/:id', (req,res)=>{
    const telechargementId = req.params.id
    const telechargementPropsUpdate = req.body
    const sql ='UPDATE telechargements SET ? WHERE id_telechargement= ?'
    mysql.query ( sql, [ telechargementPropsUpdate,telechargementId ], (err,result)=>{
        if (err){
            console.log(err)
            res.status(500).send('Error update telechargement')
        } else {
            console.log(result)
            const updateTelechargements = { telechargementId, telechargementPropsUpdate}
            res.status(200).json(updateTelechargements)
        }
    })
})

//routes DELETE

router.delete('/:id', (req,res)=>{
    const telechargementId = req.params.id
    const sql ='DELETE FROM telechargements WHERE id_telechargement= ?'
    mysql.query ( sql, [ telechargementId ], (err,result)=>{
        if (err){
            console.log(err)
            res.status(500).send('Error delete telechargement')
        } else {
            console.log(result)
            res.status(200).json(`the id ${telechargementId} was successfully delete`)
        }
    })
})

module.exports = router