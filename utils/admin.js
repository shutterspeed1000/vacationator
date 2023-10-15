const isAdmin = (req, res, next) => {
// If the user is not logged in, redirect the request to the login route
    if (!req.session.isAdmin) {
        res.redirect('/');
    } else {
        next();
  }
};

module.exports = isAdmin;