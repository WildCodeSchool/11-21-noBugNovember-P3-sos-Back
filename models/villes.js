const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()



const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    nom_ville: Joi.string().max(255).presence(presence),
    region_id: Joi.number().presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// READ ALL
const findMany = ({ filters: { region } }) => {
  const sqlValues = []
  let filter = ''
  if (region) {
    filter += 'WHERE region_id=?'
    sqlValues.push(parseInt(region))
  }
  let sql = `SELECT id_ville, nom_ville,region_id, nom_region FROM villes LEFT JOIN regions ON id_region = region_id ${filter}`
  return db
  .query(sql, sqlValues)
  .then(([result]) => result)
}


//READ ONE
const findOne = id => {
  const sql = 'SELECT * FROM villes WHERE id_ville =?'
  return db.query(sql, [id]).then(([result]) => result[0])
}


//POST ONE
const findVille = ({ nom_ville, region_id }) => {
  console.log(nom_ville, region_id, '4')
  const sql = 'SELECT * FROM villes WHERE nom_ville =? AND region_id = ?'
  return db.query(sql, [nom_ville, region_id]).then(([results]) => results[0])
}

const create = ({ nom_ville, region_id }) => {
  const sql = 'INSERT INTO villes (nom_ville, region_id) VALUES (?,?)'
  return db.query(sql, [nom_ville, region_id]).then(([result]) => {
    console.log(result, '3')
    const id = result.insertId
    return { id, nom_ville, region_id }
  })
}

//UPDATE ONE
const update = (id, newAttributes) => {
  return db.query('UPDATE villes SET ? WHERE id_ville= ?', [newAttributes, id])
}


//DELETE ONE
const destroy = id => {
  return db
    .query('DELETE FROM villes WHERE id_ville = ?', [id])
    .then(([result]) => result.affectedRows !== 0)
}

module.exports = {
  validate,
  findMany,
  findOne,
  findVille,
  create,
  update,
  destroy

}
