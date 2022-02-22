const express = require("express");
const router = express.Router();
const mysql = require("../config/db")

// router.get('/', (req, res) => {
//     res.status(200).send("Dans villes")
// })

router.get("/", (req, res) => {
    const sql = "SELECT nom_ville FROM villes"
    mysql.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving data from villes")
            console.error(err)
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

module.exports = router