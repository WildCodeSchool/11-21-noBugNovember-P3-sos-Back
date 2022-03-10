const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
      secteur_id:Joi.array().items(Joi.number().integer().min(0)),
      // article_id: Joi.number().integer().min(0).presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// Create One
// POST ONE
const create = (secteur_id, article_id) => {
  const sql =
    'INSERT INTO secteurs_has_articles (secteur_id, article_id) VALUES ?'
    let lan = []
      for (let i = 0; i < secteur_id.length; i++) {
        lan.push([secteur_id[i],article_id ])
      }

  return db.query(sql, [lan]).then(([result]) => {
    return { secteur_id, article_id }
  })
}

module.exports = {
  validate,
  create
}
