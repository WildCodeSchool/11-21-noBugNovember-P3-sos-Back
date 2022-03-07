const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    article_id: Joi.number().integer().min(0).presence(presence),
    sous_categorie_id: Joi.number().integer().min(0).presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// Create One
// POST ONE
const create = ({article_id, sous_categorie_id}) => {
  const sql =
    'INSERT INTO articles_has_sous_categories (article_id,sous_categorie_id) VALUES (?,?)'

  return db.query(sql, [article_id, sous_categorie_id]).then(([result]) => {
    return { article_id, sous_categorie_id }
  })
}



module.exports = {
  validate,
  create
}
