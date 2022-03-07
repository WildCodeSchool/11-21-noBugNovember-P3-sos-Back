const express = require("express");
const mysql = require("../config/db")
const articlesRouter = express.Router();

const Articles = require('../models/articles')

// router.get("/", (req,res) =>{
//     res.status(200).send("Dans Articles")
// })

articlesRouter.get("/", (req,res) => {


    // const sql = 'SELECT art.titre, art.intro, art.para1, art.para2, art.para3, art.avantage, art.lien1, art.lien2, art.lien3, art.image,vil.nom_ville, reg.nom_region, ssc.nom_sous_categorie, cat.nom_categorie, sec.nom_secteur FROM articles as art LEFT JOIN secteurs_has_articles as sec_art ON art.id_article = sec_art.article_id LEFT JOIN secteurs AS sec ON sec_art.secteur_id= sec.id_secteur LEFT JOIN sous_categories AS ssc ON art.sous_categorie_id=ssc.id_sous_categorie LEFT JOIN categories AS cat ON ssc.categorie_id=cat.id_categorie LEFT JOIN villes_has_articles as vil_art ON art.id_article = vil_art.article_id LEFT JOIN villes as vil ON vil_art.ville_id=vil.id_ville LEFT JOIN regions as reg ON vil.region_id = reg.id_region;'

    const sql ='SELECT art.titre, art.intro, art.para1, art.para2, art.para3, art.avantage, art.lien1, art.lien2, art.lien3, art.image, art.voir, vil.nom_ville, reg.nom_region, ssc.nom_sous_categorie, cat.nom_categorie, sec.nom_secteur FROM articles as art LEFT JOIN secteurs_has_articles as sec_art ON art.id_article = sec_art.article_id LEFT JOIN secteurs AS sec ON sec_art.secteur_id= sec.id_secteur LEFT JOIN articles_has_sous_categories AS art_ssc ON art_ssc.article_id=art.id_article LEFT JOIN sous_categories AS ssc ON art_ssc.sous_categorie_id=ssc.id_sous_categorie LEFT JOIN categories AS cat ON ssc.categorie_id=cat.id_categorie LEFT JOIN villes_has_articles as vil_art ON art.id_article = vil_art.article_id LEFT JOIN villes as vil ON vil_art.ville_id=vil.id_ville LEFT JOIN regions as reg ON vil.region_id = reg.id_region'

    mysql.query(sql, (err, result) => {
        if(err) {
            res.status(500).send("Error retrieving data from articles")
            console.error(err)
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

// Routes POST

// INTEGRATION ARTICLE ROMAIN - a verifier RETRAIT DES 3 PARAGRAPHES car utilisation de TINY
articlesRouter.post('/', (req, res) => {
     const {titre, intro, type, para1, para2, para3, avantage, lien1, lien2, lien3, image, visible, user_id, sous_categorie_id} = req.body
     
    sql = 'INSERT INTO articles (titre, intro, type, para1, para2, para3, avantage, lien1, lien2, lien3, image, visible, user_id, sous_categorie_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);'

    mysql.query(sql, [ titre, intro, type, para1, para2, para3, avantage, lien1, lien2, lien3, image, visible, user_id, sous_categorie_id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error saving articles')
        } else {
            console.log(result)
            const id = result.insertId
            const createdArticles = { id, titre, intro, type, para1, para2, para3, avantage, lien1, lien2, lien3, image, visible, user_id, sous_categorie_id }
            res.status(201).json(createdArticles)
        }
    })
})

module.exports = articlesRouter
