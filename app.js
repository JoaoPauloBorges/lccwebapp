const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;


const config = require('./server/common/config/env.config.js');
const AuthorizationRouter = require('./server/auth/auth.routes.config');
const UsersRouter = require('./server/users/users.routes.config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //what is this for?

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

// api
app.use('/api/researchers', require('./server/api/routes/researcher.routes.config'));
app.use('/api/papers', require('./server/api/routes/paper.routes.config'));
app.use('/api/files', require('./server/api/routes/files-upload.routes.config'));
app.use('/api/topics', require('./server/api/routes/topic.routes.config'));
app.use('/api/carrousel', require('./server/api/routes/carrousel.routes.config'));
app.use('/api/posts', require('./server/api/routes/post.routes.config'));

// auth and users
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.use(express.static(`${__dirname}/dist/${nomeApp}`));
app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
    });

// Initialize the app.
var server = app.listen(process.env.PORT || config.port, function () {
var port = server.address().port;
console.log("App now running on port", port);
});