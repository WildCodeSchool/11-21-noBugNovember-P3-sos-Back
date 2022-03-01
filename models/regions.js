const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    nom_region: Joi.string().max(100).presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// READ ALL
const findMany = () => {
    return db.query('SELECT * FROM regions').then(([result]) => result)
}

// READ ONE
const findOne = id => {
  const sql = 'SELECT * FROM regions WHERE id_region = ?'
  return db.query(sql, [id]).then(([result]) => result[0])
}

// POST ONE
const create = ({ nom_region }) => {
  const sql = 'INSERT INTO regions (nom_region) VALUES (?)'

  return db.query(sql, [nom_region]).then(([result]) => {
    const id = result.insertId
    return { id, nom_region }
  })
}

// UPDATE ONE
const update = (id, newAttributes) => {
  return db.query('UPDATE regions SET ? WHERE id_region = ?', [
    newAttributes,
    id
  ])
}

// DELETE ONE
const destroy = id => {
  return db
    .query('DELETE FROM regions WHERE id_region = ?', [id])
    .then(([result]) => result.affectedRows !== 0)
}

module.exports = {
  validate,
  findMany,
  findOne,
  create,
  update,
  destroy
}
