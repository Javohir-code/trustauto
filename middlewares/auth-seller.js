const jwt = require('jsonwebtoken');


module.exports = function authSeller(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).send('Unauthorized!');
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.seller = decoded;
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token!');
    }
}







