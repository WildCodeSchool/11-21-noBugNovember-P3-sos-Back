const express = require('express')
const app = express()
const mysql = require('../config/db')

const articlesRouter = express.Router()
const Articles = require('../models/articles')
const ArticlesSecteurs = require('../models/articles_secteurs')
const ArticlesSousCats = require('../models/articles_sousCategories')
const ArticlesVilles = require('../models/articles_villes')

// READ ALL With FILTERS
articlesRouter.get('/', (req, res) => {
<<<<<<< HEAD
  // const sql = 'SELECT art.titre, art.intro, art.para1, art.avantage, art.lien1, art.lien2, art.lien3, art.image,vil.nom_ville, reg.nom_region, ssc.nom_sous_categorie, cat.nom_categorie, sec.nom_secteur FROM articles as art LEFT JOIN secteurs_has_articles as sec_art ON art.id_article = sec_art.article_id LEFT JOIN secteurs AS sec ON sec_art.secteur_id= sec.id_secteur LEFT JOIN sous_categories AS ssc ON art.sous_categorie_id=ssc.id_sous_categorie LEFT JOIN categories AS cat ON ssc.categorie_id=cat.id_categorie LEFT JOIN villes_has_articles as vil_art ON art.id_article = vil_art.article_id LEFT JOIN villes as vil ON vil_art.ville_id=vil.id_ville LEFT JOIN regions as reg ON vil.region_id = reg.id_region;'

=======
>>>>>>> 896d59c22effcf8a1e5074ca81de1b29a55d5e38
  const { search, ville, categorie, sousCategorie } = req.query

  Articles.findMany({ filters: { search, ville, categorie, sousCategorie } })
    .then(articles => {
      res.status(200).json(articles)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving data from articles')
    })
})

// Post One
articlesRouter.post('/', (req, res) => {
  let idArticle = null
  let  createdArtSecRes = null
  let createdArtcilesRes = null
  const {
    titre,
    intro,
    para1,
    avantage,
    lien1,
    lien2,
    lien3,
    image,
    visible,
<<<<<<< HEAD
    user_id
  } = req.body

  sql =
    'INSERT INTO articles (titre, intro, para1, avantage, lien1, lien2, lien3, image, visible, user_id) VALUES (?,?,?,?,?,?,?,?,?,?);'
=======
    user_id,
    secteur_id,
    sous_categorie_id,
    ville_id
  } = req.body

  const errorArt = Articles.validate({
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
  })
>>>>>>> 896d59c22effcf8a1e5074ca81de1b29a55d5e38

  const errorArtSec = ArticlesSecteurs.validate({ secteur_id })
  const errorArtVille = ArticlesVilles.validate({ ville_id })
  const errorArtSousCat = ArticlesSousCats.validate({ sous_categorie_id })

  // if  (errorArt || errorArtSec || errorArtVille || errorArtSousCat){
  //   res.status(422).json( errorArt && { validationErrors: errorArt.details } || errorArtSec && { validationErrors: errorArtSec.details } || errorArtVille && { validationErrors: errorArtVille.details } || errorArtSousCat && { validationErrors: errorArtSousCat.details })
  
  if (errorArt) {
    res.status(422).json({ validationErrors: errorArt.details })
  } else if (errorArtSec) {
    res.status(422).json({ validationErrors: errorArtSec.details })
  } else if (errorArtVille) {
    res.status(422).json({ validationErrors: errorArtVille.details })
  } else if (errorArtSousCat) {
    res.status(422).json({ validationErrors: errorArtSousCat.details })
  } else {
    Articles.create({
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
<<<<<<< HEAD
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error saving articles')
      } else {
        console.log(result)
        const id = result.insertId
        const createdArticles = {
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
        res.status(201).json(createdArticles)
      }
    }
  )
=======
    })
      .then(({ id, ...createdArticles }) => {
        console.log(id)
        idArticle = id
        createdArtcilesRes=createdArticles
      })
      .then(() =>  Promise.all([
        secteur_id && ArticlesSecteurs.create(secteur_id, idArticle),
        ArticlesSousCats.create(idArticle, sous_categorie_id),
        ArticlesVilles.create(ville_id, idArticle)
      ])
      .then(([sec, sous, ville]) => {
        res.status(201).json({createdArtcilesRes,sec,sous,ville})
      })
      
      )
  }

  
>>>>>>> 896d59c22effcf8a1e5074ca81de1b29a55d5e38
})

module.exports = articlesRouter
