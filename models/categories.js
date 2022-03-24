const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    nom_categorie: Joi.string().max(100).presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// READ ALL
const findMany = () => {
  return db.query('SELECT * FROM categories').then(([result]) => result)
}

// READ ONE
const findOne = id => {
  const sql = 'SELECT * FROM categories WHERE id_categorie = ?'
  return db.query(sql, [id]).then(([result]) => result[0])
}

// POST ONE
const findCat = ({ nom_categorie }) => {
  const sql = 'SELECT * FROM categories WHERE nom_categorie =? '
  return db.query(sql, [nom_categorie]).then(([result]) => result[0])
}

const create = ({ nom_categorie }) => {
  const sql = 'INSERT INTO categories (nom_categorie) VALUES (?)'

  return db.query(sql, [nom_categorie]).then(([result]) => {
    const id = result.insertId
    return { id, nom_categorie }
  })
}

// UPDATE ONE
const update = (id, newAttributes) => {
  return db.query('UPDATE categories SET ? WHERE id_categorie = ?', [
    newAttributes,
    id
  ])
}

// DELETE ONE
const destroy = id => {
  return db
    .query('DELETE FROM categories WHERE id_categorie = ?', [id])
    .then(([result]) => result.affectedRows !== 0)
}

module.exports = {
  validate,
  findMany,
  findOne,
  findCat,
  create,
  update,
  destroy
}
