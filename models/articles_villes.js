const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
      ville_id:Joi.array().items(Joi.number().integer().min(0).presence(presence)),
      // article_id: Joi.number().integer().min(0).presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// Create One
// POST ONE

const create = (ville_id, article_id) => {
  const sql =
    'INSERT INTO villes_has_articles (ville_id, article_id) VALUES ?'

    let lan = []
      for (let i = 0; i < ville_id.length; i++) {
        lan.push([ville_id[i],article_id ])
      }

  return db.query(sql, [lan]).then(([result]) => {
    return { ville_id, article_id }
  })
}

//Find One
const findOne = (id) => {
  return db
    .query('SELECT * FROM villes_has_articles WHERE article_id = ?', [id])
    .then(([results]) => results);
};

// Update One
const update = (article_id, newAttributes) => {

  let lan = []
  for (let i = 0; i < newAttributes.length; i++) {
    lan.push([newAttributes[i],article_id ])
  }

  return db.query('UPDATE villes_has_articles SET ? WHERE article_id = ?', [newAttributes, article_id]);
};

module.exports = {
  validate,
  create,
  findOne,
  update
}
