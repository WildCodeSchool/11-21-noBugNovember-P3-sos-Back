const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
      ville_id: Joi.number().integer().min(0).presence(presence),
      article_id: Joi.number().integer().min(0).presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// Create One
// POST ONE
const create = (ville_id, article_id) => {
  const sql =
    'INSERT INTO villes_has_articles (ville_id, article_id) VALUES (?,?)'

  return db.query(sql, [ville_id, article_id]).then(([result]) => {
    return { ville_id, article_id }
  })
}

module.exports = {
  validate,
  create
}
