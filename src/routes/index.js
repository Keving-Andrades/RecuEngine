const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        styles: 'style.min',
        documentTitle: 'RecuEngine'
    });
});

module.exports = router;