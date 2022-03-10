// INSERT INTO sous_categories (nom_sous_categorie, categorie_id)
// VALUES (?, ?);

const express = require('express')
const Joi = require('Joi')
const connection = require('../config/db')
const sousCategoriesRouter = express.Router()
const SousCategorie = require('../models/sousCategories')
const mysql = require('../config/db')

// // Routes GET
// router.get('/', (req, res) => {
//   const sql =
//     'SELECT id_sous_categorie, nom_sous_categorie, nom_categorie FROM sous_categories LEFT JOIN categories ON id_categorie = categorie_id'
//   //Rajout romain v
//   let sousCategorie = []

//   mysql.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).send('Error retrieving data from sous_categorie')
//       console.error(err)
//     } else {
//     }
//   })
// })

// Routes POST
// router.post('/', (req, res) => {
//   const { nom_sous_categorie, categorie_id } = req.body
//   sql =
//     'INSERT INTO sous_categories (nom_sous_categorie, categorie_id) VALUES (?,?);'
// router.get('/', (req, res) => {
//   const sql = 'SELECT * FROM sous_categories'
//   mysql.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).send('Error retrieving data from sous_categorie')
//       console.error(err)
//     } else {
//       console.table(result)
//       res.status(200).json(result)
//     }
//   })
// })

//READ ALL
sousCategoriesRouter.get('/', (req, res) => {
  let sousCategorie = []
  SousCategorie.findMany()
    .then(result => {
      result.forEach(la =>
        sousCategorie.push({
          id: la.id_sous_categorie,
          value: la.nom_sous_categorie,
          label: la.nom_sous_categorie,
          nomCat: la.nom_categorie
        })
      )
      console.table(sousCategorie)
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

// Routes POST

// router.post('/', (req, res) => {
//   const { nom_sous_categorie, categorie_id } = req.body
//   sql =
//     'INSERT INTO sous_categories (nom_sous_categorie, categorie_id) VALUES (?,?);'

//   mysql.query(sql, [nom_sous_categorie, categorie_id], (err, result) => {
//     if (err) {
//       res.status(500).send('Error saving sous_categorie')
//     } else {
//       console.log(result)
//       const id = result.insertId
//       const createdSousCategorie = { id, nom_sous_categorie, categorie_id }
//       res.status(201).json(createdSousCategorie)
//     }
//   })
// })

// router.post('/', (req, res) => {
//   const { nom_sous_categorie, categorie_id } = req.body
//   const mysql = connection.promise();
//   let validationErrors = null;
//   mysql.query("SELECT * FROM sous_categories WHERE nom_sous_categorie = ?", [nom_sous_categorie])
//     .then(([result]) => {
//       if (result[0]) return Promise.reject('DUPLICATE_SOUS_CAT');
//       validationErrors = Joi.object({
//         nom_sous_categorie: Joi.string().max(255).required(),
//         categorie_id: Joi.number().integer().required(),
//       }).validate({nom_sous_categorie, categorie_id}, { abortEarly: false }).error;
//       if (validationErrors) return Promise.reject('INVALID_DATA');
//       return mysql.query(
//         'INSERT INTO sous_categories (nom_sous_categorie, categorie_id) VALUES (?,?)',
//         [nom_sous_categorie, categorie_id]
//       );
//     } )
//     .then(([{insertId}]) => {
//       res.status(201).json({ id: insertId, nom_sous_categorie, categorie_id});
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err === 'DUPLICATE_SOUS_CAT')
//         res.status(409).json({ message: 'This sous_cat is already used'});
//       else if (err === 'INVALID_DATA')
//           res.status(422).json({ validationErrors });
//       else{console.log(err)
//         res.status(500).send('Error saving this sous_cat')}
//     });
// });

sousCategoriesRouter.post('/', (req, res) => {
  let existingsousCat = null
  let validationErrors = null
  SousCategorie.findSousCat(req.body)
    // console.log(req.body,"7")
    .then(sousCat => {
      // console.log(sousCat,"6")
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

// router.put("/:id", (req, res) => {
//   const sous_categorieId = req.params.id;
//   const sous_categoriePropsToUpdate = req.body;
//     mysql.query(
//     "UPDATE sous_categories SET ? WHERE id_sous_categorie = ?",
//     [sous_categoriePropsToUpdate, sous_categorieId],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error updating a sous_categorie");
//       } else {
//         res.status(200).send("sous_categories updated successfully 🎉");
//       }
//     }
//   )
// });

// router.put('/:id', (req, res) => {
//   const sous_categorieId = req.params.id;
//   const mysql = connection.promise();
//   let existingsous_categorie = null;
//   let validationErrors = null;
//   Promise.all([
//     mysql.query('SELECT * FROM sous_categories  WHERE id_sous_categorie = ?', [sous_categorieId]),
//     mysql.query('SELECT * FROM sous_categories WHERE nom_sous_categorie = ? AND id_sous_categorie <> ?', [
//       req.body.nom_sous_categorie,
//       sous_categorieId,
//     ]),
//   ])
//     .then(([[[sous_categorie]], [[othersous_categorieWithCat]]]) => {
//       existingsous_categorie = sous_categorie
//       if (!existingsous_categorie) return Promise.reject('RECORD_NOT_FOUND');
//       if (othersous_categorieWithCat) return Promise.reject('DUPLICATE_SOUSCAT');
//       validationErrors = Joi.object({
//         nom_sous_categorie: Joi.string().min(1).max(255),
//         categorie_id: Joi.number().integer(),
//       }).validate(req.body, { abortEarly: false }).error;
//       if (validationErrors) return Promise.reject('INVALID_DATA');
//       return mysql.query('UPDATE sous_categories SET ? WHERE id_sous_categorie = ?', [req.body, sous_categorieId]);
//     })
//     .then(() => {
//       res.status(200).json({ ...existingsous_categorie, ...req.body });
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err === 'RECORD_NOT_FOUND')
//         res.status(404).send(`User with id ${sous_categorieId} not found.`);
//       if (err === 'DUPLICATE_SOUSCAT')
//         res.status(409).json({ message: 'This sous_categorie is already used' });
//       else if (err === 'INVALID_DATA')
//         res.status(422).json({ validationErrors });
//       else res.status(500).send('Error updating a user');
//     });
// });

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
        console.log(req.body, '8')
        res.status(409).send('already exist')
      } else {
        res.status(500).send('Error updating a sous-categorie')
      }
    })
})

// router.put('/:id', (req, res) => {
//   const sous_categorieId = req.params.id
//   const sous_categoriePropsToUpdate = req.body
//   mysql.query(
//     'UPDATE sous_categories SET ? WHERE id_sous_categorie = ?',
//     [sous_categoriePropsToUpdate, sous_categorieId],
//     (err, result) => {
//       if (err) {
//         console.error(err)
//         res.status(500).send('Error updating a sous_categorie')
//       } else {
//         res.status(200).send('sous_categories updated successfully 🎉')
//       }
//     }
//   )
// })

sousCategoriesRouter.delete('/:id', (req, res) => {
  const sous_categorieId = req.params.id
  console.log(sous_categorieId)
  mysql.query(
    'DELETE FROM sous_categories WHERE id_sous_categorie=?',
    [sousCatId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting a sous-categorie')
      } else {
        if (result.affectedRows) {
          res.status(200).send('🎉 SousCat deleted!')
        } else {
          res.status(404).send('SousCat not found.')
        }
      }
    }
  )
})

module.exports = sousCategoriesRouter
