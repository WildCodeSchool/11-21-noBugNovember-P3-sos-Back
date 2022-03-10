const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional'
    return Joi.object({
        nom_sous_categorie: Joi.string().max(255).presence(presence),
        categorie_id: Joi.number().integer().presence(presence),
    }).validate(data, { abortEarly: false }).error
  }

// READ ALL
const findMany = () => {
    return db.query('SELECT * FROM sous_categories').then(([result]) => result)
}

// READ ONE
const findOne = id => {
    const sql = 'SELECT * FROM sous_categories WHERE id_sous_categorie = ?'
    return db.query(sql, [id]).then(([result]) => result[0])
  }

  // POST ONE
  const findSousCat =({nom_sous_categorie, categorie_id})=>{
    const sql ="SELECT * FROM sous_categories WHERE nom_sous_categorie = ? AND categorie_id = ?"
    return db.query(sql, [nom_sous_categorie, categorie_id])
    .then(([results])=> results[0])
}
const create = ({ nom_sous_categorie, categorie_id }) => {
    const sql = 'INSERT INTO sous_categories (nom_sous_categorie, categorie_id) VALUES (?,?)'
  
    return db.query(sql, [nom_sous_categorie, categorie_id]).then(([result]) => {
      const id = result.insertId
      return { id, nom_sous_categorie, categorie_id }
    })
  }

// UPDATE ONE
const update = (id, newAttributes) => {
    return db.query('UPDATE sous_categories SET ? WHERE id_sous_categorie = ?', [
      newAttributes,
      id
    ])
  }

  const findBySousCatWithDifferentId = (sousCat,id) => {
    return db.query('SELECT * FROM sous_categories WHERE nom_sous_categorie = ? AND id_sous_categorie <> ?',[sousCat,id]).then(([result])=>result[0])
  }

// DELETE ONE
const destroy = id => {
    return db
      .query("DELETE FROM sous_categories WHERE id_sous_categorie = ?", [id])
      .then(([result]) => result.affectedRows !== 0)
  }


  module.exports = {
    validate,
    findMany,
    findOne,
    findSousCat,
    create,
    update,
    destroy,
    findBySousCatWithDifferentId
  }