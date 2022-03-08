const express = require('express')
const router = express.Router()
const mysql = require('../config/db')


// Routes GET
// Routes GET
router.get('/', (req, res) => {
  const sql = 'SELECT id_secteur, nom_secteur FROM secteurs'
  //Rajout romain v
  let secteur = []
  
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from secteur')
      console.error(err)
    } else {
      result.forEach(la =>
        sousCategorie.push({
          id: la.id_sous_categorie,
          value: la.nom_sous_categorie,
          label: la.nom_sous_categorie
        })
      )
      console.table(sousCategorie)
      res.status(200).json(sousCategorie)
    }
  })
})

// Routes POST

router.post('/', (req, res) => {
    const { nom_secteur } = req.body
    sql = 'INSERT INTO secteurs (nom_secteur) VALUES (?);'
  
    mysql.query(sql, [nom_secteur], (err, result) => {
      if (err) {
        res.status(500).send('Error saving secteur')
      } else {
        console.log(result)
        const id = result.insertId
        const createdSecteur = { id, nom_secteur }
        res.status(200).json(createdSecteur)
        // 
      }
    })
  })

  router.put("/:id", (req, res) => {
    const secteurId = req.params.id;
    const secteurPropsToUpdate = req.body;
      mysql.query(
      "UPDATE secteurs SET ? WHERE id_secteur = ?",
      [secteurPropsToUpdate, secteurId],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error updating a secteur");
        } else {
          res.status(200).send("secteur updated successfully 🎉");
        }
      }
    )
  });
  
  router.delete("/:id", (req, res) => {
    const secteurId = req.params.id;
    console.log(secteurId)
    mysql.query(
      "DELETE FROM secteurs WHERE id_secteur = ?",
      [secteurId],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("😱 Error deleting an user");
        } else {
          res.sendStatus(204);
        }
      }
    )
  });
  
  module.exports = router