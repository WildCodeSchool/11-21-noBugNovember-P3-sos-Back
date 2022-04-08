const articlesRouter = require("./articles")
const articles_sousCategoriesRouter = require("./articles")
const articles_secteursRouter = require("./articles")
const articles_villesRouter = require("./articles")
const authRouter = require("./auth")
const regionsRouter = require("./regions")
const villesRouter = require("./villes")
const secteursRouter = require("./secteurs")
const sousCategoriesRouter = require("./sousCategories") 
const categoriesRouter = require("./categories")
const telechargementsRouter = require("./telechargements")

const setupRoutes = (app) => {
    app.use('/articles',articlesRouter)
    app.use('/articles_sousCategories',articles_sousCategoriesRouter)
    app.use('/articles_secteurs',articles_secteursRouter)
    app.use('/articles_villes',articles_villesRouter)
    app.use('/auth', authRouter)
    app.use('/categories', categoriesRouter)
    app.use('/regions', regionsRouter)
    app.use('/secteurs',secteursRouter) 
    app.use('/sousCategories',sousCategoriesRouter)
    app.use('/telechargements', telechargementsRouter)
    app.use('/villes', villesRouter) 
}


module.exports = {setupRoutes}
