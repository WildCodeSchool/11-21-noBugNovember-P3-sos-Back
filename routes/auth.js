require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const decode = require('jsonwebtoken/decode')

const authRouter = express.Router()
const Auth = require('../models/auth')

//On créé un password haché
authRouter.post('/newToken', (req, res) => {
  const { password } = res.body
  //   Crypté le motdepasse avec bcrypt
  const saltRounds = 10
  let hashedPassword = null
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    console.log('new', hash)
    hashedPassword = hash
  })
})

// Fonction pour récuperer le token
const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

//routes
authRouter.post('/protected', (req, res) => {
  const token = getToken(req)
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).send({ access: false })
    } else {
      return res.status(200).send({ access: true })
    }
  })
})

authRouter.post('/login', async (req, res) => {
  const { mail, password } = req.body
  let existingUser = null

  Auth.findByMail(mail)
    .then(user => {
      existingUser = user
      //Check si l'utilisateur existe
      if (!existingUser) return Promise.reject('USER_NOT_FOUND')
      // On compare le password haché le BDD avec celui envoyé du Front non haché
      return bcrypt.compare(password, existingUser.password)
    })
    .then(verifyedPassword => {
      // Check si le password est bon
      if (verifyedPassword) {
        const tokenUserinfo = {
          mail: mail,
          status: 'PouletMaster'
        }
        return tokenUserinfo
      } else {
        return Promise.reject('ERROR_IDENTIFICATION')
      }
    })
    // On crée le token et on l'envoie dans le header
    .then(tokenUserinfo => {
      const token = jwt.sign(tokenUserinfo, process.env.JWT_SECRET)
      res.header('Access-Control-Expose-Headers', 'x-access-token')
      res.set('x-access-token', token)
      res.status(200).send({ mess: 'user connected' })
    })
    .catch(err => {
      console.error(err)
      if (err === 'USER_NOT_FOUND') res.status(404).send('User not found')
      else if (err === 'ERROR_IDENTIFICATION')
        res.status(404).send('Erreur identification')
      else res.status(500).send('Error to find a user')
    })
})

module.exports = authRouter
