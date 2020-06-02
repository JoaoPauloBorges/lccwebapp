const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
    resp.render('../src/index.html');
});

module.exports = router;
