const articlesRouter = require("./articles")
const regionsRouter = require("./regions")
const villesRouter = require("./villes")
const secteursRouter = require("./secteurs")
const sousCategoriesRouter = require("./sousCategories") // VOIR ICI ?!
const categoriesRouter = require("./categories")
const telechargementsRouter = require("./telechargements")

const setupRoutes = (app) => {
    app.use('/articles',articlesRouter)
    app.use('/regions', regionsRouter)
    app.use('/villes', villesRouter) 
    app.use('/secteurs',secteursRouter) 
    app.use('/sousCategories',sousCategoriesRouter)
    app.use('/categories', categoriesRouter)
    app.use('/telechargements', telechargementsRouter)

}


module.exports = {setupRoutes}
