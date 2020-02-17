const express = require('express');

const config = require('./common/config/env.config.js');
const AuthorizationRouter = require('./auth/auth.routes.config');
const UsersRouter = require('./users/users.routes.config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //what is this for?

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

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

app.use('/', require('./routes/routes.config'));

// api
app.use('api/researchers', require('./api/routes/researcher.routes.config'));
app.use('api/papers', require('./api/routes/paper.routes.config'));
app.use('api/files', require('./api/routes/files-upload.routes.config'));
app.use('api/topics', require('./api/routes/topic.routes.config'));
app.use('api/carrousel', require('./api/routes/carrousel.routes.config'));
app.use('api/posts', require('./api/routes/post.routes.config'));

// auth and users
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.listen(config.port, () =>
    console.log(`App listening on port ${config.port}`)
);