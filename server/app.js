const express = require('express');
const chalk = require('chalk');
const cors = require('cors')
const path = require('path')

require('dotenv').config()


// ? global var
global.docsPath = "../../uploads/025db780fb5f5f750de599e187c074a"
    // user routes
const userRoutes = require('./routes/user.route')
    // master routes : bankdetails
const masterRoutes = require('./routes/master.route')
    // product scheme seo routes
const seoRoutes = require("./routes/seo.route")
    // errors
const onboardErrors = require("./routes/errors/onboard.route")
    // nse requests
const nseRequests = require("./routes/nse/nse.route")
    // user steps update and create
const userSuccessRoutes = require("./routes/user.successRoute")
    // alert routes
const alertRoutes = require("./routes/alert.routes")

//cartRoutes
const cartRoutes = require('./routes/cart.route')


const app = express();
const PORT = process.env.PORT || 4400

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//tell express to serve static files which are under dist
app.use(express.static(path.resolve(process.cwd() + "/../client/dist")));


// test route
app.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd() + "/../client/dist/index.html"))
});
// user auth routes
app.use('/api', userRoutes)
app.use("/api", masterRoutes);
app.use("/api/seo", seoRoutes)
app.use("/api/errors", onboardErrors)
app.use("/api/success", userSuccessRoutes)
app.use("/api/alerts", alertRoutes)
app.use("/api/cart", cartRoutes)


let a = 0

// nse requests
app.use("/api", nseRequests)

// start server
app.listen(PORT, () => {
    console.log(chalk.green.inverse.bold(`Express app listening on.........PORT :  ${PORT}`))
})