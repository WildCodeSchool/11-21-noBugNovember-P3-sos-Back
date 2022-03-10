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

// READ One Article
articlesRouter.get('/:id', (req, res) => {
  Articles.findOne(req.params.id)
    .then(articles => {
      res.status(200).json(articles)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving data from articles')
    })
})

// READ One Article
articlesRouter.get('/villes/:id', (req, res) => {
  ArticlesVilles.findOne(req.params.id)
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
  let createdArtSecRes = null
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
        createdArtcilesRes = createdArticles
      })
      .then(() =>
        Promise.all([
          secteur_id && ArticlesSecteurs.create(secteur_id, idArticle),
          ArticlesSousCats.create(idArticle, sous_categorie_id),
          ArticlesVilles.create(ville_id, idArticle)
        ]).then(([sec, sous, ville]) => {
          res.status(201).json({ createdArtcilesRes, sec, sous, ville })
        })
      )
  }
})

// Put Articles
articlesRouter.put('/:id', (req, res) => {
  const id = req.params.id
  const { articles, villes, sousCategories, secteurs } = req.body
  // const articles = req.body.articles
  
  let existingArticle = null
  let errorArticle = null
  Articles.findOne(id)
    .then(article => {
      existingArticle = article
      if (!existingArticle) return Promise.reject('RECORD_NOT_FOUND')
      errorArticle = Articles.validate(articles, false)
      if (errorArticle) return Promise.reject('INVALID_DATA')
        }).then(()=>
    Promise.all([
      Articles.update(id, articles),
      villes && ArticlesVilles.update(  id,villes.ville_id),
      sousCategories && ArticlesSousCats.update(id,sousCategories.sous_categorie_id),
      secteurs && ArticlesSecteurs.update(id,secteurs.secteur_id)
    ])
    )
    .then(([resArt, resVilles, resSousCat,resSect]) => {
      // res.status(200).json({ existingArticle, resArt, resVilles, resSousCat,resSect})
      res.sendStatus(204)
    })
    .catch(err => {
      console.log(err)
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Article with id ${id} not found.`)
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors: errorArticle.details })
      else res.status(500).send('Error updating an article.')
    })
})



//Exemple pour le put, données à envoyer du front
/*
{"articles":{
  "titre": "Réseagngnutage sur Grenoble ! \n",
  "intro": "Pour te donner plus envie encore de te lancegngngr dans un projet de création d’entreprise, consulte l’agenda de OZER et fais-toi inviter à un Apéro’Ozer ! Rencontres, échanges, témoignages, réseau…Fonce ! ",
  "para1": "Les actions de Pépite oZer s’articulent autour de plusieurs axes majeurs. Pépite oZer a pour mission à la fois la sensibilisation mais également l’accompagnement des étudiants et des jeunes diplômés dans leurs projets entrepreneuriaux. \nDifférents évènements sont organisés pour sensibiliser les étudiants à l’entrepreneuriat dans une démarche d’apprentissage par l’action. "},
"villes":{
"ville_id" : [2]
},
"secteurs":{
  "secteur_id":[1,2,3]
},
"sousCategories":{
  "sous_categorie_id":[1,2,3]
}
}
*/
module.exports = articlesRouter
