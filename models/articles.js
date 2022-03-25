const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    titre: Joi.string().max(250).presence(presence),
    intro: Joi.string().presence(presence),
    para1: Joi.string().presence(presence),
    avantage: Joi.string().allow(null, ''),
    lien1: Joi.string().allow(null, ''),
    lien2: Joi.string().allow(null, ''),
    lien3: Joi.string().allow(null, ''),
    image: Joi.string().uri().presence(presence),
    visible: Joi.boolean().default(0).presence(presence),
    user_id: Joi.number().integer().min(0).presence(presence)
  }).validate(data, { abortEarly: false }).error
}

// READ ALL WITH FILTERS
const findMany = ({ filters: { search, ville, categorie, sousCategorie } }) => {


  const sqlValues = []

  // Filtres pour barre de recherche (search,ville,categorie,sous-catégorie)

  let filter = ''
  if (search) {
    filter += ' WHERE (art.titre LIKE ? OR art.intro LIKE ? OR art.para1 LIKE ?)'
    sqlValues.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }
  if (ville) {
    if (sqlValues.length) {
      filter += ' AND vil.id_ville = ?'
    } else {
      filter += ' WHERE vil.id_ville = ?'
    }
    sqlValues.push(parseInt(ville))
  }
  if (categorie) {
    if (sqlValues.length) {
      filter += ' AND cat.id_categorie = ?'
    } else {
      filter += ' WHERE cat.id_categorie = ?'
    }
    sqlValues.push(parseInt(categorie))
  }
  if (sousCategorie) {
    if (sqlValues.length) {
      filter += ' AND ssc.id_sous_categorie  = ?'
    } else {
      filter += ' WHERE ssc.id_sous_categorie  = ?'
    }
    sqlValues.push(parseInt(sousCategorie))
  }

  let sql = `SELECT art.id_article as id, art.titre, art.intro, art.para1, art.avantage, art.lien1, art.lien2, art.lien3, art.image, art.visible, vil.nom_ville, reg.id_region,reg.nom_region, ssc.nom_sous_categorie, ssc.id_sous_categorie, cat.id_categorie, cat.nom_categorie, sec.nom_secteur, group_concat(DISTINCT ssc.nom_sous_categorie SEPARATOR ' , ' ) AS nom_sous_categorie, group_concat(DISTINCT ssc.id_sous_categorie SEPARATOR ' , ' ) AS id_sous_categorie, group_concat(DISTINCT vil.nom_ville SEPARATOR ' , ') AS nom_ville, group_concat(DISTINCT vil.id_ville SEPARATOR ' , ') AS id_ville,group_concat(DISTINCT sec.nom_secteur SEPARATOR ' , ') AS nom_secteur, group_concat(DISTINCT sec.id_secteur SEPARATOR ' , ') AS id_secteur FROM articles as art LEFT JOIN secteurs_has_articles as sec_art ON art.id_article = sec_art.article_id LEFT JOIN secteurs AS sec ON sec_art.secteur_id= sec.id_secteur LEFT JOIN articles_has_sous_categories AS art_ssc ON art_ssc.article_id=art.id_article LEFT JOIN sous_categories AS ssc ON art_ssc.sous_categorie_id=ssc.id_sous_categorie LEFT JOIN categories AS cat ON ssc.categorie_id=cat.id_categorie LEFT JOIN villes_has_articles as vil_art ON art.id_article = vil_art.article_id LEFT JOIN villes as vil ON vil_art.ville_id=vil.id_ville LEFT JOIN regions as reg ON vil.region_id = reg.id_region ${filter} Group BY art.titre order by art.id_article DESC`

  return db.query(sql, sqlValues).then(([result]) => result)
}

//Find One
const findOne = id => {
  return db
    .query('SELECT * FROM articles WHERE id_article = ?', [id])
    .then(([results]) => results[0])
}

// Create One
const create = ({
  titre,
  intro,
  para1,
  avantage,
  lien1,
  lien2,
  lien3,
  image,
  visible,
  user_id
}) => {
  sql =
    'INSERT INTO articles (titre, intro, para1,  avantage, lien1, lien2, lien3, image, visible, user_id) VALUES (?,?,?,?,?,?,?,?,?,?)'
  return db
    .query(sql, [
      titre,
      intro,
      para1,
      avantage,
      lien1,
      lien2,
      lien3,
      image,
      visible,
      user_id
    ])
    .then(([result]) => {
      const id = result.insertId
      return {
        id,
        titre,
        intro,
        para1,
        avantage,
        lien1,
        lien2,
        lien3,
        image,
        visible,
        user_id
      }
    })
}

// Update One
const update = (id, newAttributes) => {
  return db.query('UPDATE articles SET ? WHERE id_article = ?', [newAttributes, id]);
};

// Delete One
const destroy = id => {
  return db
    .query('DELETE FROM articles WHERE id_article = ?', [id])
    .then(([result]) => result.affectedRows !== 0)
}

module.exports = {
  validate,
  findMany,
  create,
  findOne,
  update,
  destroy
}
