module.exports = function(req, res, next) {
    //Check if the session user is defined if it is go to the endpoint else end response. 
    if(!req.session.user) {
        res.json({message: 'Error Must Be Logged In!'});
    } 
    next();
}