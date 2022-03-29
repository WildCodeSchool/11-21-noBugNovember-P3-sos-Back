const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    prenom_telechargement: Joi.string().max(255).presence(presence),
    nom_telechargement: Joi.string().max(255).presence(presence),
    mail_telechargement: Joi.string().email().presence(presence),
    ville_telechargement: Joi.string().max(255).presence(presence),
    article_id: Joi.number().integer().presence(presence)
  }).validate(data, { abortEarly: false }).error
}

//READ ALL
const findMany = () => {
  return db
    .query(
      'SELECT id_telechargement as id, prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id, titre FROM telechargements INNER JOIN articles ON article_id = id_article'
    )
    .then(([result]) => result)
}

// READ ONE
const findOne = id => {
  const sql = 'SELECT * FROM telechargements WHERE id_telechargement= ?'
  return db.query(sql, [id]).then(([result]) => result[0])
}

//POST ONE
const create = ({
  prenom_telechargement,
  nom_telechargement,
  mail_telechargement,
  ville_telechargement,
  article_id
}) => {
  const sql =
    'INSERT INTO telechargements (prenom_telechargement, nom_telechargement, mail_telechargement, ville_telechargement, article_id) VALUES (?,?,?,?,?)'
  return db
    .query(sql, [
      prenom_telechargement,
      nom_telechargement,
      mail_telechargement,
      ville_telechargement,
      article_id
    ])
    .then(([result]) => {
      const id = result.insertId
      return {
        id,
        prenom_telechargement,
        nom_telechargement,
        mail_telechargement,
        ville_telechargement,
        article_id
      }
    })
}

//UPDATE ONE
const update = (id, newAttributes) => {
  return db.query('UPDATE telechargements SET ? WHERE id_telechargement=?', [
    newAttributes,
    id
  ])
}

//DELETE ONE
const destroy = id => {
  return db
    .query('DELETE FROM telechargements WHERE id_telechargement = ?', [id])
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
