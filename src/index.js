const express = require('express');
const expHbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

// initializations
const app = express();
require('dotenv').config();
require('./lib/passport');

// database
const { database } = require('./keys');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expHbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
    secret: 'al81nj',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.error = req.flash('error');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/', require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});