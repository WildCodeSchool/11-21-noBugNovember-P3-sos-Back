const connection = require('../config/db')
const Joi = require('joi')

const db = connection.promise()

// Find Mail and Password
const findByMail = (mail) => {
  const sql = 'SELECT * FROM users WHERE mail = ?'
  return db.query(sql, [mail]).then(([result]) => result[0])
}




module.exports = {
  findByMail
  }
  