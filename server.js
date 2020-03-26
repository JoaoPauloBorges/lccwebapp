const config = require('./server/common/config/env.config.js');
const express = require('express');
const path = require('path');
const nomeApp = config.appName;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(config.cors);

// auth and users
app.use('/api/auth', require('./server/auth/auth.routes.config'));
app.use('/api/users', require('./server/users/users.routes.config'));

// api
app.use('/api/researchers', require('./server/api/routes/researcher.routes.config'));
app.use('/api/papers', require('./server/api/routes/paper.routes.config'));
app.use('/api/files', require('./server/api/routes/files-upload.routes.config'));
app.use('/api/topics', require('./server/api/routes/topic.routes.config'));
app.use('/api/carrousel', require('./server/api/routes/carrousel.routes.config'));
app.use('/api/posts', require('./server/api/routes/post.routes.config'));

app.use(express.static(`${__dirname}/dist/${nomeApp}`));
app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

// Initialize the app.
let server = app.listen(config.port, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});
