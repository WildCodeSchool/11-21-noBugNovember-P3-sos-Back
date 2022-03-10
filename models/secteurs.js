const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional'
    return Joi.object({
        nom_secteur: Joi.string().max(255).presence(presence),
    }).validate(data, { abortEarly: false }).error
  }

// READ ALL
const findMany = () => {
    return db.query('SELECT * FROM sous_categories').then(([result]) => result)
}


// READ ONE
const findOne = id => {
    const sql = 'SELECT * FROM secteurs WHERE id_secteur = ?'
    return db.query(sql, [id]).then(([result]) => result[0])
  }


// POST ONE
const findSecteur =({nom_secteur})=>{
    const sql ="SELECT * FROM secteurs WHERE nom_secteur = ?"
    return db.query(sql, [nom_secteur])
    .then(([results])=> results[0])
}
const create = ({ nom_secteur }) => {
    const sql = 'INSERT INTO secteurs (nom_secteur) VALUES (?)'
  
    return db.query(sql, [nom_secteur]).then(([result]) => {
      const id = result.insertId
      return { id, nom_secteur }
    })
  }

// UPDATE ONE
const update = (id, newAttributes) => {
    return db.query('UPDATE secteurs SET ? WHERE id_secteur = ?', [
      newAttributes,
      id
    ])
  }

  const findBySecteurtWithDifferentId = (secteur,id) => {
    return db.query('SELECT * FROM secteurs WHERE nom_secteur = ? AND id_secteur <> ?',[secteur,id]).then(([result])=>result[0])
  }

// DELETE ONE
const destroy = id => {
    return db
      .query('DELETE FROM secteurs WHERE id_secteur = ?', [id])
      .then(([result]) => result.affectedRows !== 0)
  }

  module.exports = {
    validate,
    findMany,
    findOne,
    findSecteur,
    findBySecteurtWithDifferentId,
    create,
    update,
    destroy
  }