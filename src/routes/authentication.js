const express = require('express');
const router = express.Router();

//Auth
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//GET & POST Routes with Auth
router.get('/ingresar', isNotLoggedIn, (req, res) => {
    res.render('links/ingresar', {
        rendererJS: '<script defer type="module" src="/scripts/renderer.js"></script>',
        styles: 'style',
        documentTitle: 'RecuEngine - Iniciar Sesión'
    });
});

router.post('/ingresar', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.ingresar', {
        successRedirect: '/inicio',
        failureRedirect: '/ingresar',
        successFlash: true,
        failureFlash: true
    })(req, res, next);
});

router.get('/registrarse', isNotLoggedIn, (req, res) => {
    res.render('links/registrarse', {
        rendererJS: '<script defer type="module" src="/scripts/renderer.js"></script>',
        styles: 'style',
        documentTitle: 'RecuEngine - Registrarse'
    });
});

router.post('/registrarse', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/ingresar',
    failureRedirect: '/registrarse',
    successFlash: true,
    failureFlash: true,
    session: false
}));

// router.get('/salir', isLoggedIn, (req, res, next) => {
//     req.logOut(err => {
//         if (err) return next(err);
//         res.redirect('/');
//     });
// });

router.get('/salir', isLoggedIn, (req, res, next) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;