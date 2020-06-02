module.exports = {
    "port": process.env.PORT || 3000,
    "apiEndpoint": "http://localhost:3000",
    "jwt_secret": "meuSegredoEAlegria",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    cors: function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE');
        res.header('Access-Control-Expose-Headers', 'Content-Length');
        res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        } else {
            return next();
        }
    }
};
