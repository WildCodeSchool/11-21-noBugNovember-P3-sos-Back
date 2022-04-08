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



//Find One by Secteur
const findOneSousCat = (id) => {
  return db
    .query('SELECT nom_sous_categorie FROM articles_has_sous_categories inner join sous_categories on sous_categorie_id = id_sous_categorie WHERE article_id = ?', [id])
    .then(([results]) => results);
};


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


// Delete all 
const destroy = (id) =>{
  return db.query('DELETE FROM articles_has_sous_categories WHERE article_id = ?', [id])
  .then(([result]) => result.affectedRows !== 0);
}


// Update One
const update = (article_id, sous_categorie_id) => {
  destroy(article_id).then(()=>{
    return create(article_id,sous_categorie_id, )
  })
};

module.exports = {
  validate,
  create,
  update,
  destroy,
  findOneSousCat
}
