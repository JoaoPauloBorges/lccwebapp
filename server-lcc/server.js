const config = require('./common/config/env.config.js');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(config.cors);

// auth and users
app.use('/api/auth', require('./auth/auth.routes.config'));
app.use('/api/users', require('./users/users.routes.config'));

// api
app.use('/api/researchers', require('./api/routes/researcher.routes.config'));
app.use('/api/papers', require('./api/routes/paper.routes.config'));
app.use('/api/files', require('./api/routes/files-upload.routes.config'));
app.use('/api/topics', require('./api/routes/topic.routes.config'));
app.use('/api/carrousel', require('./api/routes/carrousel.routes.config'));
app.use('/api/posts', require('./api/routes/post.routes.config'));


// Initialize the app.
let server = app.listen(config.port, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});
