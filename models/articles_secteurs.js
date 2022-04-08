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


//Find One by Secteur
const findOneSecteur = (id) => {
  return db
    .query('SELECT nom_secteur FROM secteurs_has_articles inner join secteurs on secteur_id = id_secteur WHERE article_id = ?', [id])
    .then(([results]) => results);
};


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

// Delete all 
const destroy = (id) =>{
  return db.query('DELETE FROM secteurs_has_articles WHERE article_id = ?', [id])
  .then(([result]) => result.affectedRows !== 0);
}


// Update One
const update = (article_id, secteur_id) => {
  destroy(article_id).then(()=>{
    return create(secteur_id, article_id)
  })
};

module.exports = {
  validate,
  create,
  destroy,
  findOneSecteur,
  update
}
