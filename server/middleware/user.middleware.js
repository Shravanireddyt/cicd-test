exports.isSignedIn = (req, res, next) => {
    // checks whether user signed in or not before doing something in user profile
    next()
}
exports.isAdmin = (req, res, next) => {
    // check whether signed in user is admin or not
    next()
}

//You can use these functions as middlewares before doing the actual things on user(ex:CRUD ops). See user.routes.js to know how to use these functions