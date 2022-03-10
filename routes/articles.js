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

  
})

module.exports = articlesRouter
