const express = require('express');
const router = express.Router();

//Auth
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//GET & POST Routes with Auth
router.get('/inicio', isLoggedIn, async (req, res) => {
    res.render('links/inicio', {
        rendererJS: '<script defer type="module" src="/scripts/renderer.min.js"></script>',
        styles: 'style.min',
        documentTitle: 'RecuEngine - Inicio',
        theme: req.user.theme,
        type: req.user.type
    });
});

module.exports = router;