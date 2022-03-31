const express = require('express')

const articlesRouter = express.Router()
const Articles = require('../models/articles')
const ArticlesSecteurs = require('../models/articles_secteurs')
const ArticlesSousCats = require('../models/articles_sousCategories')
const ArticlesVilles = require('../models/articles_villes')

// READ ALL With FILTERS
articlesRouter.get('/', (req, res) => {
  const { search, ville, categorie, sousCategorie } = req.query
  const tab = []
  Articles.findMany({ filters: { search, ville, categorie, sousCategorie } })
    .then(articles => {
      articles.forEach(article =>
        tab.push({ value: article.titre, ...article })
      )
      res.status(200).json(tab)
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

// READ One Article dans une ville
articlesRouter.get('/villes/:id', (req, res) => {
  const tab =[]
  ArticlesVilles.findOneVille(req.params.id)
    .then(articles => {
      articles.forEach(el => tab.push(el.nom_ville))

      res.status(200).json(tab.join(", "))
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving data from articles')
    })
})


// READ One Article dans un secteur
articlesRouter.get('/secteurs/:id', (req, res) => {
  const tab =[]
  ArticlesSecteurs.findOneSecteur(req.params.id)
    .then(articles => {
      articles.forEach(el => tab.push(el.nom_secteur))

      res.status(200).json(tab.join(", "))
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving data from articles')
    })
})


// READ One Article dans une ville
articlesRouter.get('/sousCat/:id', (req, res) => {
  const tab =[]
  ArticlesSousCats.findOneSousCat(req.params.id)
    .then(articles => {
      articles.forEach(el => tab.push(el.nom_sous_categorie))

      res.status(200).json(tab.join(", "))
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving data from articles')
    })
})

// READ One Article avec details
articlesRouter.get('/details/:id', (req, res) => {
  console.log(req.params.id)
  Articles.findOneDetail(req.params.id)
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

  const { secteur_id, sous_categorie_id, ville_id, ...articles } = req.body


  let existingArticle = null
  let errorArticle = null
  Articles.findOne(id)
    .then(article => {
      existingArticle = article
      if (!existingArticle) return Promise.reject('RECORD_NOT_FOUND')
      errorArticle = Articles.validate(articles, false)
      if (errorArticle) return Promise.reject('INVALID_DATA')
    })
    .then(() =>
      Promise.all([
        Articles.update(id, articles),
        ville_id && ArticlesVilles.update(id, ville_id),
        sous_categorie_id && ArticlesSousCats.update(id, sous_categorie_id),
        secteur_id && ArticlesSecteurs.update(id, secteur_id)
      ])
    )
    .then(([resArt, resVilles, resSousCat, resSect]) => {
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

//DELETE ONE
articlesRouter.delete('/:id', (req, res) => {
  Articles.destroy(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).send('🎉 Article deleted!')
      } else {
        res.status(404).send(`Article with id ${req.params.id}not found`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting an article')
    })
})


module.exports = articlesRouter
