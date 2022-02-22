const express = require("express");
const router = express.Router();
const mysql = require("../config/db");

// router.get('/', (req,res) => {
//     res.status(200).send("Dans régions")
// })


router.get("/", (req,res) => {
    const sql = "SELECT * FROM regions"
    mysql.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving data from regions")
            console.error(err)
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})




module.exports = router