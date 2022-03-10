const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    // article_id: Joi.number().integer().min(0).presence(presence),
    sous_categorie_id:Joi.array().items(Joi.number().integer().min(0).presence(presence)),
  }).validate(data, { abortEarly: false }).error
}

// Create One
// POST ONE
const create = (article_id, sous_categorie_id) => {
  const sql =
    'INSERT INTO articles_has_sous_categories (article_id,sous_categorie_id) VALUES ?'

  let lan = []
  for (let i = 0; i < sous_categorie_id.length; i++) {
    lan.push([ article_id,sous_categorie_id[i],])
  }
  return db.query(sql, [lan]).then(([result]) => {
    return { article_id, sous_categorie_id }
  })
}

// const create = (secteur_id, article_id) => {
//   const sql =
//     'INSERT INTO secteurs_has_articles (secteur_id, article_id) VALUES ?'

//   let lan = []
//   for (let i = 0; i < secteur_id.length; i++) {
//     lan.push([secteur_id[i], article_id])
//   }

//   return db.query(sql, [lan]).then(([result]) => {
//     return { secteur_id, article_id }
//   })
// }

module.exports = {
  validate,
  create
}
